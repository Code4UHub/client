import React, { useRef, useEffect } from 'react';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { basicSetup } from 'codemirror';
import styles from './CodeEditor.module.css';

export default function CodeEditor() {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const codeEditorRef = useRef<EditorView>();

  useEffect(() => {
    codeEditorRef.current = new EditorView({
      extensions: [basicSetup, python(), EditorView.lineWrapping],
      parent: parentDivRef.current as Element,
    });

    return function destroyEditor() {
      codeEditorRef.current?.destroy();
    };
  }, []);

  return (
    <div
      ref={parentDivRef}
      className={styles['editor-container']}
    />
  );
}
