import React from 'react';
import { Query } from '@apollo/client/react/components';
import { GET_CURRENT_USER } from '../queries';

const withSession = Component => (props) => (
  <Query query={GET_CURRENT_USER}>
    {({data, loading, refetch}) => {
      if (loading) {
        return null;
      }

      return (
        <Component {...props} refetch={refetch} session={data.getCurrentUser} />
      );
    }}
  </Query>
);

export default withSession;
