import { RegisterResolver } from "./userAuth/register";
import { LoginResolver } from "./userAuth/login";
import { UserResolver } from "./userRes";

const resolvers: any = [RegisterResolver, UserResolver, LoginResolver];

export default resolvers;
