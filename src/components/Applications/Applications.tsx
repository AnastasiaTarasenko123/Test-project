import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import './Applications.scss'
import { Application } from '../../interfaces/interfaces'

interface IProps {
    firebase: Firebase,
}

interface IState {
    applications: Array<Application>
}

interface IListApplications {
    applications: Array<Application>
}

class Applications extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            applications: [],
        }
    }

    componentDidMount() {
        // this.props.firebase.applications().on('value', snapshot => {
        //     const applicationObject = snapshot.val();
        //     if (applicationObject) {
        //         const applicationList = Object.keys(applicationObject).map(key => ({
        //             ...applicationObject[key],
        //             uid: key,
        //         }));
        //         this.setState({
        //             applications: applicationList
        //         });
        //     } else {
        //         this.setState({ applications: [] });
        //     }
        // });
    }

    componentWillUnmount() {
        this.props.firebase.applications().off();
    }

    render() {
        const { applications } = this.state;
        return (
            <div>
                {applications.length > 0 ? (<div><p>Apps</p> <ApplicationList applications={this.state.applications} /></div>) : (<p>No applications yet.</p>)}
            </div>
        );
    }
}

const ApplicationList: React.FC<IListApplications> = ({ applications }) => (
    <ul>
        {applications.map(application => (
            <ApplicationItem application={application} />
        ))}
    </ul>
)

const ApplicationItem: React.FC<any> = (application) => (
    <li>
        <p>{application}</p>
    </li>
)

export default withFirebase(Applications)