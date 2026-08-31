/* ---------------------------------------------------------------------------
   src/lib/png.mjs
   A tiny PNG encoder, so the build can emit a real apple-touch-icon.png with
   no image library and no binary asset checked in. Node's zlib does the
   compression; everything else is just PNG chunk framing.

   Used only for the touch icon. Photography is never generated here.
--------------------------------------------------------------------------- */

import zlib from 'node:zlib';

/* CRC-32, per the PNG spec. */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const body = Buffer.concat([typeBuf, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

/**
 * encodePng(width, height, pixelFn) -> Buffer
 * pixelFn(x, y) returns [r, g, b, a], each 0-255.
 */
export function encodePng(width, height, pixelFn) {
  /* Raw scanlines, filter byte 0 (None) in front of each row. */
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  let o = 0;
  for (let y = 0; y < height; y++) {
    raw[o++] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y);
      raw[o++] = r; raw[o++] = g; raw[o++] = b; raw[o++] = a;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;    // bit depth
  ihdr[9] = 6;    // colour type: RGBA
  ihdr[10] = 0;   // deflate
  ihdr[11] = 0;   // adaptive filtering
  ihdr[12] = 0;   // no interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

/* Signed area test, used to decide if a point sits inside a triangle. */
function edge(ax, ay, bx, by, px, py) {
  return (px - ax) * (by - ay) - (py - ay) * (bx - ax);
}

function inTriangle(px, py, a, b, c) {
  const d1 = edge(a[0], a[1], b[0], b[1], px, py);
  const d2 = edge(b[0], b[1], c[0], c[1], px, py);
  const d3 = edge(c[0], c[1], a[0], a[1], px, py);
  const neg = d1 < 0 || d2 < 0 || d3 < 0;
  const pos = d1 > 0 || d2 > 0 || d3 > 0;
  return !(neg && pos);
}

/**
 * The Ridgeline mark as a PNG: fieldstone green field, cream ridge, gold
 * inner peak. Same shape as favicon.svg so the two read as one identity.
 */
export function touchIcon(size = 180) {
  const S = size / 32;                       // the SVG is drawn on a 32 unit grid
  const GREEN = [30, 74, 50, 255];
  const CREAM = [247, 245, 240, 255];
  const GOLD  = [216, 162, 46, 255];

  const outer = [[5 * S, 25 * S], [16 * S, 6 * S], [27 * S, 25 * S]];
  const inner = [[11 * S, 25 * S], [16 * S, 16 * S], [21 * S, 25 * S]];

  return encodePng(size, size, (x, y) => {
    const px = x + 0.5, py = y + 0.5;
    if (inTriangle(px, py, inner[0], inner[1], inner[2])) return GOLD;
    if (inTriangle(px, py, outer[0], outer[1], outer[2])) return CREAM;
    return GREEN;
  });
}
