import React from 'react'
import { SignInForm } from './SignInForm'
import SignUpLink from '../SignUp/SignUpLink'

export const SignInPage: React.FC = (): React.ReactElement => (
    <div className="signInPage">
        <SignInForm />
        <br />
        <SignUpLink />
    </div>
)