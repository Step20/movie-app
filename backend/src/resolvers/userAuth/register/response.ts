import { ObjectType, Field } from "type-graphql";
import { User } from "../../../types/graphQLTypes/userType";
import FormError, { FormErrorObj } from "../../../types/FormError";

@ObjectType()
export class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => FormErrorObj, { nullable: true })
  formError?: FormError;

  @Field(() => String, { nullable: true })
  jwt?: string;

  @Field()
  success: boolean;
}
