import React from 'react'
import Firebase from '../../firebase/Firebase'
import { AuthUserContext } from './SessionContext'
import { withFirebase } from '../../firebase/FirebaseContext'

interface IProps {
    firebase: Firebase
}

interface IState {
    authUser: any
}

export const withAuthentication = (Component: any) => {
    class WithAuthentication extends React.Component<IProps, IState> {
        listener: any;

        constructor(props: IProps) {
            super(props);
            this.state = {
                authUser: null
            }
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    this.setState({ authUser: authUser || null })
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
}
