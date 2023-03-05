import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className={`${poppins.variable} min-h-screen font-sans`}>
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
