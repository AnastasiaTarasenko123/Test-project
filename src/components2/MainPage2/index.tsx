import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faBell, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { Button, MenuList, MenuItem } from '@material-ui/core'
import Navigation from '../Navigation'
import MyProfile from '../MyProfile'
import BillingInfo from '../Billing info'
import UserList from '../UserList'

import './style.scss'

interface IState {
  active: number
}

interface IProps { }

class MainPage2 extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: 0
    }
  }

  onChange = (active: number) => {
    this.setState({ active: active });
  }

  render() {
    const { active } = this.state;
    return (
      <div className="neatly-main-page">
        <header>
          <div className="logo">
            <h3>Neatly.</h3>
          </div>
          <Button
            className="btn-notification"
            startIcon={<FontAwesomeIcon icon={faBell}
              color="grey"
              className="bell" />}
          > </Button>
          <Button
            className="btn-settings"
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
              startIcon={<FontAwesomeIcon icon={faPowerOff}
                color="grey"
                className="setting-logo" />}
            >
              Log Out
              </Button>
          </div>
          <div className="main-content">
            <div className="in-main-content">
              <Navigation activeBlock={active} onChange={this.onChange} />
              {Number(active) === 0
                ?
                <MyProfile />
                :
                Number(active) === 1
                  ?
                  <BillingInfo />
                  :
                  <UserList />
              }
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default MainPage2