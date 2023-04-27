import React from 'react';
import CodeEditor from 'components/CodeEditor/CodeEditor';
import styles from './CodeQuestion.module.css';

const code =
  "\ndef _main() -> None:\n # TODO: fixme.\n pass\n\nif __name__ == '__main__':\n _main()\n\n";

export default function CodeQuestion() {
  return (
    <div className={styles['code-question-container']}>
      <div className={styles['code-question-info-container']}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi ut,
        quasi molestiae, quo consequatur mollitia est harum voluptas quaerat
        quidem nam aspernatur eum temporibus? Distinctio at expedita atque
        sapiente debitis.
      </div>
      <CodeEditor initialCode={code} />
    </div>
  );
}
