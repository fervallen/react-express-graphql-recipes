import React, {Component} from 'react';
import { SEARCH_RECIPES } from '../../queries';
import { ApolloConsumer } from '@apollo/client';
import SearchItem from './SearchItem';

class Search extends Component {
  state = {
    searchResults: [],
  }

  async handleChange(event, client) {
    event.persist();
    const data = await client.query({
      query: SEARCH_RECIPES,
      variables: {
        searchTerm: event.target.value,
      }
    })
    this.setState({
      searchResults: data.data.searchRecipes,
    })
  };

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          return (
            <div className="App">
              <input
                type="search"
                placeholder="Search"
                onChange={(event) => this.handleChange(event, client)}
              />
              <ul>
                {this.state.searchResults.map((recipe) => (<SearchItem key={recipe._id} recipe={recipe} />))}
              </ul>
            </div>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
