import React from 'react'
import * as ROUTES from '../../constants/routs'
import { Link as RouterLink } from 'react-router-dom'
import { AuthUserContext } from '../Session/SessionContext'
import { NavigationNonAuth } from '../Navigation/Navigation'
import './NavEditor.scss'

interface IProps {
  uid: string
}

const NavEditor: React.FC<IProps> = (props) => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => authUser ? <NavigationEditor uid = {props.uid} /> : <NavigationNonAuth />}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationEditor: React.FC<IProps> = (props) => (
  <div className="navEditor">
    <ul>
      <li>
        <RouterLink to={ROUTES.APP_INFO + '/' + props.uid + '/'}>App Info</RouterLink>
      </li>
      <li>
        <RouterLink to={ROUTES.LISTS + '/' + props.uid + '/'}>Lists</RouterLink>
      </li>
      <li>
        <RouterLink to={ROUTES.FEATURES + '/' + props.uid + '/'}>Features</RouterLink>
      </li>
    </ul>
  </div>
);

export default NavEditor