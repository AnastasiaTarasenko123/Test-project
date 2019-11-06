import React from 'react'
import { IReadStop, LatLng, IReadCategory, ReadApplication } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import { readItem, update, createItem } from '../../services/itemFirebase'
import { readFileASync } from '../../services/readFile'
import { TextField, Button } from '@material-ui/core'
import InputMap from '../input-components/InputMap/InputMap'
import './StopItem.scss'
import SelectCategory from '../input-components/SelectCategory/SelectCategory'

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

    onChangeFile = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { uid } = this.state;
        e.target.files &&
            readFileASync(e.target.files[0]).then(v => {
                this.setState(prev => ({
                    ...prev, [key]: v
                }))
                if (uid !== '')
                    update('stop', this.props.firebase, uid, key, v)
            })
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
            this.setState({...emptyState});
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
                        <SelectCategory selectCategory={this.getCategory(categoryID)} categories={categories} onChangeCategory={this.onChangeCategory} />
                        :
                        ''}
                    <h2 className="title">Stop</h2>
                    <div className="stop-information">
                        <div className="stop-block">
                            <TextField
                                margin="normal"
                                onChange={this.onChange('title')}
                                type="text"
                                label="Title Stop"
                                className="input-field"
                                value={title}
                            />
                            <div className={`img-block ${(picture !== '') ? `active` : ``}`}>
                                <img src={picture} alt="app" className="img-modal" />
                            </div>
                            <TextField
                                margin="normal"
                                onChange={this.onChangeFile('picture')}
                                type="file"
                                className="input-field"
                            />
                            <br />
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
                        <div>
                            <h2 className="title">Coogle Map</h2>
                            <div className="stop-map">
                                <InputMap onChangePlace={this.onChangePlace} selectedPlace={place} />
                            </div>
                        </div>
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