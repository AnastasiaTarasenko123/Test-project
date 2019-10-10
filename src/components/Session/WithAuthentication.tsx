import React from 'react'
import Firebase from '../Firebase/Firebase';
import { AuthUserContext } from './SessionContext';
import { withFirebase } from '../Firebase/FirebaseContext';

interface IProps {
    firebase: Firebase
}

interface IState {
    authUser: any
}

export const withAuthentication = (Component: any) => {
    class WithAuthentication extends React.Component<IProps, IState> {
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
                        ? this.setState({ authUser })
                        : this.setState({ authUser: null })
                }
            );
        }

        componentWillUnmount() {
            this.listener();
        }
        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthentication);
};
