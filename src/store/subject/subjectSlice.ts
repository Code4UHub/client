import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subject } from 'types/Subject/Subject';

type SubjectSlice = {
  subjects: Subject[];
};

export const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    subjects: [],
  } as SubjectSlice,
  reducers: {
    updateSubjects: (state, action: PayloadAction<Subject[]>) => {
      state.subjects = action.payload;
    },
  },
});

export const { updateSubjects } = subjectSlice.actions;

export default subjectSlice.reducer;
