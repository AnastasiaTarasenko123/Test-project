import React from 'react'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import { Button, TextField } from '@material-ui/core';

interface IProps {
    firebase: Firebase
}

interface IState {
    applications: Array<IApplication>
   // testState: any
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
            applications: []
        }
    }

    // setTest = (info: any) => {
    //     this.setState({testState: info})
    // }

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

    render() {
        const { applications } = this.state;
        return (
            <div>
                {applications.length > 0 ? (<ApplicationList applications={this.state.applications} />) : (<p>No applications yet.</p>)}
                <form onSubmit={this.onCreateApplication}>
                    <TextField
                        label="Name"
                       // value={values.name}
                       // onChange={handleChange('name')}
                        margin="normal"
                    />
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                    {/* <Test valueChange={this.setTest} /> */}
                </form>
            </div>
        );
    }
}

// interface TestProps {
//     valueChange: (val: any) => void
// }

// class Test extends React.Component<TestProps> {
//     render() {
//         return (
//             <div onClick={() => this.props.valueChange('sss')}>

//             </div>
//         )
//     }
// }

const ApplicationList: React.FC<IState> = ({ applications }) => (
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