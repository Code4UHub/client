import React, { useState, useRef } from 'react';

import {
  ClosedHomeworkQuestion,
  OpenHomeworkQuestion,
} from 'types/Questions/Question';
import Modal from 'components/Modal/Modal';

import styles from './QuestionTableRow.module.css';

type HomeworkQuestion = ClosedHomeworkQuestion | OpenHomeworkQuestion;

type QuestionTableRowProps = {
  questionObj: HomeworkQuestion;
  checked: boolean;
  onChecked: (question: HomeworkQuestion) => void;
  onUnchecked: (question_id: number) => void;
};

export default function QuestionTableRow({
  questionObj,
  checked,
  onChecked,
  onUnchecked,
}: QuestionTableRowProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModalRef = useRef<HTMLButtonElement>(null);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { question_h_id, question, type, title } = questionObj;

  const handleCheckBox = (
    e: React.MouseEvent<HTMLInputElement> | React.KeyboardEvent
  ) => {
    e.stopPropagation();
    if (checked) {
      onUnchecked(questionObj.question_h_id);
    } else {
      onChecked(questionObj);
    }
  };

  return (
    <>
      <Modal
        title=""
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lastFocusableElement={closeModalRef}
        isOpen={isModalOpen}
      >
        <div className={styles['preview-container']}>
          <span
            className={styles['preview-title']}
          >{`${question_h_id} - ${question.title}`}</span>
          <span className={styles['preview-description-title']}>
            Descripción
          </span>
          <code className={styles['preview-description']}>
            {question.description.replace(/\r/g, '\n')}
          </code>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            ref={closeModalRef}
            className={styles['preview-close']}
          >
            Cerrar
          </button>
        </div>
      </Modal>
      <tr
        className={`${styles['table-row']} ${checked ? styles.selected : ''}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setIsModalOpen(true);
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <td>
          <input
            type="checkbox"
            checked={checked}
            onClick={handleCheckBox}
            onChange={() => {}}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCheckBox(e);
            }}
          />
        </td>
        <td
          title={`${question_h_id}. ${question.title}`}
        >{`${question_h_id}. ${question.title}`}</td>
        <td title={title}>{title}</td>
        <td>{type}</td>
      </tr>
    </>
  );
}
