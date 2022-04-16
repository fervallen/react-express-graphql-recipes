import {gql} from "@apollo/client";

export const GET_ALL_QUERIES = gql`
  query {
    getAllRecipes {
      name,
      category,
      description,
      instructions,
      likes
      createdDate
    }
  }
`;


export const SIGNUP_USER = gql`
  mutation(
    $username: String!,
    $email: String!,
    $password: String!
  ) {
    signupUser(
      username: $username,
      email: $email,
      password: $password
    ) {
      token
    }
  }
`;