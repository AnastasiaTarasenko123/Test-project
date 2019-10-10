import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization';

class Dashboard extends React.Component {
    render(){
        return(<div></div>);
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Dashboard);
