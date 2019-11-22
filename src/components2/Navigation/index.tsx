import React from 'react'
import { Tab, Tabs, Paper } from '@material-ui/core'

import './style.scss'

interface IState {
  active: number;
}

interface IProps { }

class Navigation extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: 0
    }
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ active: newValue });
  };

  render() {
    const { active } = this.state;
    return (
      <div className="navigator">
        <Tabs
          value={active}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab label="My Profile" />
          <Tab label="Billing info" />
          <Tab label="User List" />
        </Tabs>
      </div>
    )
  }
}

export default Navigation