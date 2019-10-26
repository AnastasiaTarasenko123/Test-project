import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import './Applications.scss'
import { Application } from '../../interfaces/interfaces'

interface AppOn extends Application {
    uid: string;
}

interface IProps {
    firebase: Firebase,
}

interface IState {
    applications: AppOn[]
}

interface IListApplications {
    applications: AppOn[]
}

class Applications extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            applications: [],
        }
    }

    componentDidMount() {
        this.props.firebase.applications().on('value', snapshot => {
            const appObject = snapshot.val();
            if (appObject) {
                const appList: AppOn[] = Object.keys(appObject).map(key => ({
                    ...appObject[key],
                    uid: key,
                }));
                this.setState({
                    applications: appList,
                })
            } else {
                this.setState({ applications: [] });
            }
        });
    }

    componentWillUnmount() {
        this.props.firebase.applications().off();
    }

    render() {
        const { applications } = this.state;
        console.log(applications);
        return (
            <div>
                {applications ? (<div><p>Apps</p> <ApplicationList applications={this.state.applications} /></div>) : (<p>No applications yet.</p>)}
            </div>
        );
    }
}

const ApplicationList: React.FC<IListApplications> = ({ applications }) => {
    return (
        <ul>
            {applications.map(application => (
                <ApplicationItem key={application.uid} application={application} />
            ))} 
        </ul>
    )
}

const ApplicationItem: React.FC<any> = ({application}) => (
    <li>
        <p>{application.appName}</p>
        <p>{application.description}</p>
    </li>
)

export default withFirebase(Applications)