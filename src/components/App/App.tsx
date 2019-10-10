import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SignUpPage from '../SignUp/SignUp';
import SignInPage from '../SignIn/SignIn'
//import Dashboard from '../Dashboard/Dashboard'
//import Editor from '../Editor/Editor'
import * as ROUTES from '../../constants/routs';
import './App.css'
import { withFirebase } from '../Firebase/FirebaseContext';
import { withAuthentication } from '../Session/WithAuthentication'

const App: React.FC = () => (
  <Router>
    <div>
      <Navigation />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      {/* <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route path={ROUTES.EDITOR} component={Editor} /> */}
    </div>
  </Router>
);

export default withAuthentication(withFirebase(App));