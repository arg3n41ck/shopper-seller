export function normalizeApiUrl(url: string | undefined) {
  if (url === '.' || url === '/' || !url) {
    return ''
  }
  return new URL(url).origin
}
