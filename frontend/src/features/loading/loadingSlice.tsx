import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  loading: boolean;
};

const initialState: InitialState = {
  loading: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

export const { toggleLoading } = LoadingSlice.actions;

export default LoadingSlice.reducer;
