import storeCredentials from "@/utils/authorization/storeCredentials";
import { createSlice } from "@reduxjs/toolkit";

export type AuthState = {
  credentials: any | null;
  errors: any[] | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  credentials: null,
  errors: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.credentials = action.payload;
      state.errors = null;
      storeCredentials(state.credentials);
      state.isLoggedIn = true;
    },

    registerSuccess(state, action) {
      state.credentials = action.payload;
      state.errors = null;
      storeCredentials(state.credentials);
      state.isLoggedIn = true;
    },

    logoutSuccess(state) {
      state.credentials = null;
      state.errors = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, registerSuccess, logoutSuccess } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
