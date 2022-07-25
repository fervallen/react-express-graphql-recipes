import React from 'react';
import UserInfo from './UserInfo';
import UserRecipes from './UserRecipes';
import withAuth from '../HOC/withAuth';

const Profile = ({ session }) => (
  <div className="App">
    <UserInfo session={session} />
    <UserRecipes username={session.username}/>
  </div>
);

export default withAuth()(Profile);
