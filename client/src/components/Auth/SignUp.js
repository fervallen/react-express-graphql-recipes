import React from 'react';
import { Mutation } from '@apollo/client/react/components';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';
import { setCredentials } from '../../common';
import { withRouter } from '../HOC/withRouter';

class SignUp extends React.Component {
  initialState = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: null,
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

  handleSubmit = (event, signUpUser) => {
    event.preventDefault();
    signUpUser().then(async (data) => {
      setCredentials(data.signinUser.token);
      await this.props.refetch();
      this.clearState();
    }).catch((error) => {
      this.setState({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation,
        error
      });
    });
    this.props.navigate('/');
  };

  isFormValid = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const validateEmail = (email) => {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

    return username &&
      email &&
      password &&
      passwordConfirmation &&
      validateEmail(email) &&
      (password === passwordConfirmation)
  };

  render() {
    const { username, email, password, passwordConfirmation, error } = this.state;
    
    return (
      <div className="App">
        <h2 className="App">Sign Up</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(signupUser, { loading }) => {
            return (
              <form className="form" onSubmit={(event) => this.handleSubmit(event, signupUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Password Confirmation"
                  value={passwordConfirmation}
                  onChange={this.handleChange}
                />
                <button type="submit" disabled={(loading && !error) || !this.isFormValid()} className="button-primary">Submit</button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(SignUp);
