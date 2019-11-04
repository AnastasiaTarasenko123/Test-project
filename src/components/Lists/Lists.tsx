import React from 'react'
import './Lists.scss'
import { Button, TextField } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'
import { RouteParams, ReadApplication, IReadCategory, IReadStop } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { readItem, readItems } from '../../services/itemFirebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import ModalStops from '../ModalStops/ModalStops'
import ModalCategory from '../ModalCategory/ModalCategory'

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState {
    openModal1: boolean,
    openModal2: boolean,
    uid: string,
    application: ReadApplication | null,
    categories: IReadCategory[],
    stops: IReadStop[]
}

class Lists extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            uid: this.props.match.params.appId || '',
            openModal1: false,
            openModal2: false,
            application: null,
            categories: [],
            stops: []
        }
    }

    componentDidMount() {
        const { uid } = this.state;
        readItem(this.props.firebase, uid, 'applications', (value: ReadApplication) => { this.setState({ application: value }) },
            () => { });
        readItems(this.props.firebase, uid, 'categories', (value: IReadCategory[]) => { this.setState({ categories: value }) },
            () => { });
        readItems(this.props.firebase, uid, 'stops', (value: IReadStop[]) => { this.setState({ stops: value }) },
            () => { });
    }

    componentWillUnmoun() {
        this.props.firebase.db.ref().off();
    }

    //перероблю з норм модальним
    handleOpen1 = () => {
        this.setState({ openModal1: true });
    };

    handleClose1 = () => {
        this.setState({ openModal1: false });
    };

    handleOpen2 = () => {
        this.setState({ openModal2: true });
    };

    handleClose2 = () => {
        this.setState({ openModal2: false });
    };

    render() {
        const { openModal1, openModal2, uid, application, categories, stops } = this.state;
        console.log(application, categories, stops);
        return (
            <div className="content-lists">
                <div className="border-lists">
                    <div className="border-item">
                        <p>Lists</p>
                    </div>
                    <div className="border-list">
                        <ul>
                            {
                                categories.map(category => (
                                    <li>{category.categoryName}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="border-item">
                        <Button variant="contained" color="primary" onClick={this.handleOpen1}>+ New Stop</Button>
                    </div>
                    <div className="border-item">
                        <Button variant="contained" color="primary" className="btn-category" onClick={this.handleOpen2}>+ New Category</Button>
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
                <div className={`modals ${openModal1 ? `active` : ``}`}>
                    <ModalStops modalChange={this.handleClose1.bind(this)} appID={uid} />
                </div>
                <div className={`modals ${openModal2 ? `active` : ``}`}>
                    <ModalCategory modalChange={this.handleClose2.bind(this)} appID={uid} />
                </div>
            </div>
        );
    }
}

const CategoryItem: React.FC<IReadCategory> = (category) => (
    <div>
        <TextField
            margin="normal"
            type="text"
            className="input-field"
            value={category.categoryName}
            label="Category Name"
        />
        <br />
        <TextField
            label="Stop Description"
            multiline
            rows="8"
            value={category.description}
            margin="normal"
            className="input-field"
            variant="outlined"
        />
    </div>
);

export default withFirebase(withRouter(Lists))