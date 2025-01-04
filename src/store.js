/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";

const dummyReducer = (state = {}, action) => {
  return state;
};

const store = configureStore({
  reducer: {
    dummy: dummyReducer,
  },
});

export default store;
