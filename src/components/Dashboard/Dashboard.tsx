import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import Applications from '../Applications/Applications'

class Dashboard extends React.Component {
    render() {
        return (
            <Applications />);
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Dashboard)
