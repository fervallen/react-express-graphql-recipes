exports.typeDefs = `
type Recipe {
  _id: ID
  name: String!
  category: String!
  description: String!
  instructions: String!
  createdDate: String
  likes: Int
  username: String
}

type User {
  _id: ID
  username: String! @Unique
  password: String!
  email: String! @unique
  joinDate: String
  favourites: [Recipe]
}

type Query {
  getAllRecipes: [Recipe]
}

type Token {
  token: String!
}

type Mutation {
  addRecipe(
    _id: ID
    name: String!
    category: String!
    description: String!
    instructions: String!
  ): Recipe
  
  signinUser(
    username: String!
    password: String!
  ): Token
  
  signupUser(
    username: String!
    email: String!
    password: String!
  ): Token
}
`;
