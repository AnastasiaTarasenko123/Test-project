import React from 'react'
import Firebase from '../../firebase/Firebase'
import * as ROUTES from '../../constants/routs'
import { withRouter } from 'react-router'
import { withFirebase } from '../../firebase/FirebaseContext'
import { compose } from 'recompose'

interface IProps {
    firebase: Firebase,
    history: any
}

export const withAuthorization = (condition: any) => (Component: any) => {
    class WithAuthorization extends React.Component<IProps> {
        listener: any;

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                },
            );
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return <Component {...this.props} />;
        }
    }
    return compose<IProps, {}>(withRouter, withFirebase)(WithAuthorization);
}