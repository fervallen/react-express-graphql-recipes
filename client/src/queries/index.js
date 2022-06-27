import {gql} from "@apollo/client";

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id,
      name,
      category
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      _id,
      name,
      description,
      category,
      createdDate,
      instructions,
      likes,
      username
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

export const ADD_RECIPE = gql`
  mutation(
    $name: String!,
    $category: String!,
    $description: String!,
    $instructions: String!,
    $username: String!
  ) {
     addRecipe(
      name: $name
      category: $category
      description: $description
      instructions: $instructions,
      username: $username
    ) {
      _id,
      name,
      description,
      category,
      createdDate,
      instructions,
      likes,
      username
    }
  }
`;