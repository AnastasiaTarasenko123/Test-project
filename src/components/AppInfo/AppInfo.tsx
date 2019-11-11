import React from 'react'
import './AppInfo.scss'
import { RouteComponentProps, withRouter } from 'react-router'
import Firebase from '../../firebase/Firebase'
import { ReadApplication, LatLng, RouteParams } from '../../interfaces/interfaces'
import { withFirebase } from '../../firebase/FirebaseContext'
import { readItem, update } from '../../services/itemFirebase'
import { TextField } from '@material-ui/core'
import InputMap from '../input-components/InputMap/InputMap'
import Picture from '../input-components/Picture/Picture'

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState extends ReadApplication {
}

class AppInfo extends React.Component<IProps, IState> {
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

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const { uid } = this.state;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
        update('application', this.props.firebase, uid, key, value);
    }

    onChangeSwitch = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(prev => ({
            ...prev, [key]: !this.state[key]
        }))
    }

    onChangeFile = (picture: string) => {
        const { uid } = this.state;
        this.setState({ picture });
        update('application', this.props.firebase, uid, 'picture', picture);
    }

    onChangePlace = (selectedPlace: LatLng) => {
        const { uid } = this.state;
        this.setState({ selectedPlace });
        update('application', this.props.firebase, uid, 'selectedPlace', selectedPlace);
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
        const { appName, picture, color, description, selectedPlace } = this.state;
        return (
            <div className="content-app-info">
                <div className="border-app">
                    <p>App Info</p>
                </div>
                <div className="content-bg content-app-img content">
                    <div className="img in-content-app">
                        <p className="app-img-text">App Image</p>
                        <Picture picture={picture} onChangeFile={this.onChangeFile} />
                    </div>
                    <div className="choose-color in-content-app">
                        <p>Accent Color</p>
                        <div className="color">
                            <TextField
                                label="Choose your color"
                                className="field-content-app"
                                margin="normal"
                                value={color}
                                onChange={this.onChange("color")}
                                type="color"
                            />
                        </div>
                    </div>
                </div>
                <div className="content content-app-name content-bg">
                    <div className="in-content-app">
                        <label>App Name</label>
                        <br/>
                        <TextField
                            onChange={this.onChange('appName')}
                            type="text"
                            margin="normal"
                            variant="outlined"
                            value={appName}
                            className="field-content-img"
                        />
                    </div>
                    <div className="in-content-app">
                        <label>App Description</label>
                        <br/>
                        <TextField
                            multiline
                            rows="5"
                            value={description}
                            onChange={this.onChange('description')}
                            margin="normal"
                            variant="outlined"
                            className="field-content-app"
                        />
                    </div>
                </div>
                <div className="content-bg content-location">
                    <InputMap onChangePlace={this.onChangePlace} selectedPlace={selectedPlace} displayLatLng={true} />
                </div >
                <div>
                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(AppInfo))