import React from 'react'
import * as ROUTES from '../../constants/routs'
import { Link } from 'react-router-dom'
import { AuthUserContext } from '../Session/SessionContext'
import { NavigationNonAuth } from '../Navigation/Navigation'
import './NavEditor.scss'

interface IProps {
  appId: string
}

const NavEditor: React.FC<IProps> = (props) => (
  <AuthUserContext.Consumer>
    {authUser => authUser ? <NavigationEditor appId={props.appId} /> : <NavigationNonAuth />}
  </AuthUserContext.Consumer>
);

const NavigationEditor: React.FC<IProps> = (props) => (
  <div className="navEditor">
    <ul>
      <li>
        <Link to={`${ROUTES.EDITOR}/${props.appId}${ROUTES.APP_INFO}`}>App Info</Link>
      </li>
      <li>
        <Link to={`${ROUTES.EDITOR}/${props.appId}${ROUTES.LISTS}`}>Lists</Link>
      </li>
      <li>
        <Link to={`${ROUTES.EDITOR}/${props.appId}${ROUTES.FEATURES}`}>Features</Link>
      </li>
    </ul>
  </div>
);

export default NavEditor 