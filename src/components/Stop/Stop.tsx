import React from 'react'
import './Stop.scss'
import { IStop } from '../../interfaces/interfaces'
import { TextField } from '@material-ui/core';
import { readFileASync } from '../../services/readFile';

interface IProps {
    appID: string;
}

interface IState extends IStop {

}

class Stop extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appID: this.props.appID,
            title: '',
            description: '',
            picture: '',
            videoURL: ''
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

    render() {
        const { title, picture, videoURL, description } = this.state;
        return (
            <div className="content-stop">
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
                <div className="stop-map">

                </div>
            </div>
        );
    }
}

export default Stop