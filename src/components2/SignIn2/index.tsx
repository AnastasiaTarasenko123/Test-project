import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { TextField, Button, FormControlLabel, Checkbox, Link } from '@material-ui/core'
import { GoogleIcon } from '../Icons'
import { SignUpLink2 } from '../SignUp2/SignUpLink2'

import './style.scss'

class SignIn2 extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-sign-in">
          <h2>Sign In</h2>
          <p className="tooltip">Neatly help employees to find the files and documents</p>
          <TextField
            className="input-sign-in"
            label="Email"
            margin="normal"
            color="default"
          />
          <TextField
            className="input-sign-in"
            label="Password"
            type="password"
            margin="normal"
          />
          <div className="input-sign-in remember-forgot">
            <FormControlLabel
              control={
                <Checkbox /*checked={state.checkedA} onChange={handleChange('checkedA')} */ value="checkedA" />
              }
              label="Remember me"
              className="label-remember-me sign-in-text"
            />
            <Link href="#" className="link-forgot-password sign-in-text"/*onClick={preventDefault} className={classes.link}*/>
              Forgot Password?
              </Link>
          </div>
          <Button variant="contained" className="input-sign-in btn-neatly-blue">
            Sign in
        </Button>
          <Button
            className="input-sign-in btn-with-Google"
            variant="contained"
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
      </Button>
          <SignUpLink2 />
        </div>
      </NeatlyMain>
    )
  }
}

export default SignIn2