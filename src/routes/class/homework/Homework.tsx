import React, { useRef } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Homework } from 'types/Homework/Homework';

import HomeworkList from 'components/HomeworkList/HomeworkList';
import Modal from 'components/Modal/Modal';
import CardSkeleton from 'components/CardSkeleton/CardSkeleton';

import { useHomeworkList } from 'hooks/useHomeworkList';

import styles from './Homework.module.css';

export default function HomeworkPage() {
  const hardButtonRef = useRef<HTMLAnchorElement>(null);
  const { homeworkList, isLoading } = useHomeworkList(false);

  const user = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div>
      {user?.role === 'teacher' && (
        <div className={styles['create-homework-container']}>
          <Modal
            title="Crear Tarea"
            lastFocusableElement={hardButtonRef}
          >
            <div className={styles['modal-container']}>
              <span className={styles['difficulty-selector-title']}>
                Selecciona la dificultad de la tarea
              </span>
              <div className={styles['difficulty-selector-container']}>
                <Link
                  to="create/1"
                  className={`${styles['difficulty-btn']}`}
                >
                  Facil
                </Link>
                <Link
                  to="create/2"
                  className={`${styles['difficulty-btn']} $`}
                >
                  Medio
                </Link>
                <Link
                  to="create/3"
                  ref={hardButtonRef}
                  className={`${styles['difficulty-btn']}`}
                >
                  Difícil
                </Link>
              </div>
            </div>
          </Modal>
        </div>
      )}
      {isLoading ? (
        <CardSkeleton items={20} />
      ) : (
        homeworkList.length > 0 && (
          <HomeworkList
            homeworkList={homeworkList as Homework[][]}
            className={styles['homework-list']}
          />
        )
      )}
    </div>
  );
}
