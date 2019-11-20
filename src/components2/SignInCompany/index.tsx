import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { TextField, Button } from '@material-ui/core'

import './style.scss'

class SignInCompany extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-sign-company">
          <h2>Sign In</h2>
          <p className="tooltip">Add your company to complete registration</p>
          <TextField
            className="input-sign-company"
            label="Company"
            type="text"
            margin="normal"
          />
          <Button variant="contained" className="input-sign-company btn-neatly-blue">
            Confrim
        </Button>
        </div>
      </NeatlyMain>
    )
  }
}

export default SignInCompany