import React, { useState, useRef, useEffect } from 'react';

import { InputField } from 'components/InputField/InputField';
import { Button } from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

import styles from './JoinGroupForm.module.css';


export default function JoinGroupForm() {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    const classCodeRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    return (
        <Modal open={false} title='Unirse a un grupo' onClose={() => { }} lastFocusableElement={isSubmitDisabled ? classCodeRef : submitRef}>
            <form autoComplete="off" className={styles['form-container']}>
                <h3>Ingresa el código de la clase</h3>
                <div className={styles['input-container']}>
                    <InputField
                        className=''
                        id='classCodeField'
                        ref={classCodeRef}
                        label=''
                        type='text'
                        required
                        error=''
                        value=''
                        placeholder='MiClase01'
                        handleBlur={() => { }}
                        handleChange={() => { }}
                    />
                </div>
                <Button
                    location=""
                    text="Unirse"
                    type="submit"
                    isDisable={isSubmitDisabled}
                    ref={submitRef}
                    onClickHandler={() => { }}
                />
            </form>
        </Modal>
    );
}