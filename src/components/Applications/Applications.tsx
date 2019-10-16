import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import { Button } from '@material-ui/core'
import CreateApp from '../CreateApp/CreateApp';
import './Applications.scss'

interface IProps {
    firebase: Firebase
}

interface IState {
    applications: Array<IApplication>,
    modalActive: boolean
}

interface IListApplications {
    applications: Array<IApplication>
}

interface IApplication {
    name: string
    // image: string,
    // color: string,
    // description: string,
    // location: any,
    // isCategories: boolean,
    // isGPSMap: boolean
}

class Applications extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            applications: [],
            modalActive: false
        }
    }

    componentDidMount() {
        this.props.firebase.applications().on('value', snapshot => {
            const applicationObject = snapshot.val();
            if (applicationObject) {
                const applicationList = Object.keys(applicationObject).map(key => ({
                    ...applicationObject[key],
                    uid: key,
                }));
                this.setState({
                    applications: applicationList
                });
            } else {
                this.setState({ applications: [] });
            }
        });
    }

    // componentWillUnmount() {
    //     this.props.firebase.applications().off();
    // }

    onCreateApplication() { }

    onChangeApplication() { }

    openModal() {
        this.setState({ modalActive: true });
    }

    closeModal() {
        this.setState({ modalActive: false })
    }

    render() {
        const { applications, modalActive } = this.state;
        return (
            <div>
                {applications.length > 0 ? (<ApplicationList applications={this.state.applications} />) : (<p>No applications yet.</p>)}
                <Button variant="contained" type="submit" onClick={this.openModal.bind(this)}>
                    + Create App
                </Button>
                <div className={`modals ${modalActive ? `active` : ``}`}>
                    <CreateApp modalChange = {this.closeModal.bind(this)} />
                </div>
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