import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Header from '@/components/Header';

import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className={`${poppins.variable} min-h-screen font-sans`}>
        <Header />
        <Component {...pageProps} />
      </div>
    </>
  );
}
