import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/features/auth/authSlice";
import LoadingSlice from "@/features/loading/loadingSlice";
import ModalSlice from "@/features/modal/modalSlice";
import BookSlice from "@/features/book/bookSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loading: LoadingSlice,
    modal: ModalSlice,
    book: BookSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
