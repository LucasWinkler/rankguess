export const IS_SERVER = typeof window === 'undefined';

export function getProtocol() {
  const isProd = process.env.VERCEL_ENV === 'production';
  return isProd ? 'https://' : 'http://';
}

export function getAbsoluteUrl() {
  if (!IS_SERVER) {
    return location.origin;
  }

  const protocol = getProtocol();
  if (process.env.VERCEL_URL) {
    return `${protocol}${process.env.VERCEL_URL}`;
  }
}
