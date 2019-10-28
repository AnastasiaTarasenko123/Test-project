import React from 'react'
import './AppInfo.scss'
import { RouteComponentProps, withRouter } from 'react-router'
import Firebase from '../../firebase/Firebase'
import { ReadApplication } from '../../interfaces/interfaces'
import { withFirebase } from '../../firebase/FirebaseContext'
import { readApp } from '../../services/appFirebase'

interface RouteParams {
    uid: string
}

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState {
    uid: string,
    myApp: ReadApplication | null
}

class AppInfo extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            uid: this.props.match.params.uid.slice(1),
            myApp: null
        }
    }

    componentDidMount() {
        const { uid } = this.state;
        readApp(this.props.firebase, uid, (value: ReadApplication) => { this.setState({ myApp: value }) },
        () => { this.setState({ myApp: null }) });
    }

    componentWillUnmount() {
        this.props.firebase.db.ref().off();
    }

    render() {
        return (
            <div className="contentAppInfo">
                <div className="borderApp">
                    <p>App Info</p>
                </div>
                <div className="appImg">

                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(AppInfo))