import { combineReducers } from "@reduxjs/toolkit";

import job from "./jobSlice";

const createReducer = (asyncReducers) =>
  combineReducers({
    job,
    ...asyncReducers,
  });

// eslint-disable-next-line import/no-default-export -- reducer
export default createReducer;
