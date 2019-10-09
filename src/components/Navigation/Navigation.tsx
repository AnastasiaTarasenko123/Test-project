import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routs'
import "./Navigation.css"
import SignOut from '../SignOut/SignOut';

const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
      <li>
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </li>
      <li>
        <Link to={ROUTES.EDITOR}>Editor</Link>
      </li>
      <li>
        <SignOut/>
      </li>
    </ul>
  </div>
);
export default Navigation;