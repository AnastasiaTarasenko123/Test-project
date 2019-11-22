import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBell, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Button, MenuList, MenuItem } from '@material-ui/core'
import Navigation from '../Navigation'

import './style.scss'

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
        <section className="content">
          <div className="menu">
            <MenuList>
              <li className="list-name">Category</li>
              <MenuItem>Marketing</MenuItem>
              <MenuItem>Sales</MenuItem>
              <MenuItem>HR</MenuItem>
              <MenuItem>Legal</MenuItem>
              <MenuItem className="new-category">+ Add New Category</MenuItem>
            </MenuList>
            <Button
              className="btn-log-out"
              color="primary"
              startIcon={<FontAwesomeIcon icon={faPowerOff}
                color="grey"
                className="setting-logo" />}
            >
              Log Out
              </Button>
          </div>
          <div className="main-content">
            <div className="in-main-content">
              <Navigation />
              {this.props.children}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default MainPage2