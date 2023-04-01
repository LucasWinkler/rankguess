import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/common/Header';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';
import { Suspense } from 'react';
import Loading from '@/components/common/Loading';
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
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
          dangerouslySetAllPagesToNoFollow={
            process.env.NODE_ENV !== 'production'
          }
          dangerouslySetAllPagesToNoIndex={
            process.env.NODE_ENV !== 'production'
          }
          {...SEO}
        />
        <Header />
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
          <Analytics />
        </Suspense>
      </div>
    </SessionProvider>
  );
};

export default App;
