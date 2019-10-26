import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import './Applications.scss'
import { ReadApplication } from '../../interfaces/interfaces'
import { AuthUserContext } from '../Session/SessionContext'
import { readApps } from '../../services/appFirebase'

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
        readApps(this.props.firebase, (value: ReadApplication[]) => { this.setState({ applications: value }) },
            () => { this.setState({ applications: [] }) })
    }

    componentWillUnmount() {
        this.props.firebase.applications().off();
    }

    //виправити: no applications тільки тоді, коли вся база пуста
    render() {
        const { applications } = this.state;
        return (
            applications.length > 0 ? (
                <div>
                    <p>Apps</p>
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
        <p>{application.appName}</p>
        <p>{application.userID}</p>
    </li>
)

export default withFirebase(Applications)