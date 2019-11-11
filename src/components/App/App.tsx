import React from 'react'
import { BrowserRouter as Router, Route, RouteComponentProps, Redirect } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import { SignUpPage } from '../SignUp/SignUpPage'
import { SignInPage } from '../SignIn/SignInPage'
import Dashboard from '../Dashboard/Dashboard'
import * as ROUTES from '../../constants/routs'
import { withFirebase } from '../../firebase/FirebaseContext'
import { withAuthentication } from '../Session/WithAuthentication'
import './App.scss'
import AppInfo from '../AppInfo/AppInfo'
import Lists from '../Lists/Lists'
import Features from '../Features/Features'
import Editor from '../Editor/Editor'
import { RouteParams } from '../../interfaces/interfaces'

interface IProps extends RouteComponentProps<RouteParams> {}

const App: React.FC<IProps> = (props: IProps) => (
  <Router>
    <Navigation />
    <Redirect from='/' to={ROUTES.SIGN_IN} />
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.DASHBOARD} component={Dashboard} />
    <Route path={`${ROUTES.EDITOR}/:appId`} component={Editor} />
    <Route path={`${ROUTES.EDITOR}/:appId${ROUTES.APP_INFO}`} component={AppInfo} />
    <Route path={`${ROUTES.EDITOR}/:appId${ROUTES.LISTS}`} component={Lists} />
    <Route path={`${ROUTES.EDITOR}/:appId${ROUTES.FEATURES}`} component={Features} />
  </Router>
);

export default withAuthentication(withFirebase(App))