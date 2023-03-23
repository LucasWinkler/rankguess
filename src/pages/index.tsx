import BackgroundGrid from '@/components/common/BackgroundGrid';
import Container from '@/components/common/Container';
import GameCard, { GameWithThumbnailBlur } from '@/components/home/GameCard';
import HeadingCircle from '@/components/common/HeadingCircle';
import prisma from '@/lib/prismadb';
import { Game } from '@prisma/client';
import { getPlaiceholder } from 'plaiceholder';

type HomeProps = {
  gamesWithThumbnailBlur: GameWithThumbnailBlur[];
};

const comingSoonCards = (amount: number) => {
  const items = [];

  for (let i = 0; i < amount; i++) {
    items.push(<GameCard key={i} />);
  }

  return items;
};

const Home = ({ gamesWithThumbnailBlur }: HomeProps) => {
  const countOfComingSoonCards = 8 - gamesWithThumbnailBlur.length;

  return (
    <>
      <main id='main-content' className='relative py-12 lg:pt-16 lg:pb-32'>
        <Container>
          <HeadingCircle />
          <BackgroundGrid />
          <div className='relative'>
            <h1 className='page-heading-1'>Choose a game</h1>
            <div className='grid-games mt-12 lg:mt-16'>
              {gamesWithThumbnailBlur?.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
              {comingSoonCards(countOfComingSoonCards)}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export async function getStaticProps(context: any) {
  const { NEXTAUTH_URL } = process.env;

  const games = await prisma.game.findMany({
    where: {
      isEnabled: true,
    },
  });

  if (!games) {
    return {
      props: {},
    };
  }

  const gamesWithThumbnailBlur: GameWithThumbnailBlur[] = await Promise.all(
    games.map(async (game: Game) => {
      const { base64, img } = await getPlaiceholder(
        `${NEXTAUTH_URL}${game.thumbnailPath}`
      );
      return { ...game, imageProps: { ...img, blurDataURL: base64 } };
    })
  );

  return {
    props: {
      gamesWithThumbnailBlur,
    },
  };
}

export default Home;
