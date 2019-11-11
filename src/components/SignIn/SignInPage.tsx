import React from 'react'
import { SignInForm } from './SignInForm'
import SignUpLink from '../SignUp/SignUpLink'
import './SignIn.scss'

export const SignInPage: React.FC = (): React.ReactElement => (
    <div className="sign-in-page">
        <div className="sign-in-bg">
        </div>
        <div className="sign-in-content">
            <SignInForm />
            <SignUpLink />
        </div>
    </div>
)