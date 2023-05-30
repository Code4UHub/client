import React from 'react';
import { Link, useParams } from 'react-router-dom';

import SectionHeader from 'components/SectionHeader/SectionHeader';
import { InputField } from 'components/InputField/InputField';
import AutocompleteField from 'components/AutocompleteField/AutocompleteField';
import Card from 'components/Card/Card';

import { ReactComponent as IconBack } from './ArrowBack.svg';
import styles from './CreateHomework.module.css';

type Question = {
  id: number;
  type: 'Open' | 'Closed';
  title: string;
  module: string;
};

type QuestionCardProps = {
  question: Question;
};

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <Card className={styles['question-card']}>
      <span className={styles['question-id']}>{question.id}.</span>
      <div>
        <div className={styles['question-tags']}>
          <span className={`${styles.tag} ${styles.module}`}>
            {question.module}
          </span>
          <span className={`${styles.tag} ${styles.type}`}>
            {question.type}
          </span>
        </div>
        <span className={styles['question-title']}>{question.title}</span>
      </div>
    </Card>
  );
}

type Props = {
  difficulty: 'Fácil' | 'Media' | 'Díficil';
};

export default function CreateHomework({ difficulty }: Props) {
  const { id } = useParams();

  const classElement = !id ? (
    <AutocompleteField
      label="Clase"
      id="class_id"
      className={`${styles.input} ${styles.autocomplete}`}
      error=""
      handleBlur={() => {}}
      handleChange={() => {}}
      list={[
        { id: '1', value: 'Carlos' },
        { id: '2', value: 'Pepe' },
      ]}
    />
  ) : (
    <InputField
      label="Clase"
      type="text"
      id="class_id"
      required
      className={`${styles.input} ${styles.autocomplete}`}
      error=""
      value=""
      defaultValue="Tengo Hambre"
      handleBlur={() => {}}
      handleChange={() => {}}
      readOnly
    />
  );

  return (
    <>
      <SectionHeader
        title={`Crear Tarea ${difficulty}`}
        childType="backButton"
      >
        <Link
          to="../.."
          relative="path"
          className={styles.icon}
        >
          <IconBack />
        </Link>
      </SectionHeader>
      <div className={styles.container}>
        <form className={styles['form-container']}>
          <InputField
            label="Título"
            type="text"
            id="title"
            required
            className={styles.input}
            error=""
            value=""
            handleBlur={() => {}}
            handleChange={() => {}}
          />
          {classElement}
          <div className={styles['days-container']}>
            <InputField
              label="Preguntas abiertas"
              type="number"
              id="open_questions"
              required
              className={styles.input}
              error=""
              value=""
              handleBlur={() => {}}
              handleChange={() => {}}
            />
            <InputField
              label="Preguntas cerradas"
              type="number"
              id="close_questions"
              required
              className={styles.input}
              error=""
              value=""
              handleBlur={() => {}}
              handleChange={(_id: string, value: string) => {
                console.log(value);
              }}
            />
          </div>
          <InputField
            label="Fecha Límite"
            type="date"
            id="date"
            required
            className={styles.input}
            error=""
            value=""
            handleBlur={() => {}}
            handleChange={(_id: string, value: string) => {
              console.log(value);
            }}
          />
        </form>
        <div>
          <span className={styles['questions-header']}>Preguntas</span>
          <div>
            <QuestionCard
              question={{
                id: 1,
                title: 'Two Sum',
                type: 'Open',
                module: 'While',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
