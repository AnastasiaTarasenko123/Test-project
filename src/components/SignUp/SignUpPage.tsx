import React from 'react'
import { SignUpForm } from './SignUpForm'
import './SignUp.scss'


export const SignUpPage: React.FC = (): React.ReactElement => (
    <div className="loginPage">
        <div className="loginContext">
            <h1>Sign Up</h1>
            <p>Account Information</p>
            <SignUpForm />
        </div>
    </div>
)