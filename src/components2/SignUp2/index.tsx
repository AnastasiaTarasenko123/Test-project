import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { TextField, Button } from '@material-ui/core'
import { GoogleIcon } from '../Icons'

import './style.scss'

class SignUp2 extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-sign-up">
          <h2>SignUp</h2>
          <p className="tooltip">Neatly help employees to find the files and documents</p>
          <TextField
            className="input-sign-up"
            label="Full Name"
            margin="normal"
            color="default"
          />
          <br />
          <TextField
            className="input-sign-up"
            label="Company"
            margin="normal"
            color="default"
          />
          <br />
          <TextField
            className="input-sign-up"
            label="Email"
            margin="normal"
            color="default"
          />
          <br />
          <TextField
            className="input-sign-up"
            label="Password"
            type="password"
            margin="normal"
          />
          <br />
          <TextField
            className="input-sign-up"
            label="Confirm Password"
            type="password"
            margin="normal"
          />
          <br />
          <Button variant="contained" className="input-sign-up btn-neatly btn-neatly-blue">
            Register
        </Button>
          <br />
          <Button
            className="input-sign-up btn-neatly btn-with-Google"
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

export default SignUp2