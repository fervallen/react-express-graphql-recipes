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
    },
    getRecipe: async (root, { _id }, { Recipe }) => {
      return await Recipe.findOne({ _id });
    },
    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        return await Recipe.find({
          $text: { $search: searchTerm }
        }, {
          score: { $meta: 'textScore' }
        }).sort({ score: { $meta: 'textScore' } });
      }

      return await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' });
    },
    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      return await User.findOne({ username: currentUser.username }).populate({
        path: 'favourites',
        model: 'Recipe',
      });
    },
    getUserRecipes: async (root, { username }, { Recipe }) => {
      return await Recipe.find({username}).sort({ createdDate: 'desc' });
    },
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
    likeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      await User.findOneAndUpdate({ username }, { $addToSet: { favourites: _id } });

      return Recipe.findOneAndUpdate({ _id }, { $inc: { likes: 1 } });
    },
    unlikeRecipe: async (root, { _id, username }, { Recipe, User }) => {
      await User.findOneAndUpdate({ username }, { $pull: { favourites: _id } });

      return Recipe.findOneAndUpdate({ _id }, { $inc: { likes: -1 } });
    },
    deleteUserRecipe: async (root, { _id }, { Recipe }) => {
      return Recipe.findOneAndRemove({_id});
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