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