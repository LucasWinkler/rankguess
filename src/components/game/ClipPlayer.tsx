import { FC, ReactNode, useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

type ClipPlayerProps = {
  gameName: string;
  youtubeVideoId: string | null;
};

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className='relative mx-auto aspect-video overflow-hidden rounded-2xl border-2 border-blueish-grey-600/80 bg-blueish-grey-600/25 lg:max-w-4xl'>
    {children}
  </div>
);

const ClipPlayer: FC<ClipPlayerProps> = ({ gameName, youtubeVideoId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  if (!youtubeVideoId) {
    return (
      <Wrapper>
        <div className='absolute inset-0 flex h-full w-full items-center justify-center p-4 text-sm md:p-8 md:text-base'>
          Sorry, an error has occurred while loading the video.
          <br />
          Please try again later.
        </div>
      </Wrapper>
    );
  }

  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  return (
    <Wrapper>
      {isLoading && (
        <div className='flex h-full w-full items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}
      <iframe
        onLoad={handleVideoLoaded}
        className='absolute inset-0 aspect-video h-full w-full rounded-2xl'
        src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0`}
        title={`Today's clip for ${gameName}`}
        allowFullScreen
      />
    </Wrapper>
  );
};

export default ClipPlayer;
