import React from 'react'
import { SignInForm } from './SignInForm'
import SignUpLink from '../SignUp/SignUpLink'
import './SignIn.scss'

export const SignInPage: React.FC = (): React.ReactElement => (
    <div className="loginPage">
        <div className="loginContext">
            <h1>Sign In</h1>
            <SignInForm />
            <br />
            <SignUpLink />
        </div>
    </div>
)