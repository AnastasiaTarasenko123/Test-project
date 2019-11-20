import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { TextField, Button } from '@material-ui/core'
import { GoogleIcon } from '../Icons'
import { SignInLink2 } from '../SignIn2/SignInLink2'

import './style.scss'

class SignUp2 extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-sign-up">
          <h2>Sign Up</h2>
          <p className="tooltip">Neatly help employees to find the files and documents</p>
          <TextField
            className="input-sign-up"
            label="Full Name"
            margin="normal"
            color="default"
          />
          <TextField
            className="input-sign-up"
            label="Company"
            margin="normal"
            color="default"
          />
          <TextField
            className="input-sign-up"
            label="Email"
            margin="normal"
            color="default"
          />
          <TextField
            className="input-sign-up"
            label="Password"
            type="password"
            margin="normal"
          />
          <TextField
            className="input-sign-up"
            label="Confirm Password"
            type="password"
            margin="normal"
          />
          <Button variant="contained" className="input-sign-up btn-neatly-blue">
            Register
        </Button>
          <Button
            className="input-sign-up btn-with-Google"
            variant="contained"
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
      </Button>
          <SignInLink2 message={'account'}/>
        </div>
      </NeatlyMain>
    )
  }
}

export default SignUp2