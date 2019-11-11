import React from 'react'
import { IReadStop, LatLng, IReadCategory, ReadApplication } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import { readItem, update, createItem } from '../../services/itemFirebase'
import { TextField, Button } from '@material-ui/core'
import InputMap from '../input-components/InputMap/InputMap'
import './StopItem.scss'
import SelectCategory from '../input-components/SelectCategory/SelectCategory'
import Picture from '../input-components/Picture/Picture'

interface IProps {
    uid: string,
    categories: IReadCategory[],
    application: ReadApplication | null,
    firebase: Firebase,
    modalChange: () => void
}

interface IState extends IReadStop {
    categories: IReadCategory[],
    selectCategory: IReadCategory | null
}

const emptyState: IState = {
    uid: '',
    appID: '',
    categoryID: '',
    title: 'New Stop',
    description: '',
    picture: '',
    videoURL: '',
    place: { lat: 0, lng: 0 },
    categories: [],
    selectCategory: null
}

class StopItem extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            ...emptyState
        }
    }

    componentDidMount() {
        const { uid } = this.props;
        if (uid !== '')
            readItem(this.props.firebase, uid, 'stops', (value: IReadStop) => { this.setState({ ...value }) },
                () => { });
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const { uid } = this.props;
        if (uid !== '' && prevProps.uid !== this.props.uid) {
            readItem(this.props.firebase, uid, 'stops', (value: IReadStop) => { this.setState({ ...value }) },
                () => { });
        }
    }

    componentWillUnmount() {
        this.props.firebase.db.ref().off();
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const { uid } = this.state;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
        if (uid !== '')
            update('stop', this.props.firebase, uid, key, value);
    }

    onChangeFile = (picture: string) => {
        const { uid } = this.state;
        this.setState({ picture: picture });
        if (uid !== '')
            update('stop', this.props.firebase, uid, 'picture', picture);
    }

    onChangePlace = (selectedPlace: LatLng) => {
        const { uid } = this.state;
        this.setState({
            place: selectedPlace
        });
        if (uid !== '')
            update('stop', this.props.firebase, uid, 'selectedPlace', selectedPlace);
    }

    getCategory = (uid: string): IReadCategory | null => {
        const { categories } = this.props;
        let result = null;
        categories.forEach(category => {
            if (category.uid === uid)
                result = category;
        })
        return result;
    }

    onChangeCategory = (category: IReadCategory) => {
        const { uid } = this.state;
        this.setState({ categoryID: category.uid });
        if (uid !== '')
            update('stop', this.props.firebase, uid, 'categoryID', category.uid);
    }

    addStop = (event: React.FormEvent<HTMLFormElement>) => {
        const { title, description, picture, videoURL, categoryID, place } = this.state;
        const { application } = this.props;
        if (application !== null) {
            let appID: string = application.uid;
            createItem('stops', this.props.firebase, { appID, title, description, picture, videoURL, categoryID, place });
            this.setState({ ...emptyState });
        }
        this.props.modalChange();
        event.preventDefault();
    }

    render() {
        const { title, picture, videoURL, description, place, categoryID } = this.state;
        const { application, categories, uid } = this.props;
        return (
            <div className="content-stop">
                <form onSubmit={event => this.addStop(event)}>
                    {(application && application.isCategories) ?
                        <div className="stop-select-category"><SelectCategory selectCategory={this.getCategory(categoryID)} categories={categories} onChangeCategory={this.onChangeCategory} /></div>
                        :
                        ''}
                    <h2 className="title-content-stop">Stop</h2>
                    <div className="stop-information content-stop-block">
                        <div className="stop-block">
                            <TextField
                                margin="normal"
                                onChange={this.onChange('title')}
                                type="text"
                                label="Title Stop"
                                className="input-field"
                                value={title}
                            />
                            <div className="content-stop-img">
                                <Picture picture={picture} onChangeFile={this.onChangeFile} />
                            </div>
                            <TextField
                                margin="normal"
                                onChange={this.onChange('videoURL')}
                                type="text"
                                label="Video URL"
                                className="input-field"
                                value={videoURL}
                            />
                        </div>
                        <div className="stop-block">
                            <TextField
                                label="Stop Description"
                                multiline
                                rows="10"
                                value={description}
                                onChange={this.onChange('description')}
                                margin="normal"
                                className="input-field"
                            />
                        </div>
                    </div>
                    {(application && application.isGPS) ?
                        <>
                            <h2 className="title-content-stop">Coogle Map</h2>
                            <div className="content-stop-block">
                                <div className="stop-map">
                                    <InputMap onChangePlace={this.onChangePlace} selectedPlace={place} displayLatLng={true} />
                                </div>
                            </div>
                        </>
                        : ''}
                    {uid === '' ?
                        <div className="btn-add-stop">
                            <Button variant="contained" color="primary" type="submit">ADD</Button>
                        </div>
                        : ''}
                </form>
            </div>
        )
    }
}

export default withFirebase(StopItem)