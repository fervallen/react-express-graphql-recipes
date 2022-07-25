import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from './Auth/SignoOut';

const NavbarAuth = ({ session }) => (
  <Fragment>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/search" >Search</NavLink></li>
      <li><NavLink to="/recipe/add" >Add Recipe</NavLink></li>
      <li><NavLink to="/profile" >Profile</NavLink></li>
      <li><SignOut /></li>
    </ul>
    <h4>Welcome, <strong>{session.username}</strong></h4>
  </Fragment>
);

const NavbarUnAuth = () => (
  <ul>
    <li><NavLink to="/">Home</NavLink></li>
    <li><NavLink to="/search" >Search</NavLink></li>
    <li><NavLink to="/signin" >Sign In</NavLink></li>
    <li><NavLink to="/signup" >Sign Un</NavLink></li>
  </ul>
);

const Navbar = ({ session }) => (
  <nav>
    { session ? <NavbarAuth session={session} /> : <NavbarUnAuth /> }
  </nav>
);

export default Navbar;
