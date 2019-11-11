import React from 'react'
import { SignUpForm } from './SignUpForm'
import './SignUp.scss'
import * as ROUTES from '../../constants/routs'

import SignInLink from '../SignIn/SignInLink'
import { withAuthorization } from '../Session/WithAuthorization'


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

const condition = (authUser: any) => !authUser

export default withAuthorization(condition, ROUTES.DASHBOARD)(SignUpPage)