import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortingState: {
    id: "",
    direction: "none",
  },
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setSortingState: (state, action) => {
      state.sortingState = action.payload;
    },
  },
});

export const { setSortingState } = jobSlice.actions;

// eslint-disable-next-line import/no-default-export -- reducer
export default jobSlice.reducer;
