import React, { useState } from 'react';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';
import StudentRequest from 'components/StudentRequest/StudentRequest';

import styles from './Classes.module.css';

export default function Classes() {
  // TODO: Make formal change
  const [section, setSection] = useState('requests');

  if (section === 'requests') {
    return (
      <>
        <SectionHeader title="Solicitud de registro de estudiantes" />
        <StudentRequest />
        <button
          type="button"
          onClick={() => setSection('class')}
        >
          Mis clases
        </button>
      </>
    );
  }
  return (
    <>
      <SectionHeader title="Mis Clases" />
      <div className={styles['card-container']}>
        <CardSkeleton items={4} />
      </div>
      <button
        type="button"
        onClick={() => setSection('requests')}
      >
        Mis solicitudes
      </button>
    </>
  );
}
