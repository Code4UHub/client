import { createSlice } from '@reduxjs/toolkit';

type LoadingSlice = {
  loadingVal: boolean;
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loadingVal: false,
  } as LoadingSlice,
  reducers: {
    setLoading: (state) => {
      state.loadingVal = true;
    },
    removeLoading: (state) => {
      state.loadingVal = false;
    },
  },
});

export const { setLoading, removeLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
