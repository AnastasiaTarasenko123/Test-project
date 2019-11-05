import React from 'react'
import { IReadStop, LatLng, IReadCategory } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import { readItem, update } from '../../services/itemFirebase'
import { readFileASync } from '../../services/readFile'
import { TextField } from '@material-ui/core'
import InputMap from '../input-components/InputMap/InputMap'
import './StopItem.scss'
import SelectCategory from '../input-components/SelectCategory/SelectCategory'

interface IProps {
    uid: string,
    isGPS: boolean,
    isCategory: boolean,
    firebase: Firebase,
    categories: IReadCategory[]
}

interface IState extends IReadStop { }

const emptyState: IState = {
    uid: '',
    appID: '',
    categoryID: '',
    title: '',
    description: '',
    picture: '',
    videoURL: '',
    place: { lat: 0, lng: 0 }
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
        readItem(this.props.firebase, uid, 'stops', (value: IReadStop) => { this.setState({ ...value }) },
            () => { });
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevProps.uid !== this.props.uid) {
            const { uid } = this.props;
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
        update('stop', this.props.firebase, uid, key, value);
    }

    onChangeFile = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { uid } = this.state;
        e.target.files &&
            readFileASync(e.target.files[0]).then(v => {
                this.setState(prev => ({
                    ...prev, [key]: v
                }))
                update('stop', this.props.firebase, uid, key, v)
            })
    }

    onChangePlace = (selectedPlace: LatLng) => {
        const { uid } = this.state;
        this.setState({
            place: selectedPlace
        });
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
        update('stop', this.props.firebase, uid, 'categoryID', category.uid);
    }

    render() {
        const { title, picture, videoURL, description, place, categoryID } = this.state;
        const { isGPS, isCategory, categories } = this.props;
        return (
            <div className="content-stop">
                <div className={`stop-category no-active ${isCategory ? `active` : ``}`}>
                    <div className="choose-category">
                        <SelectCategory selectCategory={this.getCategory(categoryID)} categories={categories} onChangeCategory={this.onChangeCategory} />
                    </div>
                </div>
                <div className="stop-information">
                    <div className="stop-block img-picture">
                        <TextField
                            margin="normal"
                            onChange={this.onChange('title')}
                            type="text"
                            label="Title Stop"
                            className="input-field-stop"
                            value={title}
                        />
                        <div className={`img-block ${(picture !== '') ? `img-active` : ``}`}>
                            <img src={picture} alt="app" className="img-modal" />
                        </div>
                        <TextField
                            margin="normal"
                            onChange={this.onChangeFile('picture')}
                            type="file"
                            className="input-field-stop"
                        />
                        <TextField
                            margin="normal"
                            onChange={this.onChange('videoURL')}
                            type="text"
                            label="Video URL"
                            className="input-field-stop"
                            value={videoURL}
                        />
                    </div>
                    <div className="stop-block stop-description">
                        <TextField
                            label="Stop Description"
                            multiline
                            rows="18"
                            value={description}
                            onChange={this.onChange('description')}
                            margin="normal"
                            className="description-modal"
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className={`stop-information no-active ${isGPS ? `active` : ``}`}>
                    <div className="stop-map">
                        <InputMap onChangePlace={this.onChangePlace} selectedPlace={place} />
                    </div>
                </div>
            </div>
        )
    }
}

export default withFirebase(StopItem)