import React from 'react'
import './Lists.scss'
import { Button } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'
import { RouteParams, ReadApplication } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { readApp } from '../../services/appFirebase'
import { withFirebase } from '../../firebase/FirebaseContext'

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState extends ReadApplication {
}

class Lists extends React.Component<IProps, IState> {
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

    componentDidMount() {
        const { uid } = this.state;
        readApp(this.props.firebase, uid, (value: ReadApplication) => { this.setState({ ...value }) },
            () => { });
    }

    componentWillUnmoun() {
        this.props.firebase.db.ref().off();
    }
    
    render() {
        const { isCategories } = this.state;
        return (
            <div className="content-lists">
                <div className="border-lists">
                    <div className="border-item">
                        <p>Lists</p>
                    </div>
                    <div className="border-list">
                        <ul></ul>
                    </div>
                    <div className="border-item">
                        <Button variant="contained" color="primary" type="submit">+ New Stop</Button>
                    </div>
                    <div className={`border-item category ${isCategories ? `active` : ``}`} >
                        <Button variant="contained" color="primary" type="submit">+ New Category</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(Lists))