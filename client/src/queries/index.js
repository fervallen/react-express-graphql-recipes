import { gql } from "@apollo/client";
import { recipeFragments } from './fragments';

export const GET_ALL_RECIPES = gql`
  query {
    getAllRecipes {
      _id,
      name,
      category
    }
  }
`;

export const SEARCH_RECIPES = gql`
  query($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id,
      name,
      likes
    }
  }
`;

export const GET_RECIPE = gql`
  query($_id: ID!) {
    getRecipe(_id: $_id) {
      ...CompleteRecipe
    }
  }
  
  ${recipeFragments.recipe}
`;

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username,
      joinDate,
      email,
      favourites {
        _id,
        name
      }
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query($username: String!) {
    getUserRecipes(username: $username) {
      _id
      name
      likes 
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
      ...CompleteRecipe
    }
  }
  
  ${recipeFragments.recipe}
`;

export const LIKE_RECIPE = gql`
  mutation(
    $_id: ID!, 
    $username: String!
    ) {
    likeRecipe(
      _id: $_id, 
      username: $username) {
        ...LikeRecipe
      }
  }

  ${recipeFragments.like}
`;

export const UNLIKE_RECIPE = gql`
  mutation(
    $_id: ID!, 
    $username: String!
    ) {
    unlikeRecipe(
      _id: $_id, 
      username: $username) {
        ...LikeRecipe
      }
  }

  ${recipeFragments.like}
`;

export const DELETE_USER_RECIPE = gql`
  mutation(
    $_id: ID!
    ) {
    deleteUserRecipe(
      _id: $_id) {
        _id
      }
  }
`;
