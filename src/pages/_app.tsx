import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/components/Modal';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { DefaultSeo } from 'next-seo';
import SEO from 'next-seo.config';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const env = process.env.NODE_ENV;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [hasVisited, setHasVisited] = useLocalStorage('hasVisited', false);

  return (
    <SessionProvider session={session}>
      <div className={`${poppins.variable} min-h-screen font-sans`}>
        {env === 'production' && (
          <Modal isOpen={!hasVisited} setIsOpen={setHasVisited}>
            <ModalHeader hasCloseButton={false} setIsOpen={setHasVisited}>
              Work In Progress!
            </ModalHeader>
            <ModalBody>
              The UI is currently the main focus and I will soon be working on
              the backend functionality.
              <br />
              Authentication may not always be online due to development
              limitations.
              <br />
              If it is available it will be through Google and only your name
              and email will be stored.
            </ModalBody>
            <ModalFooter>
              <button
                className='rounded-full border border-blueish-grey-600/50 bg-blueish-grey-600/50 px-6 py-2 text-neutral-200 transition-colors duration-200 hover:text-neutral-100'
                onClick={() => setHasVisited(true)}>
                I Understand
              </button>
            </ModalFooter>
          </Modal>
        )}

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
