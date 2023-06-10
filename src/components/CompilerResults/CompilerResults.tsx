import React from 'react';

import {
  CompiledCodeResults,
  CompiledCodeResultsPromise,
  Test,
} from 'types/CompiledCodeResults/CompiledCodeResults';

import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import NoResultsError from 'components/NoResultsError/NoResultsError';

import styles from './CompilerResults.module.css';

function LoadingComponent() {
  return (
    <div className={styles['loading-container']}>
      <span>Ejecutando código</span>
      <LoadingSpinner className={styles.spinner} />
    </div>
  );
}

type TestCasesProps = {
  testCases: Test[];
};

function TestCases({ testCases }: TestCasesProps) {
  return (
    <ul className={styles['test-cases-container']}>
      {testCases.map((test, index) => (
        <li
          key={index}
          className={`${styles['test-case']} ${styles[test.status]}`}
        >
          <span className={styles['test-case-number']}>Prueba {index + 1}</span>
          <div>
            <span className={styles['test-section-title']}>Entrada</span>
            <pre className={styles['test-section-content']}>
              <code>{test.input}</code>
            </pre>
          </div>
          <div>
            <span className={styles['test-section-title']}>Salida</span>
            <pre className={styles['test-section-content']}>
              <code>{test.output}</code>
            </pre>
          </div>
          <div>
            <span className={styles['test-section-title']}>Esperado</span>
            <pre className={styles['test-section-content']}>
              <code>{test.expected}</code>
            </pre>
          </div>
        </li>
      ))}
    </ul>
  );
}

type ResultProps = {
  result: CompiledCodeResults;
};

function AcceptedCode({ result }: ResultProps) {
  return (
    <>
      <span className={`${styles['result-title']} ${styles.accepted}`}>
        Aceptado
      </span>
      <span className={styles['result-description']}>
        Has Pasado todos los casos de prueba. ¡Hurray!
      </span>
      <span className={styles['test-cases-title']}>Casos de prueba</span>
      <TestCases testCases={result.tests} />
    </>
  );
}

function FailedCode({ result }: ResultProps) {
  return (
    <>
      <span className={`${styles['result-title']} ${styles['failed-title']}`}>
        Error
      </span>
      <span className={styles['result-description']}>
        Has Pasado <span>{result.passed}</span> de <span>{result.total}</span>{' '}
        casos de prueba. Revisa tu código.
      </span>
      <span className={styles['test-cases-title']}>Casos de prueba</span>
      <TestCases testCases={result.tests} />
    </>
  );
}

function getComponent(
  results: CompiledCodeResultsPromise | undefined | 'error'
) {
  if (results === 'error')
    return <NoResultsError className={styles['no-results']} />;

  switch (results?.status) {
    case 'success':
      return <AcceptedCode result={results.data as CompiledCodeResults} />;
    case 'failed':
      return <FailedCode result={results.data as CompiledCodeResults} />;
    case 'error':
      return <NoResultsError className={styles['no-results']} />;
    default:
      return <LoadingComponent />;
  }
}

type Props = {
  results: CompiledCodeResultsPromise | undefined | 'error';
};

export default function CompilerResults({ results }: Props) {
  return (
    <div className={`${styles.container} ${!results ? styles.loading : ''}`}>
      {getComponent(results)}
    </div>
  );
}
