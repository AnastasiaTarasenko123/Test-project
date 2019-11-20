import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { TextField, Button } from '@material-ui/core'

import './style.scss'

class ResetPassword2 extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-reset-password">
          <h2>Reset Password</h2>
          <p className="tooltip">Please create a new password for your account</p>
          <TextField
            className="input-reset-password"
            label="New Password"
            type="password"
            margin="normal"
          />
          <TextField
            className="input-reset-password"
            label="Confirm Password"
            type="password"
            margin="normal"
          />
          <Button variant="contained" className="input-reset-password btn-neatly-blue">
            Confrim
        </Button>
        </div>
      </NeatlyMain>
    )
  }
}

export default ResetPassword2