import './App.css';
import { GET_ALL_RECIPES } from '../queries';
import { Query } from '@apollo/client/react/components';
import RecipeItem from './Recipe/RecipeItem';
import Error from './Error';
import Spinner from './Spinner';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_RECIPES}>
      {({ data, loading, error}) => {
        if (loading) {
          return <Spinner/>;
        }
        if (error) {
          return <Error>{error.toString()}</Error>;
        }

        return (
          <ul>
            {data.getAllRecipes.map((recipe) => (
              <RecipeItem key={recipe._id} {...recipe} />
            ))}
          </ul>
        );
      }}
    </Query>
  </div>
);

export default App;
