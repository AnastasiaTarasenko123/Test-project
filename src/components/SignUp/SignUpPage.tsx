import React from 'react'
import { SignUpForm } from './SignUpForm'
import './SignUp.scss'
import SignInLink from '../SignIn/SignInLink'


export const SignUpPage: React.FC = (): React.ReactElement => (
    <div className="sign-up-page">
        <div className="sign-up-content">
            <SignUpForm />
            <SignInLink />
        </div>
        <div className="sign-up-bg">
        </div>
    </div>
)