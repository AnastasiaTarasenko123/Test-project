import React from 'react'
import { Tab, Tabs, Button } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

interface IState {
  active: number;
}

interface IProps {
  activeBlock: number;
  onChange: (activeBlock: number) => void
}

class Navigation extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      active: 0
    }
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ active: newValue });
    this.props.onChange(newValue);
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
        <Button
          className="close"
          startIcon={<FontAwesomeIcon icon={faTimes}
            className="setting-logo" />}
        >
          Close account
          </Button>
      </div>
    )
  }
}

export default Navigation