import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import { SignUpPage } from '../SignUp/SignUpPage'
import { SignInPage } from '../SignIn/SignInPage'
import Dashboard from '../Dashboard/Dashboard'
import Editor from '../Editor/Editor'
import * as ROUTES from '../../constants/routs'
import { withFirebase } from '../../firebase/FirebaseContext'
import { withAuthentication } from '../Session/WithAuthentication'
import './App.scss'

const App: React.FC = () => (
  <Router>
      <Navigation />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route exect path={ROUTES.EDITOR + '/:uid'} component={Editor} /> 
  </Router>
);

export default withAuthentication(withFirebase(App))