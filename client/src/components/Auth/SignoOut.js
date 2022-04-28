import React, {Component} from 'react';
import { withRouter } from '../withRouter';
import { logout } from '../../common';
import { ApolloConsumer } from '@apollo/client';

class SignOut extends Component {
  handleClick = (client) => {
    logout();
    client.resetStore().then(() => this.props.navigate('/'));
  };

  render() {
    return (
      <ApolloConsumer>
        {(client) => (
          <button onClick={() => this.handleClick(client)}>Sign Out</button>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(SignOut);
