import React from 'react'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import './SignOut.scss'
import { withAuthorization } from '../Session/WithAuthorization'
import { Link as RouterLink } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import { Link } from '@material-ui/core'

interface IProps {
    firebase: Firebase
}

const SignOut: React.FC<IProps> = (props): React.ReactElement => (
    <ul>
        <li onClick={props.firebase.doSignOut}>
            <Link component="button">
                <RouterLink to={ROUTES.SIGN_IN}>Sign Out</RouterLink>
            </Link>
        </li>
    </ul>
)

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(withFirebase(SignOut))

