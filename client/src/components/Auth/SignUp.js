import React from 'react';

class SignUp extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    })
  };

  render() {
    return (
      <div className="App">
        <h2 className="App">Sign Up</h2>
        <form className="form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            value={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
          <button type="submit" className="button-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
