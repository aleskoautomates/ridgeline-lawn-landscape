<?php
/**
 * reserve.php - "Reserve My Spot" package signup handler.
 *
 * Four fields, no uploads. Deliberately separate from estimate.php so a
 * contract signup is never mixed in with a general quote request: these are
 * the ones that need calling back the same day.
 */

declare(strict_types=1);

$TO        = 'ESTIMATE_EMAIL_PLACEHOLDER';
$SITE_NAME = 'SITE_NAME_PLACEHOLDER';
$THANK_YOU = '/thank-you/';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Location: /packages/', true, 303);
    exit;
}

if (!empty($_POST['website'])) {          // honeypot
    header('Location: ' . $THANK_YOU, true, 303);
    exit;
}

function f(string $key, int $max = 250): string {
    $v = $_POST[$key] ?? '';
    if (!is_string($v)) return '';
    return mb_substr(trim(str_replace(["\r", "\n", "\0"], ' ', $v)), 0, $max);
}

$name    = f('name', 120);
$phone   = f('phone', 40);
$address = f('address', 250);
$package = f('package', 120);
$page    = f('page', 200);

$errors = [];
if ($name === '')    $errors[] = 'Name is required.';
if ($address === '') $errors[] = 'Property address is required.';
if ($package === '') $errors[] = 'Please choose a package.';
if (preg_match_all('/\d/', $phone) < 10) $errors[] = 'A phone number with area code is required.';

if ($errors) {
    http_response_code(422);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><meta charset="utf-8"><title>Check the form</title>'
       . '<style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem}</style>'
       . '<h1>We could not send that</h1><ul><li>'
       . implode('</li><li>', array_map('htmlspecialchars', $errors))
       . '</li></ul><p><a href="/packages/">Go back and fix it</a>.</p>';
    exit;
}

$body = implode("\n", [
    'PACKAGE RESERVATION - call this one back today',
    str_repeat('=', 46),
    '',
    'Package:  ' . $package,
    'Name:     ' . $name,
    'Phone:    ' . $phone,
    'Property: ' . $address,
    '',
    str_repeat('-', 46),
    'Submitted: ' . date('r'),
    'Page:      ' . ($page !== '' ? $page : '/packages/'),
    'IP:        ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
]);

$fromHost = preg_replace('/^www\./', '', (string)($_SERVER['HTTP_HOST'] ?? 'localhost'));
$headers = implode("\r\n", [
    'From: ' . $SITE_NAME . ' Website <no-reply@' . $fromHost . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
]);

$subject = mb_substr('RESERVATION: ' . $package . ' - ' . $name, 0, 160);
$sent = @mail($TO, $subject, $body, $headers);

if (!$sent) {
    error_log('[ridgeline] reserve mail() failed for ' . $name);
    http_response_code(500);
    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><meta charset="utf-8"><title>Could not send</title>'
       . '<style>body{font:16px/1.6 system-ui,sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem}</style>'
       . '<h1>That did not go through</h1>'
       . '<p>Something broke on our end. Please call and we will hold the spot over the phone.</p>';
    exit;
}

header('Location: ' . $THANK_YOU, true, 303);
exit;
