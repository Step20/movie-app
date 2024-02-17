import { Field, ObjectType } from "type-graphql";
import { User } from "../../../types/graphQLTypes/userType";
import FormError, { FormErrorObj } from "../../../types/FormError";

@ObjectType()
export class LoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  jwt?: string;

  @Field(() => FormErrorObj, { nullable: true })
  formError?: FormError;

  @Field()
  success: boolean;
}
