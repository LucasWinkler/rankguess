import { FC } from 'react';
import { NextSeo } from 'next-seo';
import Container from '@/components/common/Container';
import HeadingCircle from '@/components/common/HeadingCircle';
import BackgroundGrid from '@/components/common/BackgroundGrid';
import { GameWithRanks } from '@/types/game';
import CountdownTimer from './CountdownTimer';

type WrapperProps = {
  game: GameWithRanks;
  clipExpirationDate: string;
  children?: React.ReactNode;
};

const Wrapper: FC<WrapperProps> = ({ game, clipExpirationDate, children }) => {
  const description = `Guess the rank of user-submitted gameplay from ${game.name} daily with RankGuess. Test your knowledge and track your stats to see how you improve over time. Remember, the game resets at 12 am EST, so submit your guesses before then!`;

  return (
    <>
      <NextSeo
        title={`Guess the Rank in ${game.name}`}
        description={description}
        openGraph={{
          url: `https://www.rankguess.com/game/${game.slug}`,
          title: `Guess the Rank in ${game.name}`,
          description: description,
        }}
      />

      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <HeadingCircle />
          <BackgroundGrid />
          <div className='relative'>
            <h1 className='page-heading-1'>{game.name}</h1>
            <h2 className='page-heading-2 mt-1 sm:mt-2'>
              <CountdownTimer
                game={game}
                clipExpirationDate={clipExpirationDate}
              />
            </h2>
            <div className='mt-12 text-center lg:mt-16'>{children}</div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Wrapper;
