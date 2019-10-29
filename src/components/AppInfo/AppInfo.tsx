import React from 'react'
import './AppInfo.scss'
import { RouteComponentProps, withRouter } from 'react-router'
import Firebase from '../../firebase/Firebase'
import { ReadApplication } from '../../interfaces/interfaces'
import { withFirebase } from '../../firebase/FirebaseContext'
import { readApp } from '../../services/appFirebase'
import { TextField } from '@material-ui/core'

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
        return (
            <div className="content-app-info">
                <div className="border-app">
                    <p>App Info</p>
                </div>
                <div className="content content-app-img">
                    <div className="img">
                        <p>App Image</p>
                        {myApp && <img src={myApp!.picture} alt="app" className="app-img" />}
                    </div>
                    <div className="choose-color">
                        <p>Accent Color</p>
                        <div className="color">
                            <TextField
                                label="Choose your color"
                                className="color-input"
                                margin="normal"
                                value={myApp && myApp.color}
                                //onChange={this.onChange("color")}
                                type="color"
                            />
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div>
                        <TextField
                            //  onChange={this.onChange('appName')}
                            type="text"
                            margin="normal"
                            variant="outlined"
                            value={myApp && myApp.appName}
                        />
                    </div>
                    <div>
                        <TextField
                            multiline
                            rows="18"
                            value={myApp &&   myApp.description}
                            //  onChange={this.onChange('description')}
                            margin="normal"
                            variant="outlined"
                            className="inputInfo"
                        />
                    </div>
                </div>
                <div>

                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(AppInfo))