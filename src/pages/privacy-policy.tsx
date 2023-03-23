import Container from '@/components/common/Container';
import { NextSeo } from 'next-seo';
import HeadingCircle from '@/components/common/HeadingCircle';
import BackgroundGrid from '@/components/common/BackgroundGrid';

export default function PrivacyPolicy() {
  return (
    <>
      <NextSeo
        title='Privacy Policy'
        openGraph={{
          url: 'https://www.rankguess.com/privacy-policy',
          title: 'Privacy Policy | RankGuess',
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <section className='text-neutral-200'>
            <HeadingCircle />
            <BackgroundGrid />
            <div className='relative'>
              <h1 className='page-heading-1'>Privacy Policy</h1>
              <h2 className='text-center text-lg lg:mt-2'>
                Last updated: XXXX XX, 2023
              </h2>
              <div className='mt-12 flex flex-col gap-2 rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 p-8 sm:p-12 lg:mt-16'></div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
