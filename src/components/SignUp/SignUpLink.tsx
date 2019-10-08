import React from 'react'
import * as ROUTES from '../../constants/routs';
import { Link } from 'react-router-dom';

const SignUpLink: React.FC = ():React.ReactElement =>(
    <div>
        <p>Don't have an account?</p>
        <button><Link to={ROUTES.SIGN_UP}>Sign Up</Link></button>
    </div>
)

export default SignUpLink;

