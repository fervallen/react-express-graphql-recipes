import React from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_CURRENT_USER } from '../../queries';

const withAuth = () => (Component) => (props) => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading }) => {
      if (loading)  {
        return null;
      }

      if (!data || !data.getCurrentUser) {
        window.location.href = '/';
        return null;
      }

      return <Component {...props} />;
    }}
  </Query>
)

export default withAuth;