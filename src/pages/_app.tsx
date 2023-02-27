import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import Header from '@/components/Header';

import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${poppins.style.fontFamily};
        }
      `}</style>
      <Header />
      <div className='min-h-screen'>
        <Component {...pageProps} />
      </div>
    </>
  );
}
