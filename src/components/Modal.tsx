import clsx from 'clsx';
import { FC, PropsWithChildren, useEffect } from 'react';
import Container from './Container';
import Close from './icons/Close';

interface ModalProps {
  isOpen: boolean;
}

interface ModalHeaderProps {
  onClose?: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const ModalHeader: FC<PropsWithChildren<ModalHeaderProps>> = ({
  children,
  onClose,
  setIsOpen,
}) => {
  const handleClose = () => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [setIsOpen]);

  return (
    <div className='flex w-full items-start justify-between border-b border-b-blueish-grey-700/80 pb-2'>
      <h2 className='text-lg font-semibold text-neutral-100 md:text-xl lg:text-2xl'>
        {children}
      </h2>
      <button
        className='absolute right-[-1px] top-[-1px] rounded-bl-xl rounded-tr-xl border border-blueish-grey-700/80 bg-blueish-grey-800 bg-opacity-[20%] p-2 text-neutral-200 transition-colors duration-150 hover:bg-opacity-[80%] hover:text-neutral-100'
        onClick={handleClose}>
        <span className='sr-only'>Close information modal</span>
        <Close className='h-4 w-auto' />
      </button>
    </div>
  );
};

export const ModalBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <p className='slim-scrollbar w-full overflow-y-auto py-3 text-neutral-200'>
      {children}
    </p>
  );
};

export const ModalFooter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='w-full border-t border-t-blueish-grey-700/80 pt-3 text-sm text-neutral-200 md:text-base'>
      <p>{children}</p>
    </div>
  );
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
}) => {
  return (
    <div
      className={clsx(
        'inset-0 z-[15] h-full w-full',
        isOpen ? 'fixed' : 'hidden'
      )}>
      <div className='fixed inset-0 h-full w-full bg-black opacity-50'></div>
      <div className='fixed inset-0 flex h-full w-full items-center justify-center'>
        <Container>
          <div className='flex max-h-[60vh] min-h-[10rem] w-full flex-col items-start overflow-hidden rounded-xl border border-blueish-grey-700/80 bg-blueish-grey-800 bg-opacity-[70%] p-8 backdrop-blur-[6px] md:max-h-[70vh] md:min-w-[35rem] md:max-w-[35rem] lg:min-w-[40rem] lg:max-w-[45rem]'>
            {children}
          </div>
        </Container>
      </div>
    </div>
  );
};
