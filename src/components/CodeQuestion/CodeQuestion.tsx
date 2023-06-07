import React, { useEffect, useState, useRef } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  ImperativePanelHandle,
} from 'react-resizable-panels';

import { OpenHomeworkQuestion } from 'types/Questions/Question';

import { executeCode } from 'utils/db/db.utils';

import { Button } from 'components/Button/Button';
import QuestionTags from 'components/QuestionTags/QuestionTags';
import CodeEditor from 'components/CodeEditor/CodeEditor';

import { ReactComponent as VertDots } from './vert-dots.svg';
import styles from './CodeQuestion.module.css';

type CodeAnswer = {
  isCorrect: boolean;
  code: string;
};

type QuestionProps = {
  questionData: OpenHomeworkQuestion;
  cachedData: CodeAnswer;
  questionIndex: number;
  updateCode: Function;
  updateCorrect: Function;
};

export default function CodeQuestion({
  questionData,
  cachedData,
  questionIndex,
  updateCode,
  updateCorrect,
}: QuestionProps) {
  const user = useSelector((root: RootState) => root.user.currentUser);

  const [isPanelVertical, setPanelVertical] = useState(window.innerWidth < 800);
  const [compilerResults, setCompilerResults] = useState('');
  const [isTerminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const updatePanelOrientation = () => {
      setPanelVertical(window.innerWidth < 800);
    };

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
      const data = await executeCode(user?.authToken as string, {
        source_code: cachedData.code,
        shown_tests: [...questionData.question.tests],
      });

      console.log(data);

      if (data.status === 'success') {
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
            <h3 className={styles.title}>{questionData.question.title}</h3>
            <QuestionTags
              topic={questionData.title}
              difficulty={questionData.difficulty_id}
            />
            <p className={styles.description}>
              {questionData.question.description}
            </p>
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
                code={cachedData.code}
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
