/* ---------------------------------------------------------------------------
   api/estimate.js   ->   POST /api/estimate

   Replaces the old estimate.php. Vercel does not run PHP.

   Two request shapes are accepted:

   1. application/json  (the normal path)
      site.js compresses the photos in the browser, base64 encodes them and
      posts JSON. Responds with JSON so the page can show inline status.

   2. application/x-www-form-urlencoded  (no JavaScript)
      The form posts natively. Text fields only, no photos, because a file
      input in a urlencoded form sends the filename and nothing else.
      Responds with a redirect or a plain HTML page.

   Everything is re-validated here. Client-side checks are a courtesy to the
   visitor, never a control.
--------------------------------------------------------------------------- */

import {
  config, missingConfig, clean, cleanMultiline, digitCount, isEmail,
  sendMail, page, MAX_ATTACH_BYTES
} from './_mail.js';

const ALLOWED_IMAGE = new Set(['image/jpeg', 'image/png', 'image/webp']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const wantsJson = (req.headers['content-type'] || '').includes('application/json');

  /* Honeypot. Accept silently so a bot learns nothing. */
  if (clean(body.website)) {
    return wantsJson
      ? res.status(200).json({ ok: true })
      : res.redirect(303, '/thank-you/');
  }

  const cfg = config();
  const missing = missingConfig(cfg);
  if (missing.length) {
    console.error('[ridgeline] missing env vars:', missing.join(', '));
    const msg = 'The form is not finished being set up. Please call us instead.';
    return wantsJson
      ? res.status(500).json({ ok: false, error: msg })
      : page(res, 500, 'That did not go through', '<p>' + msg + '</p>');
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  const address = clean(body.address, 250);
  const size = clean(body.property_size, 80);
  const start = clean(body.preferred_start, 20);
  const notes = cleanMultiline(body.notes);
  const pagePath = clean(body.page, 200);
  const consent = body.consent === 'yes' || body.consent === true || body.consent === 'on';

  let services = [];
  const raw = body['services[]'] ?? body.services;
  if (Array.isArray(raw)) services = raw;
  else if (typeof raw === 'string' && raw) services = [raw];
  services = services.slice(0, 20).map((s) => clean(s, 120)).filter(Boolean);

  const errors = [];
  if (!name) errors.push('Name is required.');
  if (!address) errors.push('Property address is required.');
  if (digitCount(phone) < 10) errors.push('A phone number with area code is required.');
  if (!isEmail(email)) errors.push('A valid email address is required.');
  if (!consent) errors.push('Contact consent is required.');

  if (errors.length) {
    return wantsJson
      ? res.status(422).json({ ok: false, errors })
      : page(res, 422, 'We could not send that',
          '<ul><li>' + errors.map(esc).join('</li><li>') + '</li></ul>');
  }

  /* -- Photos (JSON path only) -------------------------------------------
     Each entry: { name, type, dataBase64 }. Validated by declared type and
     by decoded size, renamed, and never written to disk.
  ---------------------------------------------------------------------- */
  const attachments = [];
  const uploadNotes = [];
  let totalBytes = 0;

  if (Array.isArray(body.photos)) {
    for (const p of body.photos.slice(0, 8)) {
      if (!p || typeof p.dataBase64 !== 'string') continue;
      const type = String(p.type || '').toLowerCase();
      if (!ALLOWED_IMAGE.has(type)) {
        uploadNotes.push('A file was skipped because it was not a JPEG, PNG or WebP image.');
        continue;
      }
      const bytes = Math.floor(p.dataBase64.length * 0.75);
      if (bytes <= 0) continue;
      if (totalBytes + bytes > MAX_ATTACH_BYTES) {
        uploadNotes.push('Some photos were dropped to keep the message under the size limit.');
        break;
      }
      totalBytes += bytes;
      const ext = type === 'image/png' ? 'png' : type === 'image/webp' ? 'webp' : 'jpg';
      attachments.push({
        filename: `yard-photo-${String(attachments.length + 1).padStart(2, '0')}.${ext}`,
        content: p.dataBase64
      });
    }
  } else if (!wantsJson) {
    uploadNotes.push('Submitted without JavaScript, so no photos could be attached.');
  }

  const lines = [
    'New estimate request from the website',
    '='.repeat(44),
    '',
    'Name:            ' + name,
    'Phone:           ' + phone,
    'Email:           ' + email,
    'Property:        ' + address,
    'Property size:   ' + (size || 'Not given'),
    'Preferred start: ' + (start || 'Flexible'),
    '',
    'Services wanted:',
    services.length ? '  - ' + services.join('\n  - ') : '  (none selected)',
    '',
    'Notes:',
    notes || '  (none)',
    '',
    'Photos attached: ' + attachments.length +
      (totalBytes ? ' (' + (totalBytes / 1048576).toFixed(1) + ' MB)' : '')
  ];
  if (uploadNotes.length) {
    lines.push('Upload notes:');
    for (const n of [...new Set(uploadNotes)]) lines.push('  - ' + n);
  }
  lines.push('', '-'.repeat(44));
  lines.push('Submitted: ' + new Date().toISOString());
  lines.push('Page:      ' + (pagePath || '/contact/'));

  const sent = await sendMail({
    cfg,
    subject: 'Estimate request: ' + name + ' (' + address + ')',
    text: lines.join('\n'),
    replyTo: email,
    attachments
  });

  if (!sent.ok) {
    console.error('[ridgeline] estimate send failed:', sent.status, sent.detail);
    const msg = 'Something broke on our end, not yours. Please call and we will take the details over the phone.';
    return wantsJson
      ? res.status(502).json({ ok: false, error: msg })
      : page(res, 502, 'That did not go through', '<p>' + msg + '</p>');
  }

  return wantsJson
    ? res.status(200).json({ ok: true, redirect: '/thank-you/' })
    : res.redirect(303, '/thank-you/');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
