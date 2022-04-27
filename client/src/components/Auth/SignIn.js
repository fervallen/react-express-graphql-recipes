import React from 'react';
import { Mutation } from '@apollo/client/react/components';
import { SIGN_IN_USER } from '../../queries';
import Error from '../Error';
import { setCredentials } from '../../common';
import { withRouter } from '../withRouter';

class signIn extends React.Component {
  initialState = {
    username: '',
    password: '',
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

  handleSubmit = (event, signInUser) => {
    event.preventDefault();
    signInUser().then(async ({ data }) => {
      setCredentials(data.signinUser.token);
      await this.props.refetch();
      this.clearState();
    }).catch((error) => {
      this.setState({
        username: this.state.username,
        password: this.state.password,
        error
      });
    });
    this.props.navigate('/');
  };

  isFormValid = () => {
    return this.state.username && this.state.password;
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="App">
        <h2 className="App">Sign In</h2>
        <Mutation
          mutation={SIGN_IN_USER}
          variables={{ username, password }}
        >
          {(signInUser, { data, loading }) => {
            return (
              <form className="form" onSubmit={(event) => this.handleSubmit(event, signInUser)}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
                <button type="submit" disabled={(loading && !error) || !this.isFormValid()} className="button-primary">Login</button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(signIn);
