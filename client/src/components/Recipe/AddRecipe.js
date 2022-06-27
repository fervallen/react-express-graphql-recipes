import React, {Component} from 'react';
import { Mutation } from '@apollo/client/react/components';
import {ADD_RECIPE, GET_ALL_RECIPES} from '../../queries';
import Error from '../Error';
import { withRouter } from '../withRouter';

class AddRecipe extends Component {
  initialState = {
    name: '',
    category: 'Breakfast',
    description: '',
    instructions: '',
    username: '',
    error: null,
  };

  componentDidMount() {
    this.setState({ username: this.props.session.username });
  }

  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  };

  updateCache = (cache, { data: { addRecipe } }) => {
    const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });
    cache.writeQuery({
      query: GET_ALL_RECIPES,
      data: {
        getAllRecipes: [...getAllRecipes, addRecipe],
      },
    });
  };

  clearState = () => {
    this.setState(this.initialState);
    this.setState({ username: this.props.session.username });
  }

  handleSubmit = (event, addRecipe) => {
    event.preventDefault();
    addRecipe().then(async ({ data }) => {
      this.clearState();
      this.props.navigate('/recipes/' + data.addRecipe._id);
    }).catch((error) => {
      this.setState({
        error
      });
    });
  };

  isFormValid = () => {
    return this.state.name &&
      this.state.username &&
      this.state.name &&
      this.state.category &&
      this.state.instructions &&
      this.state.description;
  };

  render() {
    const { name, category, description, instructions, username, error } = this.state;

    return (
      <div className="App">
        <h2 className="App">Add Recipe</h2>
        <Mutation
          mutation={ADD_RECIPE}
          variables={{ name, category, description, instructions, username }}
          update={this.updateCache}
        >
          {(addRecipe, { data, loading }) => {
            return (
              <form className="form" onSubmit={(event) => this.handleSubmit(event, addRecipe)}>
                <input type="text" name="name" placeholder="Recipe name" onChange={this.handleChange} value={name} />
                <select name="category" onChange={this.handleChange} value={category}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                </select>
                <input
                  type="text"
                  name="description"
                  placeholder="Add description"
                  onChange={this.handleChange}
                  value={description}
                />
                <textarea
                  name="instructions"
                  placeholder="Add instructions"
                  onChange={this.handleChange}
                  value={instructions}
                ></textarea>
                <button type="submit" disabled={!this.isFormValid()} className="button-primary">Submit</button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(AddRecipe);
