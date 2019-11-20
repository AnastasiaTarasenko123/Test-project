import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBell } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

class MainPage2 extends React.Component {
  render() {
    return (
      <div className="neatly-main-page">
        <header>
          <ul>
            <li key={1} className="logo">
              <h3>Neatly.</h3>
            </li>
            <li key={2} className="notification">
              <FontAwesomeIcon icon={faBell}
                color="grey"
                className="bell" />
            </li>
            <li key={3} className="settings">
              <FontAwesomeIcon icon={faCog}
                color="grey"
                className="setting-logo" />
              <p className="tooltip">Settings</p>
            </li>
          </ul>
        </header>
      </div>
    )
  }
}

export default MainPage2