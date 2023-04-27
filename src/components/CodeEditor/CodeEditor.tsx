import React, { useRef, useEffect } from 'react';
import { EditorView, keymap, KeyBinding } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { basicSetup } from 'codemirror';
import { insertTab } from '@codemirror/commands';
import { autocompletion, acceptCompletion } from '@codemirror/autocomplete';
import { tomorrow } from 'thememirror';
import styles from './CodeEditor.module.css';

const disableDefaultTabCompletion = autocompletion({
  defaultKeymap: false,
});

const autocompleteKey: KeyBinding = {
  key: 'Tab',
  run: acceptCompletion,
};

const insertTabKey: KeyBinding = {
  key: 'Tab',
  run: insertTab,
};

type EditorPropTypes = {
  initialCode: string;
};

export default function CodeEditor({ initialCode }: EditorPropTypes) {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const codeEditorRef = useRef<EditorView>();

  useEffect(() => {
    codeEditorRef.current = new EditorView({
      doc: initialCode,
      extensions: [
        basicSetup,
        python(),
        EditorView.lineWrapping,
        keymap.of([autocompleteKey, insertTabKey]),
        tomorrow,
        disableDefaultTabCompletion,
      ],
      parent: parentDivRef.current as Element,
    });

    return function destroyEditor() {
      codeEditorRef.current?.destroy();
    };
  }, [initialCode]);

  return (
    <div
      ref={parentDivRef}
      className={styles['editor-container']}
    />
  );
}
