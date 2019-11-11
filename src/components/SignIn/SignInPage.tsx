import React from 'react'
import { SignInForm } from './SignInForm'
import * as ROUTES from '../../constants/routs'
import SignUpLink from '../SignUp/SignUpLink'
import './SignIn.scss'
import { withAuthorization } from '../Session/WithAuthorization'

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

const condition = (authUser: any) => !authUser

export default withAuthorization(condition, ROUTES.DASHBOARD)(SignInPage)