import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  regModalOpen: boolean;
  sigModalOpen: boolean;
};

const initialState: InitialState = {
  regModalOpen: false,
  sigModalOpen: false,
  index: -1,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    regOpenModal: (state, action) => {
      state.regModalOpen = !state.regModalOpen;
    },
    sigOpenModal: (state, action) => {
      state.sigModalOpen = !state.sigModalOpen;
    },
  },
});

export const { regOpenModal, sigOpenModal } = ModalSlice.actions;

export default ModalSlice.reducer;
