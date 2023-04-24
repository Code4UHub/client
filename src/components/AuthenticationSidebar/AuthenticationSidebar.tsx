import React from "react";
import { ScreenTypes } from "routes/authentication/Authentication";
import Button from "components/Button/Button";
import styles from "./AuthenticationSidebar.module.css";

type Props = {
  screen: ScreenTypes;
  screenHandler: () => void;
};

export function AuthenticationSideBar({ screen, screenHandler }: Props) {
  return (
    <aside
      className={`${styles["authentication-container"]} ${
        screen === ScreenTypes.signUp ? styles["sign-up"] : ""
      }`}
    >
      <div className={styles.slidebar}>
        <Button
          location="sidebar"
          text={screen === ScreenTypes.signIn ? "Regístrate" : "Inicia Sesión"}
          onClickHandler={screenHandler}
        />
      </div>
      <div className={styles["content-container"]}>
        <h2 className={styles.title}>
          {screen === ScreenTypes.signIn
            ? "¿Usuario Nuevo?"
            : "¿Ya tienes una cuenta?"}
        </h2>
        {screen === ScreenTypes.signIn && (
          <p className={styles.content}>Regístrate y comienza a programar</p>
        )}
      </div>
    </aside>
  );
}
