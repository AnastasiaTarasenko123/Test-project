import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SignUpPage from '../SignUp/SignUp';
import SignInPage from '../SignIn/SignIn'
//import Dashboard from '../Dashboard/Dashboard'
//import Editor from '../Editor/Editor'
import * as ROUTES from '../../constants/routs';
import './App.css'
import Firebase from '../Firebase/Firebase';
import { withFirebase } from '../Firebase/FirebaseContext';

interface IProps { 
  firebase: Firebase
}

interface IState {
  authUser: any
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      authUser: null
    }
  }

  listener: any;

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser 
        ? this.setState({authUser}) 
        : this.setState({authUser: null}) 
      }
    ); 
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navigation authUser = {this.state.authUser}/>
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            {/* <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route path={ROUTES.EDITOR} component={Editor} /> */}
          </div>
        </Router>
      </div>
    );
  }
}

export default withFirebase(App);