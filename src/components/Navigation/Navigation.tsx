import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import SignOut from '../SignOut/SignOut'
import './Navigation.scss'
import { AuthUserContext } from '../Session/SessionContext'
import { Link } from '@material-ui/core'

const Navigation: React.FC = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth: React.FC = () => (
  <div className="navigaton">
    <ul>
      <li>
        <SignOut />
      </li>
      <li>
        <RouterLink to={ROUTES.EDITOR}>Editor</RouterLink>
      </li>
      <li>
        <RouterLink to={ROUTES.DASHBOARD}>Dashboard</RouterLink>
      </li>
    </ul>
  </div>
);

const NavigationNonAuth: React.FC = () => (
  <div className="navigaton">
    <ul>
      <li>
        <RouterLink to={ROUTES.SIGN_IN}>Sign In</RouterLink>
      </li>
    </ul>
  </div>
);

export default Navigation