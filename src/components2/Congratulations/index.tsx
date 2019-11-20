import React from 'react'
import NeatlyMain from '../NeatlyMain'
import { Button } from '@material-ui/core'
import * as ROUTES from '../../constants/routs'

import './style.scss'

class Congratulations extends React.Component {
  render() {
    return (
      <NeatlyMain>
        <div className="neatly-congratulations">
          <img src={require('../../assets/images2/main-page/CheckMark.png'
          )} alt="check" className="check-mark" />
          <h2>Congratulations!</h2>
          <p className="tooltip">Your email successfully verified.
          Start use your account right now!</p>
          <Button variant="contained" href={ROUTES.NEATLY_SIGN_IN} className="btn-neatly-blue">
            Sign In Now
        </Button>
        </div>
      </NeatlyMain>
    )
  }
}

export default Congratulations