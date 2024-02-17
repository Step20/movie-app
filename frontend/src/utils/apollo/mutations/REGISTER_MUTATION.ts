import { gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      user {
        _id
        name
        email
        password
        userLocation
      }
      formError {
        field
        statement
      }
      jwt
      success
    }
  }
`;

export default REGISTER_MUTATION;
