import React from 'react'
import Firebase from '../Firebase/Firebase'
import { withFirebase } from '../Firebase/FirebaseContext'
import './SignOut.css'
import { withAuthorization } from '../Session/WithAuthorization'

interface IProps{
    firebase: Firebase
}

const SignOut: React.FC <IProps> = (props):React.ReactElement => (
    <button type="button" onClick={props.firebase.doSignOut}>
        Sign Out
    </button>
)

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(withFirebase(SignOut));

