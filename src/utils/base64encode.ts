export function b64EncodeUnicode(str: string) {
  return btoa(encodeURIComponent(str));
}

export function b64DecodeUnicode(str: string) {
  return decodeURIComponent(atob(decodeURIComponent(str)));
}
