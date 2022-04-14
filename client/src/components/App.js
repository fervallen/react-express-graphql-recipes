import './App.css';
import { GET_ALL_QUERIES } from '../queries';
import { Query } from '@apollo/client/react/components';

const App = () => (
  <div className="App">
    <h1>Home</h1>
    <Query query={GET_ALL_QUERIES}>
      {({ data, loading, error}) => {
        if (loading) {
          return <div>Loading</div>;
        }
        if (error) {
          return <div>{error.toString()}</div>;
        }
        console.log('Data: ', data);

        return (
          <p>Recipes</p>
        );
      }}
    </Query>
  </div>
);

export default App;
