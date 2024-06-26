import React, { useState } from "react";
import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  bookmarkList: any[] | null;
};

const initialState: InitialState = {
  bookmarkList: [],
};

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBookmark(state, action) {
      state.bookmarkList = [...state.bookmarkList, action.payload];
      // state.bookmarkList.push(action.payload)
    },
    removeBookmark(state, action) {
      state.bookmarkList = state.bookmarkList.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const { addBookmark, removeBookmark } = BookSlice.actions;

export default BookSlice.reducer;
