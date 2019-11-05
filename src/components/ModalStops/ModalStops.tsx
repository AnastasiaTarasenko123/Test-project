import React from 'react'
import './ModalStops.scss'
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core'
import InputMap from '../input-components/InputMap/InputMap'
import { IStop, LatLng, IReadCategory } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import { createItem, readItems } from '../../services/itemFirebase'
import { readFileASync } from '../../services/readFile'
import SelectCategory from '../input-components/SelectCategory/SelectCategory'

interface IProps {
    modalChange: () => void,
    firebase: Firebase,
    appID: string,
    isGPS: boolean,
    isCategory: boolean
}

interface IState extends IStop {
    categories: IReadCategory[],
    selectCategory: IReadCategory | null
}

class ModalStops extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appID: this.props.appID,
            title: 'New Stop',
            description: '',
            picture: '',
            videoURL: '',
            categoryID: '',
            place: { lat: 0, lng: 0 },
            categories: [],
            selectCategory: null
        }
    }

    componentDidMount() {
        const { appID } = this.props;
        readItems(this.props.firebase, appID, 'categories', (value: IReadCategory[]) => { this.setState({ categories: value }) },
            () => { });
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
    }

    onChangeFile = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files &&
            readFileASync(e.target.files[0]).then(v => {
                this.setState(prev => ({
                    ...prev, [key]: v
                }))
            })
    }

    onChangePlace = (selectedPlace: LatLng) => {
        this.setState({
            place: selectedPlace
        })
    }

    addStop = (event: React.FormEvent<HTMLFormElement>) => {
        const { appID, title, description, picture, videoURL, categoryID, place } = this.state;
        createItem('stops', this.props.firebase, { appID, title, description, picture, videoURL, categoryID, place });
        this.props.modalChange();
        event.preventDefault();
    }

    onChangeCategory = (category: IReadCategory) => {
        this.setState({ selectCategory: category, categoryID: category.uid });
    }

    render() {
        const { title, picture, videoURL, description, place, categories, selectCategory } = this.state;
        const { isGPS, isCategory } = this.props;
        return (
            <div className="modal-window">
                <div className="modal-block">
                    <div className="content-stop">
                        <form onSubmit={event => this.addStop(event)}>
                            <h2>Stop</h2>
                            <div className={`stop-information no-active ${isCategory ? `active` : ``}`}>
                                <SelectCategory selectCategory={selectCategory} categories={categories} onChangeCategory={this.onChangeCategory} />
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
                            <div className="send-stop">
                                <Button variant="contained" className="btn-add-stop" type="submit">ADD</Button>
                            </div>
                        </form>
                    </div>
                    <Button className="btn btn-close" onClick={this.props.modalChange}>X</Button>
                </div>
            </div>
        );
    }
}

export default withFirebase(ModalStops)