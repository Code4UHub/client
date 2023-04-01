import React from 'react';
import ButtonHero from '../../components/ButtonHero/ButtonHero';
import InputHero from '../../components/InputHero/InputHero';
import style from './Authentication.module.css';

function Authentication() {
  const [windowState, onWindowChange] = React.useState('left');
  const isLoginActive = (windowState === 'left');
  const isSignUpActive = (windowState === 'right');

  function onClick() {
    if (windowState === 'left') {
      onWindowChange('movingRight');
      setTimeout(onWindowChange, 1800, 'right');
    } else {
      onWindowChange('movingLeft');
      setTimeout(onWindowChange, 1800, 'left');
    }
  }
  return (
    <div className={style.app}>
      <div id={style.window} className={style[windowState]} />

      {isLoginActive && (
        <>
          <div className={style.login}>
            <ButtonHero
              location="sidebar"
              text="Inicia Sesión"
              onClickHandler={() => onClick()}
            />
          </div>
          <InputHero 
            label="Email"
            type="email"
            id="email"
          />
          <ButtonHero 
            location="authentication"
            text="Registrate"
            onClickHandler={() => onClick()}
          />
        </>
      )}

      {isSignUpActive && (
        <>
          <InputHero 
            label="Email"
            type="email"
            id="email"
          />
          <ButtonHero 
            location="authentication"
            text="Iniciar Sesión"
            onClickHandler={() => onClick()}
          />
          <div className={style.signUp}>
            <ButtonHero 
              location="sidebar"
              text="Regístrate"
              onClickHandler={() => onClick()}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Authentication;
