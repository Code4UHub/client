import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastSlice = {
  title: string;
  type: string;
  message: string;
};

export const GENERAL_ERRORS = {
  SYSTEM: {
    title: 'Error',
    message: 'Intente más tarde',
    type: 'Error',
  },
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    title: '',
    type: '',
    message: '',
  } as ToastSlice,
  reducers: {
    updateToast: (state, action: PayloadAction<ToastSlice>) => {
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
  },
});

export const { updateToast } = toastSlice.actions;

export default toastSlice.reducer;
