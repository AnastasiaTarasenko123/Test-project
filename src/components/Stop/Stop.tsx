import React from 'react'
import './Stop.scss'
import { IStop, LatLng } from '../../interfaces/interfaces'
import { TextField, Button } from '@material-ui/core'
import { readFileASync } from '../../services/readFile'
import InputMap from '../input-components/InputMap/InputMap'
import { createItem } from '../../services/itemFirebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'

interface IProps {
    appID: string,
    firebase: Firebase,
    modalChange: () => void
}

interface IState extends IStop {

}

class Stop extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appID: this.props.appID,
            title: 'New Stop',
            description: '',
            picture: '',
            videoURL: '',
            categoryID: '',
            place: { lat: 0, lng: 0 }
        }
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
        createItem('stops', this.props.firebase, {appID, title, description, picture, videoURL, categoryID, place});
        this.props.modalChange();
        event.preventDefault();
    }

    render() {
        const { title, picture, videoURL, description, place } = this.state;
        return (
            <div className="content-stop">
                <form onSubmit={event => this.addStop(event)}>
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
                    <div className="stop-information">
                        <div className="stop-map">
                            <InputMap onChangePlace={this.onChangePlace} selectedPlace={place} />
                        </div>
                    </div>
                    <div className="send-stop">
                        <Button variant="contained" className="btn-add-stop" type="submit">ADD</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withFirebase(Stop)