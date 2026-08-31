<?php
/**
 * estimate.php - free estimate handler for Ridgeline Lawn & Landscape
 *
 * Accepts the multipart form on /contact/, validates everything server side,
 * and emails it with the photos attached.
 *
 * SETUP
 * 1. Set $TO below to the real address (or leave it, it reads the value the
 *    site was built with).
 * 2. Confirm the host allows mail(). Most cPanel hosts do. If yours does not,
 *    or if deliverability matters (it does), swap the send() call for SMTP
 *    through the host's mail service. README covers this.
 * 3. php.ini needs upload_max_filesize and post_max_size high enough for
 *    8 photos at 10 MB. The shipped .htaccess sets them where mod_php allows.
 *
 * SECURITY NOTES
 * - Everything from the browser is re-validated here. Client-side checks are
 *   a courtesy to the visitor, not a control.
 * - Uploads are checked by real MIME type via finfo, not by the filename or
 *   the browser-supplied type, and filenames are regenerated. Nothing the
 *   user sends is ever written with its original name or extension.
 * - Uploads are emailed as attachments and deleted. Nothing is stored in the
 *   web root, so there is no path to execute an uploaded file.
 */

declare(strict_types=1);

$TO          = 'ESTIMATE_EMAIL_PLACEHOLDER';
$SITE_NAME   = 'SITE_NAME_PLACEHOLDER';
$THANK_YOU   = '/thank-you/';
$MAX_FILE_MB = 10;
$MAX_FILES   = 8;

$ALLOWED_MIME = [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/heic' => 'heic',
    'image/heif' => 'heif',
];

/* -- Only POST ---------------------------------------------------------- */
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /contact/', true, 303);
    exit;
}

/* -- Honeypot: silently accept, do not tell the bot anything ------------ */
if (!empty($_POST['website'])) {
    header('Location: ' . $THANK_YOU, true, 303);
    exit;
}

function clean(string $key, int $max = 500): string {
    $v = $_POST[$key] ?? '';
    if (!is_string($v)) return '';
    $v = trim($v);
    $v = str_replace(["\r", "\n", "\0"], ' ', $v);   // header injection guard
    return mb_substr($v, 0, $max);
}

function cleanMultiline(string $key, int $max = 4000): string {
    $v = $_POST[$key] ?? '';
    if (!is_string($v)) return '';
    return mb_substr(trim(str_replace("\0", '', $v)), 0, $max);
}

$name    = clean('name', 120);
$phone   = clean('phone', 40);
$email   = clean('email', 160);
$address = clean('address', 250);
$size    = clean('property_size', 80);
$start   = clean('preferred_start', 20);
$notes   = cleanMultiline('notes');
$page    = clean('page', 200);
$consent = (($_POST['consent'] ?? '') === 'yes');

$services = [];
if (isset($_POST['services']) && is_array($_POST['services'])) {
    foreach (array_slice($_POST['services'], 0, 20) as $s) {
        if (is_string($s)) $services[] = mb_substr(trim(str_replace(["\r", "\n"], ' ', $s)), 0, 120);
    }
}

/* -- Validate ------------------------------------------------------------ */
$errors = [];
if ($name === '')    $errors[] = 'Name is required.';
if ($address === '') $errors[] = 'Property address is required.';
if (preg_match_all('/\d/', $phone) < 10) $errors[] = 'A phone number with area code is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email address is required.';
if (!$consent) $errors[] = 'Contact consent is required.';
if ($start !== '' && !preg_match('/^\d{4}-\d{2}-\d{2}$/', $start)) $start = '';

if ($errors) {
    http_response_code(422);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><meta charset="utf-8"><title>Check the form</title>'
       . '<style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem}</style>'
       . '<h1>We could not send that</h1><ul><li>'
       . implode('</li><li>', array_map('htmlspecialchars', $errors))
       . '</li></ul><p><a href="/contact/">Go back and fix it</a>, or call us.</p>';
    exit;
}

/* -- Uploads -------------------------------------------------------------
   Validated by real content type, renamed, attached, then deleted.
------------------------------------------------------------------------ */
$attachments = [];
$uploadNotes = [];

