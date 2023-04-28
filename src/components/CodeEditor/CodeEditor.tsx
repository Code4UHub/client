import React, { useRef, useEffect } from 'react';
import { EditorView, keymap, KeyBinding } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { basicSetup } from 'codemirror';
import { insertTab } from '@codemirror/commands';
import { acceptCompletion } from '@codemirror/autocomplete';
import { tomorrow } from 'thememirror';
import styles from './CodeEditor.module.css';

const autocompleteTab: KeyBinding = {
  key: 'Tab',
  run: acceptCompletion,
};

const autocompleteEnter: KeyBinding = {
  key: 'Enter',
  run: acceptCompletion,
};

const insertTabKey: KeyBinding = {
  key: 'Tab',
  run: insertTab,
};

type EditorPropTypes = {
  questionIndex: number;
  code: string;
  onChange: Function;
};

export default function CodeEditor({
  questionIndex,
  code,
  onChange,
}: EditorPropTypes) {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const codeEditorRef = useRef<EditorView>();

  useEffect(() => {
    codeEditorRef.current = new EditorView({
      doc: code,
      extensions: [
        basicSetup,
        python(),
        EditorView.lineWrapping,
        keymap.of([autocompleteEnter, autocompleteTab, insertTabKey]),
        tomorrow,
        EditorView.updateListener.of((e) => {
          if (e.docChanged) {
            onChange(e.state.doc.toString(), questionIndex);
          }
        }),
      ],
      parent: parentDivRef.current as Element,
    });

    return function destroyEditor() {
      codeEditorRef.current?.destroy();
    };
  }, [code]);

  return (
    <div
      ref={parentDivRef}
      className={styles['editor-container']}
    />
  );
}
