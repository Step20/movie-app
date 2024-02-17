import { UserModel } from "../../models/User";
import generateJWT from "../jwt/generateJWT";

const createUser = async (
  name: string,
  email: string,
  userLocation: string,
  hashedPassword?: Promise<any>
) => {
  const user = new UserModel({
    name,
    email,
    userLocation,
    password: hashedPassword,
  });

  const jwt = generateJWT({
    payload: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userLocation: user.userLocation,
      },
    },
  });
  await user.save();

  return { jwt, user };
};

export default createUser;
