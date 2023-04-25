import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'types/User/User';

type UserData = null | (User & { authToken: string })

type UserSlice = {
  currentUser: UserData
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  } as UserSlice,
  reducers: {
    updateUser: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
