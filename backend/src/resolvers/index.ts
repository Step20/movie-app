import { RegisterResolver } from "./userAuth/register";
import { LoginResolver } from "./userAuth/login";
import { UserResolver } from "./userRes";
import { UploadResolver } from "./content/upload";
import { GetMovieResolver } from "./content/find";

const resolvers: any = [
  RegisterResolver,
  UserResolver,
  LoginResolver,
  UploadResolver,
  GetMovieResolver,
];

export default resolvers;
