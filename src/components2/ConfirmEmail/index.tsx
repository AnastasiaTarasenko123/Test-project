import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { SignInLink2 } from '../SignIn2/SignInLink2'

import './style.scss'

class ConfirmEmail extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-confirm-email">
          <img src={require('../../assets/images2/main-page/info.png'
          )} alt="info" className="info" />
          <h2>Confirm your email</h2>
          <p className="tooltip">Your account has been successfully created.
          Please check your email to verification your account</p>
        </div>
        <div className="go-to">
          <SignInLink2 message={'goto'} />
        </div>
      </NeatlyMain>
    )
  }
}

export default ConfirmEmail