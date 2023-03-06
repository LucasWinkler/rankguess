import Container from '@/components/Container';
import changelog from '@/data/changelog';
import { Fragment } from 'react';

export default function Changelog() {
  return (
    <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
      <Container>
        <section className='text-neutral-200'>
          <div className='pointer-events-none absolute left-0 right-0 bottom-0 -top-[15.5rem] h-full w-full select-none bg-heading-circle bg-top bg-no-repeat'></div>
          <div className='background-grid pointer-events-none absolute inset-0 select-none opacity-[7.5%]'></div>
          <h1 className='page-heading-1 relative'>Changelog</h1>
          <div className='relative rounded-xl border border-blueish-grey-600/80 bg-[#111B36] p-12'>
            {changelog.map(log => (
              <article key={log.version} className='[&:not(:first-child)]:mt-8'>
                <h2 className='border-b border-b-blueish-grey-600/80 pb-3 text-2xl font-bold text-neutral-100'>
                  {log.version} ({log.date})
                </h2>
                <div>
                  {log.changes.map(item => (
                    <Fragment key={item.title}>
                      <h3 className='mt-4 text-lg font-medium text-neutral-100'>
                        {item.title}
                      </h3>
                      <ul className='mt-2 list-inside list-disc'>
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
        </section>{' '}
      </Container>
    </main>
  );
}
