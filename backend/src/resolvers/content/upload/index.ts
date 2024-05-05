import { Arg, Mutation, Resolver } from "type-graphql";
import { UploadInput } from "./input";
import { UploadResponse } from "./response";
import validateUser from "../../../utils/jwt/validateUser";
import createContent from "./helpers/createContent";

@Resolver()
export class UploadResolver {
  @Mutation(() => UploadResponse)
  async upload(@Arg("data") data: UploadInput): Promise<UploadResponse> {
    try {
      const { userId, token, movieTitle } = data;
      const validated = validateUser({ userId, token });
      if (!validated) {
        throw new Error("Incorrect Token");
      }

      const content = await createContent({ userId, movieTitle });
      return { success: true, content };
    } catch (err) {
      return { success: false, errorMessage: err.message };
    }
  }
}
