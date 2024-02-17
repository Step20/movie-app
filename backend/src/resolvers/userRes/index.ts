import { Resolver, Query, Arg } from "type-graphql";
import { UserModel } from "../../models/User";
import { User } from "../../types/graphQLTypes/userType";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async getUser(@Arg("userId") userId: string): Promise<User | null> {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  }
}
