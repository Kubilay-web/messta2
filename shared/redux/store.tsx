"use client";
import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";


const store:any = configureStore({
  reducer: {
    reducer:reducer,
  },
});

export default store;

