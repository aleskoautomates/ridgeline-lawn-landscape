/* ---------------------------------------------------------------------------
   api/_mail.js
   Shared helpers for the two form functions.

   Underscore prefix keeps Vercel from exposing this as a route.
   No npm dependencies: Resend is called over plain HTTPS with fetch, which is
   built into the Node runtime on Vercel.
--------------------------------------------------------------------------- */

export const MAX_ATTACH_BYTES = 4 * 1024 * 1024;   // Vercel caps a function body at 4.5 MB

/* Required environment variables, set in the Vercel dashboard.
   Never hardcode the key. */
export function config() {
  return {
    apiKey: process.env.RESEND_API_KEY || '',
    to: process.env.ESTIMATE_TO_EMAIL || '',
    from: process.env.MAIL_FROM || ''
  };
}

export function missingConfig(cfg) {
  const missing = [];
  if (!cfg.apiKey) missing.push('RESEND_API_KEY');
  if (!cfg.to) missing.push('ESTIMATE_TO_EMAIL');
  if (!cfg.from) missing.push('MAIL_FROM');
  return missing;
}

/* Strip CR/LF so nothing submitted can inject extra mail headers. */
export function clean(value, max = 500) {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n\0]/g, ' ').trim().slice(0, max);
}

export function cleanMultiline(value, max = 4000) {
  if (typeof value !== 'string') return '';
  return value.replace(/\0/g, '').trim().slice(0, max);
}

export function digitCount(s) {
  return (String(s || '').match(/\d/g) || []).length;
}

export function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || ''));
}

/* Send through Resend's REST API. Returns { ok, status, detail }. */
export async function sendMail({ cfg, subject, text, replyTo, attachments = [] }) {
  const payload = {
    from: cfg.from,
    to: [cfg.to],
    subject: clean(subject, 160),
    text
  };
  if (replyTo && isEmail(replyTo)) payload.reply_to = replyTo;
  if (attachments.length) payload.attachments = attachments;

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${cfg.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    return { ok: false, status: 0, detail: 'network error reaching the mail provider' };
  }

  if (res.ok) return { ok: true, status: res.status };

  let detail = '';
  try {
    const body = await res.json();
    detail = body && (body.message || body.name) ? String(body.message || body.name) : '';
  } catch { /* non-JSON error body */ }
  return { ok: false, status: res.status, detail };
}

/* Small HTML responses for the no-JavaScript path. */
export function page(res, status, heading, body, backHref = '/contact/') {
  res.status(status).setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>' + heading + '</title>' +
    '<style>body{font:16px/1.6 system-ui,-apple-system,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1.25rem;color:#232320}' +
    'h1{font-family:Georgia,serif;color:#1E4A32}a{color:#1E4A32}</style>' +
    '<h1>' + heading + '</h1>' + body +
    '<p><a href="' + backHref + '">Back to the form</a></p>'
  );
}
