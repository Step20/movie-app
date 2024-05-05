import { useSelector } from "react-redux";
import { AuthState } from "@/features/auth/authSlice";

const useGetUser = () => {
  const { credentials } = useSelector(
    (state: { auth: AuthState }) => state.auth
  );
  if (credentials) {
    return credentials?.user;
  }
};

export default useGetUser;
