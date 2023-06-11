import React, { useEffect, useState, useRef } from 'react';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
  ImperativePanelHandle,
} from 'react-resizable-panels';

import {
  OpenChallengeQuestion,
  OpenHomeworkQuestion,
} from 'types/Questions/Question';
import { CompiledCodeResultsPromise } from 'types/CompiledCodeResults/CompiledCodeResults';

import { executeCode } from 'utils/db/db.utils';

import { Button } from 'components/Button/Button';
import QuestionTags from 'components/QuestionTags/QuestionTags';
import CodeEditor from 'components/CodeEditor/CodeEditor';
import CompilerResults from 'components/CompilerResults/CompilerResults';

import { ReactComponent as VertDots } from './vert-dots.svg';
import styles from './CodeQuestion.module.css';

type CodeAnswer = {
  isCorrect: boolean;
  code: string;
};

type QuestionProps = {
  questionData: OpenHomeworkQuestion | OpenChallengeQuestion;
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
  const [compilerResults, setCompilerResults] = useState<
    CompiledCodeResultsPromise | undefined | 'error'
  >(undefined);
  const [isTerminalOpen, setTerminalOpen] = useState(false);
  const [isCompilerLoading, setIsCompilerLoading] = useState(false);

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
    if (isCompilerLoading) return;

    if (compilerResults) setCompilerResults(undefined);

    if (isTerminalOpen) {
      ref.current?.resize(50);
    }

    setIsCompilerLoading(true);
    setCompilerResults(undefined);
    setTerminalOpen(true);

    try {
      const data = await executeCode(user?.authToken as string, {
        source_code: cachedData.code,
        shown_tests: [...questionData.question.tests],
      });

      if (data.status === 'error') {
        updateCorrect(questionIndex, false);
      } else {
        updateCorrect(questionIndex, true);
      }
      setCompilerResults(data);
    } catch (e) {
      updateCorrect(questionIndex, false);
      setCompilerResults('error');
    }

    setIsCompilerLoading(false);
  };

  return (
    <div className={styles['code-question-container']}>
      <PanelGroup
        direction={isPanelVertical ? 'vertical' : 'horizontal'}
        autoSaveId="persistence"
      >
        <Panel maxSize={60}>
          <div className={styles['code-question-info-container']}>
            <QuestionTags
              topic={questionData.title}
              difficulty={questionData.difficulty_id}
            />
            <h3 className={styles.title}>{questionData.question.title}</h3>
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
                  className={styles['compiler-container']}
                >
                  <CompilerResults results={compilerResults} />
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
