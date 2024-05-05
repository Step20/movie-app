import { RegisterResolver } from "./userAuth/register";
import { LoginResolver } from "./userAuth/login";
import { UserResolver } from "./userRes";
import { UploadResolver } from "./content/upload";

const resolvers: any = [
  RegisterResolver,
  UserResolver,
  LoginResolver,
  UploadResolver,
];

export default resolvers;
