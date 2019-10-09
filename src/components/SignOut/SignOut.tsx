import React from 'react'
import Firebase from '../Firebase/Firebase'
import { withFirebase } from '../Firebase/FirebaseContext'
import './SignOut.css'

interface IProps{
    firebase: Firebase
}

const SignOut: React.FC <IProps> = (props):React.ReactElement => (
    <button type="button" onClick={props.firebase.doSignOut}>
        Sign Out
    </button>
)

export default withFirebase(SignOut);