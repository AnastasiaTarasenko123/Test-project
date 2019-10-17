import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import SignOut from '../SignOut/SignOut'
import './Navigation.scss'
import { AuthUserContext } from '../Session/SessionContext'

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
        <Link to={ROUTES.EDITOR}>Editor</Link>
      </li>
      <li>
        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
      </li>
    </ul>
  </div>
);

const NavigationNonAuth: React.FC = () => (
  <div className="navigaton">
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </div>
);

export default Navigation