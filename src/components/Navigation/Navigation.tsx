import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import SignOut from '../SignOut/SignOut'
import './Navigation.scss'
import { AuthUserContext } from '../Session/SessionContext'
import { Link } from '@material-ui/core'

const Navigation: React.FC = () => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavigationAuth /> : ''}
  </AuthUserContext.Consumer>
);

const NavigationAuth: React.FC = () => (
  <div className="navigaton">
    <ul>
      <li>
        <SignOut />
      </li>
      <li>
        <Link component="button" className="btn-navigator">
          <RouterLink to={ROUTES.DASHBOARD}>Dashboard</RouterLink>
        </Link>
      </li>
    </ul>
  </div>
);

export default Navigation