import { useSelector } from "react-redux";
import { AuthState } from "@/features/auth/authSlice";

const useGetUserId = () => {
  const { credentials } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );
  if (credentials) {
    return credentials?.user?._id;
  }
};

export default useGetUserId;
