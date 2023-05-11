import React, { useRef, useEffect, useState } from 'react';
import { Button } from 'components/Button/Button';
import styles from './Modal.module.css';
import { ReactComponent as IconClose } from './x-mark.svg';

type ModalProps = {
  title: string;
  open: Boolean;
  onClose: Function;
  lastFocusableElement: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  current?: string;
};

export default function Modal({
  title,
  open,
  onClose,
  lastFocusableElement,
  children,
  current,
}: ModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  useEffect(() => {
    const lastFocusableEl = lastFocusableElement;

    const trapFocus = (e: FocusEvent) => {
      if (e.target === topRef.current) {
        lastFocusableEl.current?.focus();
      } else if (e.target === bottomRef.current) {
        closeRef.current?.focus();
      }
    };

    const escapeClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
        onClose();
      }
    };

    document.addEventListener('focusin', trapFocus);
    document.addEventListener('keydown', escapeClose);

    return function removeListener() {
      document.removeEventListener('focusin', trapFocus);
      document.removeEventListener('keydown', escapeClose);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastFocusableElement, isModalOpen]);

  useEffect(() => {
    if (open) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const modalContainer = modalRef.current;

    if (isModalOpen) {
      modalContainer?.classList.add(styles.fadein);
      setTimeout(() => {
        modalContainer?.classList.remove(styles.fadein);
      }, 400);
    }
  }, [isModalOpen, current]);

  return (
    <>
      <Button
        text={title}
        onClickHandler={() => setIsModalOpen(true)}
        location="modal"
      />
      {isModalOpen && (
        <div className={styles['modal-wrapper']}>
          <div
            tabIndex={0}
            ref={topRef}
          />
          <div
            className={styles['modal-container']}
            ref={modalRef}
          >
            <div className={styles['close-button-container']}>
              <button
                className={styles['close-button']}
                type="button"
                ref={closeRef}
                onClick={closeModal}
              >
                <IconClose />
              </button>
            </div>
            <div className={styles['modal-content']}>{children}</div>
          </div>
          <div
            tabIndex={0}
            ref={bottomRef}
          />
        </div>
      )}
    </>
  );
}

Modal.defaultProps = {
  current: '',
};
