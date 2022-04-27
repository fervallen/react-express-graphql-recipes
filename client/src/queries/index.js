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

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username,
      joinDate,
      email
    }
  }
`;


export const SIGN_IN_USER = gql`
  mutation(
    $username: String!,
    $password: String!
  ) {
    signinUser(
      username: $username,
      password: $password
    ) {
      token
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