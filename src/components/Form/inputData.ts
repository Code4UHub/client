type InputData = {
  label: string;
  type: string;
  id: string
}[];

export const inputData: { [key: string]: InputData } = {
  signIn: [
    {
      label: 'Correo',
      type: 'email',
      id: 'email',
    },
    {
      label: 'Contraseña',
      type: 'password',
      id: 'password',
    },
  ],
  signUp: [
    {
      label: 'Nombre(s)',
      type: 'text',
      id: 'firstName',
    },
    {
      label: 'Apellido(s)',
      type: 'text',
      id: 'lastName',
    },
    {
      label: 'Correo',
      type: 'email',
      id: 'email',
    },
    {
      label: 'Contraseña',
      type: 'password',
      id: 'password',
    },
    {
      label: 'Confirmar contraseña',
      type: 'password',
      id: 'passwordConfirmation',
    },
  ],
  };