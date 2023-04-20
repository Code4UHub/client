import React, { useRef, useEffect } from 'react';
import styles from './Modal.module.css';
import { ReactComponent as IconClose } from './x-mark.svg';

type ModalProps = {
    lastFocusableElement: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}

export default function Modal({ lastFocusableElement, children }: ModalProps) {

    const firstFocusableEl = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        const lastRef = lastFocusableElement.current;

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableEl.current) {
                        e.preventDefault();
                        lastRef?.focus();
                    }
                } else if (document.activeElement === lastRef) {
                    e.preventDefault()
                    firstFocusableEl.current?.focus();
                }
            }
        }

        firstFocusableEl.current?.addEventListener('keydown', trapFocus);
        lastRef?.addEventListener('keydown', trapFocus)
        // eslint-disable-next-line react-hooks/exhaustive-deps

        return function removeListener() {
            lastRef?.removeEventListener('keydown', trapFocus);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lastFocusableElement, firstFocusableEl]);

    return (
        <div className={styles['modal-wrapper']}>
            <div className={styles['modal-container']}>
                <div className={styles['close-button-container']}>
                    <button
                        className={styles['close-button']}
                        type="button"
                        ref={firstFocusableEl}
                    >
                        <IconClose />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
