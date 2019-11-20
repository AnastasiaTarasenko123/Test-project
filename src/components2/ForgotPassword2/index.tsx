import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { TextField, Button } from '@material-ui/core'
import { SignInLink2 } from '../SignIn2/SignInLink2'

import './style.scss'

class ForgotPassword2 extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-forgot-password">
          <h2>Forgot Password</h2>
          <p className="tooltip">We will send reset link to your email</p>
          <TextField
            className="input-forgot-pass"
            label="Email"
            margin="normal"
            color="default"
          />
          <Button variant="contained" className="input-forgot-pass btn-neatly-blue">
            Send
        </Button>
          <SignInLink2 message={'back'}/>
        </div>
      </NeatlyMain>
    )
  }
}

export default ForgotPassword2