import { FC } from 'react';

const NoClipToday: FC = () => {
  return (
    <>
      <div className='mx-auto max-w-2xl text-center text-lg text-neutral-200'>
        <h3 className='pt-8 text-2xl text-neutral-100'>Work In Progress</h3>
        <p className='pt-8'>
          If youre seeing this page, it means the game is still in development!
          CS:GO is the only game currently working although it&apos;s only
          playable on the staging site.
        </p>
        <div className='mx-auto max-w-xl pt-14'>
          <h4 className='text-2xl text-neutral-100'>How you can help</h4>
          <p className='pt-4'>
            User submissions will be the last feature available on the website.
            If you want to help get the game up and running sooner please send
            your own clips to <span>rankguess@gmail.com</span>
          </p>
          <ul className='pt-4'>
            <li>
              <span className='font-bold'>Clip length:</span> 0:20 - 2:00
            </li>
            <li>
              <span className='font-bold'>Clip quality:</span> 720p or higher
            </li>
            <li>
              <span className='font-bold'>Clip format:</span> Any for now
            </li>
            <li>
              <span className='font-bold'>Clip size:</span> Any for now
            </li>
            <li>No background music</li>
            <li>You must blur/cover any rank indicators</li>
          </ul>
          <p className='pt-4'>
            You don&apos;t need to follow the rules 100%. Once the game is up
            and running the rules will be a bit more strict.
          </p>
        </div>
      </div>
    </>
  );
};

export default NoClipToday;
