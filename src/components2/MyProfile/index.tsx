import React from 'react'
import { Card, CardContent, Typography, IconButton, CardMedia } from '@material-ui/core'

import './style.scss'

import '../../assets/images2/workspace/user.png'

class MyProfile extends React.Component {
  render() {
    return (
      <div className="my-profile">
        <div className="user-data">
          <div className="info"></div>
          <div className="organization"></div>
          <div className="permission"></div>
        </div>
      </div>
    )
  }
}

export default MyProfile 