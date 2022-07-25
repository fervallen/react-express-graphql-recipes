import React from 'react';
import { Mutation } from '@apollo/client/react/components';
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from '../../queries';
import withSession from '../HOC/withSession';

class LikeRecipe extends React.Component {
  state = {
    liked: false,
    username: '',
  }
  
  componentDidMount() {
    if (this.props.session && this.props.session.username) {
      const { username, favourites } = this.props.session;
      console.log('favourites: ', favourites);
      const { _id } = this.props;
      const previouslyLiked = favourites.findIndex(favourite => favourite._id === _id) > -1;

      this.setState({
        liked: previouslyLiked, 
        username,
      });
    }
  }

  handleClick = (likeRecipe, unlikeRecipe) => {
    this.setState(prevState => ({
      liked: !prevState.liked
    }), () => this.handleLike(likeRecipe, unlikeRecipe));
  } 

  handleLike = (likeRecipe, unlikeRecipe) => {
    if (this.state.liked) {
      likeRecipe().then(async () => await this.props.refetch());
    } else {
      unlikeRecipe().then(async () => await this.props.refetch());
    }
  }

  updateLike = (cache, { data: { likeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id }});
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: {...getRecipe, likes: likeRecipe.likes + 1}
      }
    })
  }

  updateUnlike = (cache, { data: { unlikeRecipe } }) => {
    const { _id } = this.props;
    const { getRecipe } = cache.readQuery({ query: GET_RECIPE, variables: { _id }});
    cache.writeQuery({
      query: GET_RECIPE,
      variables: { _id },
      data: {
        getRecipe: {...getRecipe, likes: unlikeRecipe.likes - 1}
      }
    })
  }

  render() {
    const { liked, username } = this.state;
    const { _id } = this.props;

    return (
      <Mutation
        mutation={UNLIKE_RECIPE}
        variables={{ _id, username}}
        update={this.updateUnlike}
      >
        {(unlikeRecipe) => (
          <Mutation
            mutation={LIKE_RECIPE}
            variables={{ _id, username }}
            update={this.updateLike}
          >
            {likeRecipe => {
              return (
                username &&
                <button className="like-button" onClick={() => this.handleClick(likeRecipe, unlikeRecipe)}>
                  { liked ? 'Unlike' : 'Like'}
                </button>
              )
            }}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default withSession(LikeRecipe);
