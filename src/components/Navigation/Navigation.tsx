import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import SignOut from '../SignOut/SignOut'
import './Navigation.scss'
import { AuthUserContext } from '../Session/SessionContext'

const Navigation: React.FC = () => (
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
);

const NavigationAuth: React.FC = () => (
  <div className="navigaton">
    <ul>
      <li>
        <SignOut />
      </li>
      <li>
        <RouterLink to={ROUTES.DASHBOARD}>Dashboard</RouterLink>
      </li>
    </ul>
  </div>
);

export const NavigationNonAuth: React.FC = () => (
  <div className="navigaton">
    <ul>
      <li>
        <RouterLink to={ROUTES.SIGN_IN}>Sign In</RouterLink>
      </li>
    </ul>
  </div>
);

export default Navigation