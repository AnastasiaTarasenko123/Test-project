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
    modals: boolean[]
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
            modals: [false, false],
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

    handleModal = (value: boolean) => (i: number) => () => {
        this.setState(prevState => {
            const modals = [...prevState.modals]
            modals[i] = value
            return {
                ...prevState,
                modals
            }
        });
    };

    handleOpen = this.handleModal(true)
    handleClose = this.handleModal(false)

    render() {
        const { uid, modals, application, categories, stops } = this.state;
        console.log(application, categories, stops);
        return (
            <div className="content-lists">
                <div className="border-lists">
                    <div className="border-item">
                        <p>Lists</p>
                    </div>
                    <div className={`border-list border-category ${application && application.isCategories ? `active` : ``}`}>
                        <ul>
                            {
                                categories.map(category => (
                                    <li>{category.categoryName}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="border-item border-stop">
                        <Button variant="contained" color="primary" onClick={this.handleOpen(0)}>+ New Stop</Button>
                    </div>
                    <div className={`border-item border-category ${application && application.isCategories ? `active` : ``}`}>
                        <Button variant="contained" color="primary" className="btn-category" onClick={this.handleOpen(1)}>+ New Category</Button>
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
                <div className={`modals ${modals[0] ? `active` : ``}`}>
                    <ModalStops modalChange={this.handleClose(0)} appID={uid} />
                </div>
                <div className={`modals ${modals[1] ? `active` : ``}`}>
                    <ModalCategory modalChange={this.handleClose(1)} appID={uid} />
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