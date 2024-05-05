import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/authSlice";
import LoadingSlice from "@/features/loading/loadingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: LoadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
