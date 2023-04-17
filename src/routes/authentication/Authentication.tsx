import React, { useState } from "react";
import AuthenticationForm from "components/AuthenticationForm/AuthenticationForm";
import { AuthenticationSideBar } from "components/AuthenticationSidebar/AuthenticationSidebar";
import { Logo } from 'components/Logo/Logo'

import style from "./Authentication.module.css";

export enum ScreenTypes {
  signIn = "signIn",
  signUp = "signUp",
}

function Authentication() {
  const [screen, setScreen] = useState(ScreenTypes.signIn);

  const updateScreen = () => {
    if (screen === ScreenTypes.signIn) setScreen(ScreenTypes.signUp);
    else setScreen(ScreenTypes.signIn);
  };

  return (
    <div className={style["authentication-container"]}>
      <Logo position="auth" type={screen === ScreenTypes.signIn ? "blue" : "white"}/>
      <AuthenticationSideBar screen={screen} screenHandler={updateScreen} />
      <AuthenticationForm screen={screen} />
    </div>
  );
}

export default Authentication;
