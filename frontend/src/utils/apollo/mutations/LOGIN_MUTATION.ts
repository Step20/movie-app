import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
mutation Login($data: LoginInput!) {
  login(data: $data) {
    user {
      _id
      name
      email
      password
    }
    jwt
    formError {
      field
      statement
    }
    success
  }
}
`;

export default LOGIN_MUTATION