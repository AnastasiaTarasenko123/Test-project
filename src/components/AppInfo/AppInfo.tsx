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
            <div className="contentAppInfo">
                <div className="borderApp">
                    <p>App Info</p>
                </div>
                <div className="appImgContent">
                    <div className="imgContent">
                        {myApp && <img src={myApp!.picture} alt="app" className="appImg" />}
                    </div>
                    <div className="chooseColorContent">
                        <p>Accent Color</p>
                        <TextField
                            label="Choose your color"
                            className="colorInput"
                            margin="normal"
                            //value={color}
                            //onChange={this.onChange("color")}
                            type="color"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(AppInfo))