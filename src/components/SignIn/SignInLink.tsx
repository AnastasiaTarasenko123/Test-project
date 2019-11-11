import React from 'react'
import * as ROUTES from '../../constants/routs'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './SignIn.scss'

const SignInLink: React.FC = (): React.ReactElement => (
    <div className="sign-in-link">
        <p className="link-title">Do you have an account?</p>
        <Button variant="outlined" color="primary"><Link to={ROUTES.SIGN_IN}>Sign In</Link></Button>
    </div>
)

export default SignInLink

