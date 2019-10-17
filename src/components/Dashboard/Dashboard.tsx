import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import Applications from '../Applications/Applications'
import { Button } from '@material-ui/core'
import ModalCreateApp from '../ModalCreateApp/ModalCreateApp'

interface IProps { }

interface IState {
    isModalActive: boolean;
}

class Dashboard extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isModalActive: false
        }
    }

    openModal = () => {
        this.setState({ isModalActive: true })
    }

    closeModal() {
        this.setState({ isModalActive: false })
    }

    render() {
        const { isModalActive } = this.state;
        return (
            <div>
                <div className="headerDashboard">
                    <h1>My Dashboard</h1>
                    <Button variant="contained" type="submit" color="primary" onClick={this.openModal.bind(this)}>
                        + Create App
                    </Button>
                    <div className={`modals ${isModalActive ? `active` : ``}`}>
                        <ModalCreateApp modalChange={this.closeModal.bind(this)} />
                    </div>
                </div>
                <p>Apps</p>
                <Applications />
            </div>);
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Dashboard)
