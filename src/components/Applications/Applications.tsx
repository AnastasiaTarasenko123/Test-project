import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import './Applications.scss'
import { ReadApplication } from '../../interfaces/interfaces'
import { AuthUserContext } from '../Session/SessionContext'
import { readApp } from '../../services/appFirebase'
import { Button } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import { compose } from 'recompose'

interface IProps {
    firebase: Firebase,
}

interface IState {
    applications: ReadApplication[]
}

interface IListApplications {
    applications: ReadApplication[]
}

class Applications extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            applications: [],
        }
    }

    componentDidMount = () => {
        readApp(this.props.firebase, '', (value: ReadApplication[]) => { this.setState({ applications: value }) },
            () => { this.setState({ applications: [] }) });
    }

    componentWillUnmount() {
        this.props.firebase.applications().off();
    }

    //виправити: no applications тільки тоді, коли вся база пуста
    render() {
        const { applications } = this.state;
        return (
            applications.length > 0 ? (
                <div className="appList">
                    <ApplicationList applications={applications} />
                </div>)
                :
                (
                    <div>
                        <p>No applications yet.</p>
                    </div>
                )
        );
    }
}

const ApplicationList: React.FC<IListApplications> = ({ applications }) => {
    return (
        <ul>
            <AuthUserContext.Consumer>
                {(authUser: any) => (
                    applications.map(application => (
                        application.userID === authUser!.uid ? (<ApplicationItem key={application.uid} application={application} />) : ("")
                    ))
                )}
            </AuthUserContext.Consumer>
        </ul>
    )
}

const ApplicationItem: React.FC<any> = ({ application }) => (
    <li>
        <div className="appItem">
            <div className="imgContainer">
                <img src={application.picture} alt="App" className="imgApp" />
            </div>
            <div className="appNameContainer">
                <h1 className="appName">{application.appName} </h1>
            </div>
            <div className="btnContainer">
                <Button variant="contained" color="primary" className="btnEdit">
                    <Link to={`${ROUTES.EDITOR}/${application.uid}${ROUTES.APP_INFO}`}>App Edit</Link>
                </Button>
            </div>
        </div>
    </li>
)

export const Application = compose<IProps, {}>(withFirebase, withRouter)(Applications)