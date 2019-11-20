import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { Button } from '@material-ui/core'

import './style.scss'

class Congratulations extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-congratulations">
          <h2>Congratulations!</h2>
          <p className="tooltip">Your email successfully verified.
          Start use your account right now!</p>
          <Button variant="contained" className="btn-neatly-blue">
            Sign In Now
        </Button>
        </div>
      </NeatlyMain>
    )
  }
}

export default Congratulations