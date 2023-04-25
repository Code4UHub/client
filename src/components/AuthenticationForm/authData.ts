type AuthData = {
  label: string;
  type: string;
  id: string;
}[];

export const authData: { [key: string]: AuthData } = {
  signIn: [
    {
      label: "Correo",
      type: "email",
      id: "email"
    },
    {
      label: "Contraseña",
      type: "password",
      id: "passwordLogin"
    },
  ],
  signUp: [
    {
      label: "Nombre(s)",
      type: "text",
      id: "firstName"
    },
    {
      label: "Apellido(s)",
      type: "text",
      id: "lastName"
    },
    {
      label: "Correo",
      type: "email",
      id: "email"
    },
    {
      label: "Contraseña",
      type: "password",
      id: "password"
    },
    {
      label: "Confirmar contraseña",
      type: "password",
      id: "passwordConfirmation"
    },
  ],
};
