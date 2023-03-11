import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';

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
        <DefaultSeo
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/favicon.ico',
            },
          ]}
          additionalMetaTags={[
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
          {...SEO}
        />
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
