import { FC, PropsWithChildren, useEffect } from 'react';
import Container from './Container';
import Close from './icons/Close';
import clsx from 'clsx';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  canClickOverlayToClose?: boolean;
  className?: string;
};

type ModalHeaderProps = {
  onClose?: () => void;
  setIsOpen: (isOpen: boolean) => void;
  hasCloseButton?: boolean;
  className?: string;
};

type ModalBodyProps = {
  className?: string;
};

type ModalFooterProps = {
  className?: string;
};

export const ModalHeader: FC<PropsWithChildren<ModalHeaderProps>> = ({
  children,
  onClose,
  setIsOpen,
  hasCloseButton = true,
  className,
}) => {
  const handleClose = () => {
    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      className={clsx(
        'w-full border-b border-b-blueish-grey-600/80 pb-2',
        className
      )}>
      <h2 className='text-lg font-semibold text-neutral-100 md:text-xl lg:text-2xl'>
        {children}
      </h2>
      {hasCloseButton && (
        <button
          className='absolute right-[-1px] top-[-1px] flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-bl-xl rounded-tr-xl border border-blueish-grey-600/80 bg-blueish-grey-600 bg-opacity-[20%] p-2 text-neutral-200 transition-colors duration-150 hover:bg-opacity-[60%] hover:text-neutral-100'
          onClick={handleClose}>
          <span className='sr-only'>Close information modal</span>
          <Close className='h-full w-full' />
        </button>
      )}
    </div>
  );
};

export const ModalBody: FC<PropsWithChildren<ModalBodyProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        'slim-scrollbar w-full overflow-y-auto py-3 text-neutral-200',
        className
      )}>
      {children}
    </div>
  );
};

export const ModalFooter: FC<PropsWithChildren<ModalFooterProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={clsx(
        'w-full border-t border-t-blueish-grey-600/80 pt-3 text-sm text-neutral-200 md:text-base',
        className
      )}>
      {children}
    </div>
  );
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  isOpen,
  setIsOpen,
  canClickOverlayToClose = true,
  className,
}) => {
  const handleClickOutside = () => {
    if (canClickOverlayToClose) {
      setIsOpen(false);
    }
  };

  // Prevent scrolling when the modal is open
  useEffect(() => {
    const html = document.querySelector('html');

    if (html) {
      const documentHasScrollbar = html.scrollHeight > html.clientHeight;

      const classesToToggle = [
        'overflow-hidden',
        documentHasScrollbar ? 'overflow-y-scroll' : 'overflow-y-hidden',
        'fixed',
        'inset-0',
      ];

      classesToToggle.forEach(classesToToggle => {
        html.classList.toggle(classesToToggle, isOpen);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapePressed = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapePressed);

    return () => {
      document.removeEventListener('keydown', handleEscapePressed);
    };
  }, [setIsOpen]);

  return (
    <div
      onClick={handleClickOutside}
      className={clsx(
        'fixed inset-0 z-[15] h-full w-full transition-[opacity_visibility] duration-300',
        isOpen ? 'visible opacity-100' : 'invisible opacity-0',
        className
      )}>
      <div className='fixed inset-0 h-full w-full bg-neutral-900 opacity-50'></div>
      <div
        className={clsx(
          'fixed inset-0 flex h-full w-full items-center justify-center transition-transform duration-300 motion-reduce:transition-none',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}>
        <Container>
          <div
            onClick={e => e.stopPropagation()}
            className='flex max-h-[60vh] min-h-[10rem] w-full flex-col items-start overflow-hidden rounded-xl border border-blueish-grey-600/80 bg-blueish-grey-800 bg-opacity-[70%] p-8 backdrop-blur-[6px] md:max-h-[70vh] md:min-w-[35rem] md:max-w-[35rem] lg:min-w-[40rem] lg:max-w-[45rem]'>
            {children}
          </div>
        </Container>
      </div>
    </div>
  );
};
