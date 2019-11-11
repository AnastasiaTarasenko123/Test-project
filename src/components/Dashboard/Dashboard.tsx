import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import { Application } from '../Applications/Applications'
import { Button } from '@material-ui/core'
import ModalCreateApp from '../ModalCreateApp/ModalCreateApp'
import './Dashboard.scss'

interface IProps { }

interface IState {
    isModalActive: boolean
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
            <div className="dashboard">
                <div className="header-dashboard">
                    <div className="header-text">
                        <h1>My Dashboard</h1>
                    </div>
                    <div className="header-btn">
                        <Button variant="outlined" color="default" type="submit" onClick={this.openModal.bind(this)}>+ Create App</Button>
                    </div>
                </div>
                <div className="apps">
                    <Application />
                </div>
                <div className={`modals ${isModalActive ? `active` : ``}`}>
                    <ModalCreateApp modalChange={this.closeModal.bind(this)} />
                </div>
            </div >);
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Dashboard)
