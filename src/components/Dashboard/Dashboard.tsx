import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import Applications from '../Applications/Applications'

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>My Dashboard</h1>
                <p>Apps</p>
                <Applications />
            </div>);
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Dashboard)
