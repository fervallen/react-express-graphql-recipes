const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const {response} = require('express');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

require('dotenv').config({ path: 'variables.env' });
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(async (request, response, next) => {
  const token = request.headers['authorization'];
  next();
})

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  context: {
    Recipe,
    User,
  }
}));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


const PORT = process.env.PORT || 4444;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(error => console.error(error));


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});