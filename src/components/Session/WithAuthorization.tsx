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

export const withAuthorization = (condition: any, altRoute: string = ROUTES.SIGN_IN) => (Component: any) => {
    class WithAuthorization extends React.Component<IProps> {
        listener: any;

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push(altRoute);
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