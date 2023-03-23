import Container from '@/components/common/Container';
import changelog from '@/data/changelog';
import { Fragment } from 'react';
import { NextSeo } from 'next-seo';
import HeadingCircle from '@/components/common/HeadingCircle';
import BackgroundGrid from '@/components/common/BackgroundGrid';

const Changelog = () => {
  const description =
    'Stay up to date with the latest updates and changes for RankGuess. The daily game where you guess the rank of user submitted clips from Apex Legends, CSGO, League of Legends, and more!';

  return (
    <>
      <NextSeo
        title="What's New in RankGuess? Stay Up to Date!"
        description={description}
        openGraph={{
          url: 'https://www.rankguess.com/changelog',
          title: "What's New in RankGuess? Stay Up to Date! | RankGuess",
          description: description,
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <section className='text-neutral-200'>
            <HeadingCircle />
            <BackgroundGrid />
            <div className='relative'>
              <h1 className='page-heading-1'>Changelog</h1>
              <div className='mt-12 rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-700 p-8 sm:p-12 lg:mt-16'>
                {changelog.map(log => (
                  <article
                    key={log.version}
                    className='[&:not(:first-child)]:mt-8'>
                    <h2 className='border-b border-b-blueish-grey-600/80 pb-3 text-xl font-bold text-neutral-100 sm:text-2xl'>
                      {log.version} ({log.date})
                    </h2>
                    <div>
                      {log.changes.map(item => (
                        <Fragment key={item.title}>
                          <h3 className='mt-4 text-base font-medium text-neutral-100 sm:text-lg'>
                            {item.title}
                          </h3>
                          <ul className='mt-2 list-inside list-disc text-sm sm:text-base'>
                            {item.change.map(change => (
                              <li key={change}>{change}</li>
                            ))}
                          </ul>
                        </Fragment>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
};

export default Changelog;
