import React from 'react'
import * as ROUTES from '../../constants/routs'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './SignUp.scss'

const SignUpLink: React.FC = (): React.ReactElement => (
    <div className="sign-up-link">
        <p className="link-title">Don't have an account?</p>
        <Link to={ROUTES.SIGN_UP}><Button variant="outlined" color="primary">Sign Up</Button></Link>
    </div>
)

export default SignUpLink

