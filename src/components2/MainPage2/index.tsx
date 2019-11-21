import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBell } from '@fortawesome/free-solid-svg-icons'

import './style.scss'
import { Button } from '@material-ui/core'

class MainPage2 extends React.Component {
  render() {
    return (
      <div className="neatly-main-page">
        <header>
          <div className="logo">
            <h3>Neatly.</h3>
          </div>
          <Button
            className="btn-notification"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faBell}
              color="grey"
              className="bell" />}
          > </Button>
          <Button
            className="btn-settings"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faCog}
              color="grey"
              className="setting-logo" />}
          >
            Settings
              </Button>
        </header>
      </div>
    )
  }
}

export default MainPage2