import React from 'react'
import './Lists.scss'
import { Button } from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router'
import { RouteParams, ReadApplication, IReadCategory, IReadStop } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { readItem, readItems } from '../../services/itemFirebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import ModalStops from '../ModalStops/ModalStops'
import ModalCategory from '../ModalCategory/ModalCategory'
import Category from '../Category/Category'

interface IProps extends RouteComponentProps<RouteParams> {
    firebase: Firebase
}

interface IState {
    modals: boolean[]
    uid: string,
    application: ReadApplication | null,
    categories: IReadCategory[],
    selectCategory: IReadCategory | null,
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
            selectCategory: null,
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

    handleCategories = () => (i: number) => () => {
        let temp: IReadCategory | null = null;
        const { categories } = this.state;
        if (i !== categories.length && i !== -1)
            temp = categories[i];
        this.setState(prev => ({
            ...prev,
            selectCategory: temp
        }))
    }

    handleCategory = this.handleCategories();

    handleAllStops = () => {

    }

    render() {
        const { uid, modals, application, categories, selectCategory, stops } = this.state;
        return (
            <div className="content-lists">
                <div className="border-lists">
                    <div className="border-item">
                        <p>Lists</p>
                    </div>
                    <div className={`border-list border-category ${application && application.isCategories ? `active` : ``}`}>
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
                    <div className="border-item border-stop">
                        <Button variant="contained" color="primary" onClick={this.handleOpen(0)}>+ New Stop</Button>
                    </div>
                    <div className={`border-item border-category ${application && application.isCategories ? `active` : ``}`}>
                        <Button variant="contained" color="primary" className="btn-category" onClick={this.handleOpen(1)}>+ New Category</Button>
                    </div>
                </div>
                {selectCategory !== null ?
                    <div className="categories">
                        <p>Category</p>
                        <Category uid={selectCategory.uid} />
                    </div>
                    :
                    (
                        <div></div>
                    )
                }
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

export default withFirebase(withRouter(Lists))