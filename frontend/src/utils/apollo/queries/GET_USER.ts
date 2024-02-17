import { gql } from "@apollo/client";

const GET_USER = gql`
  query GetUser($data: GetUserInput!) {
    getUser(data: $data) {
      _id
      name
      email
      location
    }
  }
`;

export default GET_USER;
