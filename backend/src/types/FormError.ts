type FormError = {
    field:string
    statement:string
}

export default FormError

import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FormErrorObj {
    @Field()
    field: string;

    @Field()
    statement: string;
}