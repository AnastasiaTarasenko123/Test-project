import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routs'
import SignOut from '../SignOut/SignOut';

import "./Navigation.css"

interface IProps {
  authUser: null
}

const Navigation: React.FC<IProps> = (props): React.ReactElement => (
  <div>{props.authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth: React.FC = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </li>
      <li>
        <Link to={ROUTES.EDITOR}>Editor</Link>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth: React.FC = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;