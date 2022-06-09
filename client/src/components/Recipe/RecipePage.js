import React from 'react';
import { withRouter } from '../withRouter';
import { GET_RECIPE } from '../../queries';
import { Query } from '@apollo/client/react/components';

const RecipePage = (props) => {
  const { _id } = props.params;

  return (
    <Query query={GET_RECIPE} variables={{ _id }}>
      {({ data, loading, error}) => {
        if (loading) {
          return <div>Loading</div>;
        }
        if (error) {
          return <div>{error.toString()}</div>;
        }

        return (
          <div>
            <h2>{ data.getRecipe.name }</h2>
            <p>Category: { data.getRecipe.category }</p>
            <p>Description: { data.getRecipe.description }</p>
            <p>Instructions: { data.getRecipe.instructions }</p>
            <p>Likes: { data.getRecipe.likes }</p>
            <p>Created by: { data.getRecipe.username }</p>
            <button>Like</button>
          </div>
        );
      }}
    </Query>
  );
};

export default withRouter(RecipePage);
