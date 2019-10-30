import React from 'react'
import './AppInfo.scss'
import { RouteComponentProps, withRouter } from 'react-router'
import Firebase from '../../firebase/Firebase'
import { ReadApplication, LatLng } from '../../interfaces/interfaces'
import { withFirebase } from '../../firebase/FirebaseContext'
import { readApp } from '../../services/appFirebase'
import { TextField } from '@material-ui/core'
import MapContainer from '../MapContainer/MapContainer'

interface RouteParams {
    appId: string
}

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState {
    appId: string,
    myApp: ReadApplication | null
}

class AppInfo extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appId: this.props.match.params.appId || '',
            myApp: null
        }
    }

    onMapClicked = async (place: LatLng) => {
        // this.setState({
        //     selectedPlace: place
        // });
        // const result = await codePlace(place)
        // if (!('message' in result)) {
        //     this.setState({
        //         location: result
        //     });
        // } else {
        //     console.log(result.message);
        // }
    }

    componentDidMount() {
        const { appId } = this.state;
        readApp(this.props.firebase, appId, (value: ReadApplication) => { this.setState({ myApp: value }) },
            () => { this.setState({ myApp: null }) });
    }

    componentWillUnmoun() {
        this.props.firebase.db.ref().off();
    }

    render() {
        const { myApp } = this.state;
        const temp: LatLng = { lat: 4, lng: 5 };
        return (
            <div className="content-app-info">
                <div className="border-app">
                    <p>App Info</p>
                </div>
                <div className="content content-app-img">
                    <div className="img in-content-app">
                        <p>App Image</p>
                        {myApp && <img src={myApp!.picture} alt="app" className="field-content-img" />}
                    </div>
                    <div className="choose-color in-content-app">
                        <p>Accent Color</p>
                        <div className="color">
                            <TextField
                                label="Choose your color"
                                className="field-content-img"
                                margin="normal"
                                value={myApp && myApp.color}
                                //onChange={this.onChange("color")}
                                type="color"
                            />
                        </div>
                    </div>
                </div>
                <div className="content content-app-name">
                    <div className="in-content-app">
                        <label>App Name</label>
                        <TextField
                            //  onChange={this.onChange('appName')}
                            type="text"
                            margin="normal"
                            variant="outlined"
                            value={myApp && myApp.appName}
                            className="field-content-app"
                        />
                    </div>
                    <div className="in-content-app">
                        <label>App Description</label>
                        <TextField
                            multiline
                            rows="5"
                            value={myApp && myApp.description}
                            //  onChange={this.onChange('description')}
                            margin="normal"
                            variant="outlined"
                            className="field-content-app"
                        />
                    </div>
                </div>
                <div className="content content-location">
                    <div className="in-content-app">
                        <div className="location">
                            <label>App Address</label>
                            <TextField
                                //  onChange={this.onChange('appName')}
                                margin="normal"
                                variant="outlined"
                                //  value={myApp && myApp.appName}
                                className="field-content-app"
                            />
                        </div>
                        <div className="lat-lng">
                            <label>Lat Address</label>
                            <TextField
                                //  onChange={this.onChange('appName')}
                                type="text"
                                margin="normal"
                                variant="outlined"
                                value={myApp && myApp.selectedPlace.lat}
                                className="field-content-latlng"
                            />
                            <br/>
                            <label>Lng Address</label>
                            <TextField
                                //  onChange={this.onChange('appName')}
                                margin="normal"
                                variant="outlined"
                                //  value={myApp && myApp.appName}
                                className="field-content-latlng"
                                value={myApp && myApp.selectedPlace.lng}
                            />
                        </div>
                    </div>
                    <div className="in-content-app">
                        <MapContainer onMapClicked={this.onMapClicked} selectedPlace={temp} />
                    </div>
                </div >
                <div>
                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(AppInfo))