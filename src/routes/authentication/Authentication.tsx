import React, { useState } from 'react';
import FormHero from 'components/Form/Form';
import { AuthenticationSideBarHero } from 'components/AuthenticationSidebarHero/AuthenticationSidebarHero';
import style from './Authentication.module.css';

export enum ScreenTypes {
  signIn = 'signIn',
  signUp = 'signUp',
}

function Authentication() {
  const [screen, setScreen] = useState(ScreenTypes.signIn);

  const updateScreen = () => {
    if (screen === ScreenTypes.signIn) setScreen(ScreenTypes.signUp);
    else setScreen(ScreenTypes.signIn);
  };

  return (
    <div className={style['authentication-container']}>
      <AuthenticationSideBarHero screen={screen} screenHandler={updateScreen} />
      <FormHero screen={screen} />
    </div>
  );
}

export default Authentication;
