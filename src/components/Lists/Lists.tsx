import React from 'react'
import './Lists.scss'
import { Button } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'
import { RouteParams, ReadApplication } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { readApp } from '../../services/itemFirebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import ModalStops from '../ModalStops/ModalStops'

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState extends ReadApplication {
    openModal: boolean,
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
            userID: '',
            openModal: false
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

    handleOpen = () => {
        this.setState({ openModal: true });
    };

    handleClose = () => {
        this.setState({ openModal: false });
    };

    render() {
        const { openModal, uid } = this.state;
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
                        <Button variant="contained" color="primary" onClick={this.handleOpen}>+ New Stop</Button>
                    </div>
                </div>
                {/* чомусь стилі добре не підключаються, потім ще подивлюсь
                    <Modal
                        open={this.state.openModal}
                        onClose={this.handleClose}
                        className="paper"
                    >
                        <div>
                            <h2>Text in a modal</h2>
                            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                        </div>
                    </Modal> */}
                <div className={`modals ${openModal ? `active` : ``}`}>
                    <ModalStops modalChange={this.handleClose.bind(this)} appID={uid} />
                </div>
            </div>
        );
    }
}

export default withFirebase(withRouter(Lists))