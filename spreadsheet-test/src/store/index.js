import { configureStore } from "@reduxjs/toolkit";

import jobSlice from "./jobSlice.js";

const store = configureStore({
  reducer: jobSlice,
  devTools: process.env.NODE_ENV === "development",
});

export { store };
