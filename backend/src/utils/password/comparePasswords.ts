import bcrypt from "bcrypt";
import { User } from "../../types/graphQLTypes/userType";

type Args = {
  submittedPassword: string;
  user: User;
};

const comparePasswords = ({ submittedPassword, user }: Args) => {
  const hashedPassword = user.password;

  const res = bcrypt.compare(submittedPassword, hashedPassword);
  return res;
};

export default comparePasswords;
