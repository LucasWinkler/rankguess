export default function getPublicUrl(path: string) {
  if (typeof window !== 'undefined') {
    console.log('window', typeof window);
    console.log(
      'process.env.NEXT_PUBLIC_VERCEL_URL',
      process.env.NEXT_PUBLIC_VERCEL_URL
    );
    console.log(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}${path}`);

    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${path}`;
  } else {
    console.log('path', path);
    return `${path}`;
  }
}
