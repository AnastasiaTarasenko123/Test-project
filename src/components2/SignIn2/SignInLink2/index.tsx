import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routs'

import './style.scss'

export const SignInLink2: React.FC = () => (
  <div className="sign-in-link">
    <p className="tooltip">Already have an account ? Go to
      <Link to={ROUTES.NEATLY_SIGN_IN} className="in-link"> Sign In</Link></p>
  </div>
)