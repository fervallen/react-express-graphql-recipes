import React, {Component} from 'react';
import {setCredentials} from '../../common';

class AddRecipe extends Component {
  initialState = {
    name: '',
    category: 'Breakfast',
    description: '',
    instructions: '',
    username: '',
  };
  state = this.initialState;

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  };

  clearState = () => {
    this.setState(this.initialState);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // signInUser().then(async ({ data }) => {
    //   await this.props.refetch();
    //   this.clearState();
    // }).catch((error) => {
    //   this.setState({
    //     error
    //   });
    // });
    // this.props.navigate('/');
  };

  isFormValid = () => {
    return true;
  };

  render() {
    const { name, category, description, instructions } = this.state;

    return (
      <div className="App">
        <h2 className="App">Add Recipe</h2>
        <form className="form">
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
          <button type="submit" className="button-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddRecipe;
