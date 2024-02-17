import { Arg, Mutation, Resolver } from "type-graphql";
import { RegisterInput } from "./input";
import { UserModel } from "../../../models/User";
import { RegisterResponse } from "./response";
import hashPassword from "../../../utils/password/hashPassword";
import createUser from "../../../utils/users/createUser";

@Resolver()
export class RegisterResolver {
  @Mutation(() => RegisterResponse)
  async register(@Arg("data") data: RegisterInput): Promise<RegisterResponse> {
    try {
      const { name, email, password, confirmPassword, userLocation } = data;

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw {
          field: "email",
          statement: "email already in use",
        };
      }

      if (password !== confirmPassword) {
        throw {
          field: "password",
          statement: "passwords do not match",
        };
      }
      const hashedPassword = await hashPassword(password);
      const { jwt, user } = await createUser(
        name,
        email,
        userLocation,
        hashedPassword
      );

      if (user) console.log({ user: user });

      return { success: true, user, jwt };
    } catch (err) {
      return { success: false, formError: err };
    }
  }
}
