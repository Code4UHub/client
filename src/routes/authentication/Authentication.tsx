import React from 'react';
import { ButtonHero } from '../../components/Button/ButtonHero';
import style from './Authentication.module.css';

function Authentication() {
  const [window, onWindowChange] = React.useState('left');
  const isLoginActive = window === 'left';
  const isSignUpActive = window === 'right';

  function onClick() {
    if (window === 'left') {
      onWindowChange('movingRight');
      setTimeout(onWindowChange, 1800, 'right');
    } else {
      onWindowChange('movingLeft');
      setTimeout(onWindowChange, 1800, 'left');
    }
  }
  return (
    <div className="app">
      <div id="window" className={style[]}>
        {' '}
        hola{' '}
      </div>

      {isLoginActive && (
        <div className={style.login}>
          <label htmlFor="email">
            Email
            <input id="email" type="text" />
          </label>
          <ButtonHero
            location="authentication"
            text={`Move to the ${window}`}
            onClickHandler={() => onClick()}
          />
        </div>
      )}

      {isSignUpActive && (
        <div className={style.email}>
          <label htmlFor="email">
            Email
            <input id="email" type="text" />
          </label>
          <button type="button" onClick={onClick}>
            Move to the {window}
          </button>
        </div>
      )}
    </div>
  );
}

export default Authentication;
