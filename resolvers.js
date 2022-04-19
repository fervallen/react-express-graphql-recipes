const Recipe = require('./models/Recipe');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;

  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      return await Recipe.find();
    }
  },
  Mutation: {
    addRecipe: async (root, {
      name,
      category,
      description,
      instructions,
      username
    }, {}) => {
      return await new Recipe({
        name,
        category,
        description,
        instructions,
        username
      }).save();
    },

    signinUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      let isPasswordCorrect = false;
      if (user) {
        isPasswordCorrect = await bcrypt.compare(password, user.password);
      }

      if (!user || !isPasswordCorrect) {
        throw new Error('Incorrect username or password');
      }

      return { token: createToken(user, process.env.SECRET, '1hr')}
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return { token: createToken(newUser, process.env.SECRET, '1hr')}
    },
  }
};