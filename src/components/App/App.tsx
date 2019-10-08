import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SignUpPage from '../SignUp/SignUp';
import SignInPage from '../SignIn/SignIn'
import * as ROUTES from '../../constants/routs';
import './App.css'

const App = () => (
  <Router>
    <div>
      <Navigation />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
    </div>
  </Router>
);

export default App;