if (!empty($_FILES['photos']) && is_array($_FILES['photos']['name'])) {
    $count = count($_FILES['photos']['name']);
    $kept  = 0;
    $finfo = class_exists('finfo') ? new finfo(FILEINFO_MIME_TYPE) : null;

    for ($i = 0; $i < $count; $i++) {
        if ($kept >= $MAX_FILES) { $uploadNotes[] = 'Extra files beyond ' . $MAX_FILES . ' were dropped.'; break; }

        $err = $_FILES['photos']['error'][$i] ?? UPLOAD_ERR_NO_FILE;
        if ($err === UPLOAD_ERR_NO_FILE) continue;
        if ($err !== UPLOAD_ERR_OK) {
            $uploadNotes[] = 'A file failed to upload (PHP error code ' . (int)$err . ').';
            continue;
        }

        $tmp  = $_FILES['photos']['tmp_name'][$i];
        $size = (int)($_FILES['photos']['size'][$i] ?? 0);

        if (!is_uploaded_file($tmp)) continue;
        if ($size <= 0 || $size > $MAX_FILE_MB * 1024 * 1024) {
            $uploadNotes[] = 'A file was skipped for being over ' . $MAX_FILE_MB . ' MB.';
            continue;
        }

        $mime = $finfo ? (string)$finfo->file($tmp) : '';
        if (!isset($ALLOWED_MIME[$mime])) {
            $uploadNotes[] = 'A file was skipped because it was not a JPEG, PNG, WebP or HEIC image.';
            continue;
        }

        $kept++;
        $attachments[] = [
            'name' => sprintf('yard-photo-%02d.%s', $kept, $ALLOWED_MIME[$mime]),
            'mime' => $mime,
            'data' => (string)file_get_contents($tmp),
        ];
        @unlink($tmp);
    }
}

/* -- Compose -------------------------------------------------------------- */
$lines = [
    'New estimate request from the website',
    str_repeat('=', 44),
    '',
    'Name:            ' . $name,
    'Phone:           ' . $phone,
    'Email:           ' . $email,
    'Property:        ' . $address,
    'Property size:   ' . ($size !== '' ? $size : 'Not given'),
    'Preferred start: ' . ($start !== '' ? $start : 'Flexible'),
    '',
    'Services wanted:',
];
$lines[] = $services ? '  - ' . implode("\n  - ", $services) : '  (none selected)';
$lines[] = '';
$lines[] = 'Notes:';
$lines[] = $notes !== '' ? $notes : '  (none)';
$lines[] = '';
$lines[] = 'Photos attached: ' . count($attachments);
if ($uploadNotes) {
    $lines[] = 'Upload notes:';
    foreach (array_unique($uploadNotes) as $n) $lines[] = '  - ' . $n;
}
$lines[] = '';
$lines[] = str_repeat('-', 44);
$lines[] = 'Submitted: ' . date('r');
$lines[] = 'Page:      ' . ($page !== '' ? $page : '/contact/');
$lines[] = 'IP:        ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown');

$bodyText = implode("\n", $lines);
$subject  = 'Estimate request: ' . $name . ' (' . ($address !== '' ? $address : 'no address') . ')';
$subject  = mb_substr(str_replace(["\r", "\n"], ' ', $subject), 0, 160);

/* -- Send ----------------------------------------------------------------- */
$boundary = 'rl' . bin2hex(random_bytes(12));
$fromHost = preg_replace('/^www\./', '', (string)($_SERVER['HTTP_HOST'] ?? 'localhost'));
$fromAddr = 'no-reply@' . $fromHost;

$headers = [
    'From: ' . $SITE_NAME . ' Website <' . $fromAddr . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'X-Mailer: PHP/' . phpversion(),
];

if ($attachments) {
    $headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';
    $body  = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $bodyText . "\r\n\r\n";
    foreach ($attachments as $a) {
        $body .= "--$boundary\r\n";
        $body .= 'Content-Type: ' . $a['mime'] . '; name="' . $a['name'] . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= 'Content-Disposition: attachment; filename="' . $a['name'] . "\"\r\n\r\n";
        $body .= chunk_split(base64_encode($a['data'])) . "\r\n";
    }
    $body .= "--$boundary--";
} else {
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $body = $bodyText;
}

$sent = @mail($TO, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    error_log('[ridgeline] estimate mail() failed for ' . $email);
    http_response_code(500);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><meta charset="utf-8"><title>Could not send</title>'
       . '<style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem}</style>'
       . '<h1>That did not go through</h1>'
       . '<p>Something broke on our end, not yours. Please call us and we will take the details over the phone.</p>'
       . '<p><a href="/contact/">Back to the form</a></p>';
    exit;
}

header('Location: ' . $THANK_YOU, true, 303);
exit;
