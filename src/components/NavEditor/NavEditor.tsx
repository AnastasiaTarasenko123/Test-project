import React from 'react'
import * as ROUTES from '../../constants/routs'
import { Link as RouterLink } from 'react-router-dom'
import { AuthUserContext } from '../Session/SessionContext'
import { NavigationNonAuth } from '../Navigation/Navigation'
import './NavEditor.scss'

const NavEditor: React.FC = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser => authUser ? <NavigationEditor /> : <NavigationNonAuth />}
      </AuthUserContext.Consumer>
    </div>
);

const NavigationEditor: React.FC = () => (
    <div className="navEditor">
      <ul>
        <li>
          <RouterLink to={ROUTES.APP_INFO}>App Info</RouterLink>
        </li>
        <li>
          <RouterLink to={ROUTES.LISTS}>Lists</RouterLink>
        </li>
        <li>
          <RouterLink to={ROUTES.FEATURES}>Features</RouterLink>
        </li>
      </ul>
    </div>
  );

export default NavEditor