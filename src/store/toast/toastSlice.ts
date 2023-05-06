import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastSlice = {
  title: string;
  type: string;
  message: string;
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
      state = action.payload;
    },
  },
});

export const { updateToast } = toastSlice.actions;

export default toastSlice.reducer;
