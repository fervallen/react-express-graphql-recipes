import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (date) => new Date(date).toLocaleDateString() + ' at ' + new Date(date).toLocaleTimeString();

const UserInfo = ({ session }) => (
  <div>
    <h3>User Info</h3>
    <p>Username: {session.username}</p>
    <p>Email: {session.email}</p>
    <p>Join date: {formatDate(session.joinDate)}</p>
    <ul>
      <h3>{session.username}`s Favourites</h3>
      {session.favourites.map((favourite) => (
        <li key={favourite._id}>
          <p><Link to={``}>{favourite.name}</Link></p>
        </li>
      ))}
    </ul>
    {!session.favourites.length && (
      <p><strong>You have no favourites right now.</strong></p>
    )}
  </div>
);

export default UserInfo;
