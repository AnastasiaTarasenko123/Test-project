import React from 'react'
import './Lists.scss'
import { Button } from '@material-ui/core'
import { RouteComponentProps } from 'react-router'
import { RouteParams, ReadApplication, IReadCategory, IReadStop } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { readItem, readItems, deleteItem } from '../../services/itemFirebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import { ModalCategory, ModalStops } from '../input-components/Modals/Modals'
import Category from '../Category/Category'
import StopItem from '../StopItem/StopItem'

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState {
    modals: boolean[]
    uid: string,
    application: ReadApplication | null,
    categories: IReadCategory[],
    selectCategory: IReadCategory | null,
    stops: IReadStop[],
    uncategorized: boolean
}

class Lists extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            uid: this.props.match.params.appId || '',
            modals: [false, false],
            application: null,
            categories: [],
            selectCategory: null,
            stops: [],
            uncategorized: false
        }
    }

    componentDidMount() {
        const { uid } = this.state;
        if (uid !== '') {
            readItem(this.props.firebase, uid, 'applications', (value: ReadApplication) => { this.setState({ application: value }) },
                () => { });
            readItems(this.props.firebase, uid, 'categories', (value: IReadCategory[]) => { this.setState({ categories: value }) },
                () => { });
            readItems(this.props.firebase, uid, 'stops', (value: IReadStop[]) => { this.setState({ stops: value }) },
                () => { });
        }
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

    handleCategories = () => (i: number) => () => {
        let temp: IReadCategory | null = null;
        const { categories } = this.state;
        if (i === -1) {
            this.setState(prev => ({
                ...prev,
                uncategorized: true,
                selectCategory: null
            }));
        }
        else if (i === categories.length) {
            this.setState(prev => ({
                ...prev,
                uncategorized: false,
                selectCategory: null
            }));
        }
        else {
            temp = categories[i];
            this.setState(prev => ({
                ...prev,
                selectCategory: temp,
                uncategorized: false
            }))
        }
    }

    deleteCategory = () => {
        const { selectCategory, uid } = this.state;
        if (selectCategory !== null) {
            deleteItem(this.props.firebase, 'category', selectCategory.uid);
            readItems(this.props.firebase, uid, 'categories', (value: IReadCategory[]) => { this.setState({ categories: value }) },
                () => { });
            this.setState({ selectCategory: null })
        }
    }

    handleStop = () => (uidStop: string) => () => {
        const { uid } = this.state;
        deleteItem(this.props.firebase, 'stop', uidStop);
        readItems(this.props.firebase, uid, 'stops', (value: IReadStop[]) => { this.setState({ stops: value }) },
            () => { });
    }

    handleOpen = this.handleModal(true);
    handleClose = this.handleModal(false);
    handleCategory = this.handleCategories();
    deleteStop = this.handleStop();

    render() {
        const { uid, modals, application, categories, selectCategory, stops, uncategorized } = this.state;
        return (
            <div className="content-lists">
                <div className="border-lists">
                    <div className="border-item border-item-main">
                        <p>Lists</p>
                    </div>
                    <div className={`border-item border-item-list border-category-none ${application && application.isCategories ? `active` : ``}`}>
                        <ul>
                            {
                                categories.map((category, index) => (
                                    <li key={index}> <Button variant="outlined" color="primary" onClick={this.handleCategory(index)}>
                                        {category.categoryName}
                                    </Button> </li>
                                ))
                            }
                            <li key={-1}><Button variant="outlined" color="primary" onClick={this.handleCategory(-1)}>
                                Uncategorized
                            </Button></li>
                            <li key={categories.length}><Button variant="outlined" color="primary" onClick={this.handleCategory(categories.length)}>
                                All stops
                            </Button></li>
                        </ul>
                    </div>
                    <div className="border-item border-item-main border-item-btn">
                        <Button variant="outlined" color="default" onClick={this.handleOpen(0)}>+ New Stop</Button>
                    </div>
                    <div className={`border-item border-item-category border-item-btn border-category-none ${application && application.isCategories ? `active` : ``}`}>
                        <Button variant="outlined" color="default" className="btn-category" onClick={this.handleOpen(1)}>+ New Category</Button>
                    </div>
                </div>
                {selectCategory !== null ?
                    <div className="list-item">
                        <div className="list-category">
                            <Category uid={selectCategory.uid} />
                        </div>
                        <Button variant="contained" color="primary" className="btn-delete" onClick={this.deleteCategory}>
                            Delete
                        </Button>
                    </div>
                    :
                    (
                        <div></div>
                    )
                }
                {application !== null && selectCategory !== null
                    ?
                    stops.map(stop => (stop.categoryID === selectCategory.uid
                        ?
                        <div className="list-item" key={stop.uid}>
                            <StopItem uid={stop.uid} application={application} categories={categories} />
                            <div className="btn-stop"> <Button variant="contained" color="primary" className="btn-delete" onClick={this.deleteStop(stop.uid)}>
                                Delete
                                </Button> </div>
                        </div> : null))
                    :
                    ''}
                {application !== null && selectCategory === null && uncategorized
                    ?
                    stops.map(stop => (stop.categoryID === ''
                        ?
                        <div className="list-item" key={stop.uid}>
                            <StopItem uid={stop.uid} application={application} categories={categories} />
                            <Button variant="contained" color="primary" className="btn-delete" onClick={this.deleteStop(stop.uid)}>
                                Delete
                                </Button>
                        </div> : null))
                    :
                    ''}
                {application !== null && selectCategory === null && !uncategorized
                    ?
                    stops.map(stop => (
                        <div className="list-item" key={stop.uid}>
                            <StopItem uid={stop.uid} application={application} categories={categories} />
                            <div className="btn-stop"> <Button variant="contained" color="primary" className="btn-delete" onClick={this.deleteStop(stop.uid)}>
                                Delete
                                </Button> </div>
                        </div>))
                    :
                    null}
                <div className={`modals ${modals[0] ? `active` : ``}`}>
                    <ModalStops modalChange={this.handleClose(0)} application={application} categories={categories} />
                </div>
                <div className={`modals ${modals[1] ? `active` : ``}`}>
                    <ModalCategory modalChange={this.handleClose(1)} appID={uid} />
                </div>
            </div >
        );
    }
}

export default withFirebase(Lists)