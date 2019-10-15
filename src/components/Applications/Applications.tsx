import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'

interface IProps {
    firebase: Firebase
}

interface IState {
    applications: []
}

interface IListProps {
    applications: Array<IProps>
}

class Applications extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            applications: []
        }
    }

    componentDidMount() {
        this.props.firebase.applications().on('value', snapshot => { })
    }

    componentWillUnmount() {
        this.props.firebase.applications().off();
    }

    render() {
        return (<ApplicationList applications={this.state.applications} />);
    }
}

const ApplicationList: React.FC<IListProps> = ({ applications }) => (
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