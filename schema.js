exports.typeDefs = `
type Recipe {
  name: String!
  category: String!
  description: String!
  instructions: String!
  createdDate: String
  likes: Int
  username: String
}

type User {
  username: String! @Unique
  password: String!
  email: String! @unique
  joinDate: String
  favourites: [Recipe]
}

type Query {
  getAllRecipes: [Recipe]
}
`;
