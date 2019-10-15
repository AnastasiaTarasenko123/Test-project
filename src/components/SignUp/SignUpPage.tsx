import React from 'react'
import { SignUpForm } from './SignUpForm'


export const SignUpPage: React.FC = (): React.ReactElement => (
    <div className="signUpPage">
        <h1>Sign Up</h1>
        <p>Account Information</p>
        <SignUpForm />
    </div>
)