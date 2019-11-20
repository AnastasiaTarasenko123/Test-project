import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routs'

import './style.scss'

export const SignUpLink2: React.FC = () => (
  <div className="sign-up-link">
    <p className="tooltip">Already have an account ? Go to
      <Link to={ROUTES.NEATLY_SIGN_UP} className="up-link"> Registration</Link></p>
  </div>
)