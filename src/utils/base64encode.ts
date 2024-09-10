export function b64EncodeUnicode(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt('0x' + p1, 16)))
  );
}

export function b64DecodeUnicode(str: string): string {
  return Buffer.from(str, 'base64').toString('utf8');
}
