import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routs'

import './style.scss'

interface IProps {
  message: 'account' | 'back'
}

export const SignInLink2: React.FC<IProps> = (props) => (
  <div className="sign-in-link">
    {
      props.message === 'account' ?
        <p className="tooltip">Already have an account ? Go to
      <Link to={ROUTES.NEATLY_SIGN_IN} className="in-link"> Sign In</Link></p>
        :
        <p className="tooltip">Back to
      <Link to={ROUTES.NEATLY_SIGN_IN} className="in-link"> Sign In</Link></p>
    }
  </div>
)