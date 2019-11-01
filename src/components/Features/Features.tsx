import React from 'react'
import './Features.scss'
import { Switch } from '@material-ui/core'
import { RouteParams, ReadApplication } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { RouteComponentProps, withRouter } from 'react-router'
import { readItem, updateApp } from '../../services/itemFirebase'
import { withFirebase } from '../../firebase/FirebaseContext'

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState extends ReadApplication {
}

class Features extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            uid: this.props.match.params.appId || '',
            appName: '',
            picture: '',
            color: '#000000',
            description: '',
            selectedPlace: { lat: 0, lng: 0 },
            isCategories: false,
            isGPS: false,
            userID: ''
        }
    }

    onChangeSwitch = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { uid } = this.state;
        this.setState(prev => ({
            ...prev, [key]: !this.state[key]
        }))
        updateApp(this.props.firebase, uid, key, !this.state[key]);
    }

    componentDidMount() {
        const { uid } = this.state;
        readItem(this.props.firebase, uid, 'applications', (value: ReadApplication) => { this.setState({ ...value }) },
            () => { });
    }

    componentWillUnmoun() {
        this.props.firebase.db.ref().off();
    }

    render() {
        const { isCategories, isGPS } = this.state;
        return (
            <div className="content-features">
                <div className="border-app">
                    <p>Features</p>
                </div>
                <div className="main-features">
                    <div className="choose-features">
                        <p>Choose the features of your app.</p>
                    </div>
                    <div className="features-active">
                        <p>Active</p>
                    </div>
                    <div className="choose-features">
                        <h1>GPS Map</h1>
                        <p>Yurn on the GPS map for app. GPS map with pins at some (or all) of the places.
                             GPS Map allows users to see their location.</p>
                    </div>
                    <div className="features-active">
                        <Switch
                            checked={isGPS}
                            onChange={this.onChangeSwitch('isGPS')}
                            value={!isGPS}
                            color="primary"
                        />
                    </div>
                    <div className="choose-features">
                        <h1>Gategories</h1>
                        <p>Gategories show multiple lists in the app. If categories are turned "OFF" all the stops will be in one list.</p>
                    </div>
                    <div className="features-active">
                        <Switch
                            checked={isCategories}
                            onChange={this.onChangeSwitch('isCategories')}
                            value={!isCategories}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(Features))