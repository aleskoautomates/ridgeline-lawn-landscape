/* ---------------------------------------------------------------------------
   api/reserve.js   ->   POST /api/reserve

   Replaces the old reserve.php. Four fields, no uploads.

   Kept separate from the estimate handler on purpose: a package reservation
   is a contract signup and needs calling back the same day, so it gets its
   own subject line rather than being mixed into the general quote pile.
--------------------------------------------------------------------------- */

import {
  config, missingConfig, clean, digitCount, sendMail, page
} from './_mail.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const wantsJson = (req.headers['content-type'] || '').includes('application/json');

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
      : page(res, 500, 'That did not go through', '<p>' + msg + '</p>', '/packages/');
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const address = clean(body.address, 250);
  const pkg = clean(body.package, 120);
  const pagePath = clean(body.page, 200);

  const errors = [];
  if (!name) errors.push('Name is required.');
  if (!address) errors.push('Property address is required.');
  if (!pkg) errors.push('Please choose a package.');
  if (digitCount(phone) < 10) errors.push('A phone number with area code is required.');

  if (errors.length) {
    return wantsJson
      ? res.status(422).json({ ok: false, errors })
      : page(res, 422, 'We could not send that',
          '<ul><li>' + errors.map(esc).join('</li><li>') + '</li></ul>', '/packages/');
  }

  const text = [
    'PACKAGE RESERVATION - call this one back today',
    '='.repeat(46),
    '',
    'Package:  ' + pkg,
    'Name:     ' + name,
    'Phone:    ' + phone,
    'Property: ' + address,
    '',
    '-'.repeat(46),
    'Submitted: ' + new Date().toISOString(),
    'Page:      ' + (pagePath || '/packages/')
  ].join('\n');

  const sent = await sendMail({
    cfg,
    subject: 'RESERVATION: ' + pkg + ' - ' + name,
    text
  });

  if (!sent.ok) {
    console.error('[ridgeline] reserve send failed:', sent.status, sent.detail);
    const msg = 'Something broke on our end. Please call and we will hold the spot over the phone.';
    return wantsJson
      ? res.status(502).json({ ok: false, error: msg })
      : page(res, 502, 'That did not go through', '<p>' + msg + '</p>', '/packages/');
  }

  return wantsJson
    ? res.status(200).json({ ok: true, redirect: '/thank-you/' })
    : res.redirect(303, '/thank-you/');
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
