import React, { useState } from "react";
import AuthenticationForm from "components/AuthenticationForm/AuthenticationForm";
import { AuthenticationSideBar } from "components/AuthenticationSidebar/AuthenticationSidebar";
import CreateGroupForm from "components/CreateGroupForm/CreateGroupForm";
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
      <AuthenticationSideBar screen={screen} screenHandler={updateScreen} />
      <AuthenticationForm screen={screen} />
    </div>
  );
}

export default Authentication;
