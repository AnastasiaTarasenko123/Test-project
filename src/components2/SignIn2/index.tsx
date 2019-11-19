import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { TextField, Button } from '@material-ui/core'
import { GoogleIcon } from '../Icons'

import './style.scss'

class SignIn2 extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-sign-in">
          <h2>SignIn</h2>
          <p className="tooltip">Neatly help employees to find the files and documents</p>
          <TextField
            className="input-sign-in"
            label="Email"
            margin="normal"
            color="default"
          />
          <br />
          <TextField
            className="input-sign-in"
            label="Password"
            type="password"
            margin="normal"
          />
          <br />
          <Button variant="contained" className="input-sign-in btn-neatly btn-neatly-blue">
            Register
        </Button>
          <br />
          <Button
            className="input-sign-in btn-neatly btn-with-Google"
            variant="contained"
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
      </Button>
        </div>
      </NeatlyMain>
    )
  }
}

export default SignIn2