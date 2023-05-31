import React, { useEffect, useState, useRef } from 'react';
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  ImperativePanelHandle,
} from 'react-resizable-panels';
import { Button } from 'components/Button/Button';
import QuestionTags from 'components/QuestionTags/QuestionTags';
import CodeEditor from 'components/CodeEditor/CodeEditor';
import { ReactComponent as VertDots } from './vert-dots.svg';
import styles from './CodeQuestion.module.css';

const createInitialCode = (driver: string) =>
  `\ndef _${driver} -> None:\n # TODO: fixme.\n pass\n\nif __name__ == '__main__':\n _${driver}\n\n`;

type QuestionProps = {
  questionData: any;
  cachedData: any;
  questionIndex: number;
  updateCode: Function;
  updateCorrect: Function;
};

const dummyPromise = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const option = Math.round(Math.random());

      if (option === 0) resolve(null);
      resolve('Respuesta Correcta');
    }, 5000);
  });

export default function CodeQuestion({
  questionData,
  cachedData,
  questionIndex,
  updateCode,
  updateCorrect,
}: QuestionProps) {
  const [code, setCode] = useState('');
  const [isPanelVertical, setPanelVertical] = useState(window.innerWidth < 800);
  const [compilerResults, setCompilerResults] = useState('');
  const [isTerminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const updatePanelOrientation = () => {
      setPanelVertical(window.innerWidth < 800);
    };

    if (cachedData.code === null) {
      setCode(createInitialCode(questionData.driver));
    } else {
      setCode(cachedData.code);
    }

    window.addEventListener('resize', updatePanelOrientation);

    return function unmount() {
      window.removeEventListener('resize', updatePanelOrientation);
    };
  }, []);

  const ref = useRef<ImperativePanelHandle>(null);

  const submitCode = async () => {
    if (compilerResults) setCompilerResults('');

    if (isTerminalOpen) {
      ref.current?.resize(50);
    }

    setTerminalOpen(true);

    try {
      const data = await dummyPromise();
      if (data) {
        updateCorrect(questionIndex, true);
        setCompilerResults('Todo Bien');
      } else {
        updateCorrect(questionIndex, false);
        setCompilerResults('Todo mal');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles['code-question-container']}>
      <PanelGroup
        direction={isPanelVertical ? 'vertical' : 'horizontal'}
        autoSaveId="persistence"
      >
        <Panel maxSize={60}>
          <div className={styles['code-question-info-container']}>
            <h3 className={styles.title}>{questionData.title}</h3>
            <QuestionTags
              topic={questionData.topic}
              difficulty={questionData.difficulty}
            />
            <p className={styles.description}>{questionData.description}</p>
          </div>
        </Panel>
        <PanelResizeHandle
          className={
            isPanelVertical
              ? styles['resize-handler-vertical']
              : styles['resize-handler']
          }
        >
          <VertDots className={styles.dots} />
        </PanelResizeHandle>
        <Panel
          maxSize={75}
          className={styles['code-question-editor-container']}
        >
          <PanelGroup direction="vertical">
            <Panel>
              <CodeEditor
                questionIndex={questionIndex}
                onChange={updateCode}
                code={code}
              />
            </Panel>
            {isTerminalOpen && (
              <>
                <PanelResizeHandle
                  className={styles['resize-handler-vertical']}
                >
                  <VertDots className={styles.dots} />
                </PanelResizeHandle>
                <Panel
                  ref={ref}
                  collapsible
                >
                  <div>{compilerResults}</div>
                </Panel>
              </>
            )}
          </PanelGroup>
          <div className={styles['submit-container']}>
            <Button
              text="Enviar"
              location="submitCode"
              onClickHandler={submitCode}
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
