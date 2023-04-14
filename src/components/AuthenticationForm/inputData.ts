type InputData = {
  label: string;
  type: string;
  id: string;
  placeholder: string;
}[];

export const inputData: { [key: string]: InputData } = {
  signIn: [
    {
      label: "Correo",
      type: "email",
      id: "email",
      placeholder: "A00000000@tec.mx",
    },
    {
      label: "Contraseña",
      type: "password",
      id: "passwordLogin",
      placeholder: "Contraseña",
    },
  ],
  signUp: [
    {
      label: "Nombre(s)",
      type: "text",
      id: "firstName",
      placeholder: "Nombre(s)",
    },
    {
      label: "Apellido(s)",
      type: "text",
      id: "lastName",
      placeholder: "Apellido(s)",
    },
    {
      label: "Correo",
      type: "email",
      id: "email",
      placeholder: "A00000000@tec.mx",
    },
    {
      label: "Contraseña",
      type: "password",
      id: "password",
      placeholder: "Contraseña",
    },
    {
      label: "Confirmar contraseña",
      type: "password",
      id: "passwordConfirmation",
      placeholder: "Repita su contraseña",
    },
  ],
};
