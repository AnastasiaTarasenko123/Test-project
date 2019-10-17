import React from 'react'
import * as ROUTES from '../../constants/routs'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import './SignUp.scss'

const SignUpLink: React.FC = ():React.ReactElement =>(
    <div className="signUpLink">
        <p>Don't have an account?</p>
        <Button variant="contained" color="primary" className="btnSignUp"><Link to={ROUTES.SIGN_UP}>Sign Up</Link></Button>
    </div>
)

export default SignUpLink
