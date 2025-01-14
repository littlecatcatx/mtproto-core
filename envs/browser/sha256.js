async function SHA256(data) {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', data));
}

export default SHA256;
