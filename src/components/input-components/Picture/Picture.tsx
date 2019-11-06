import React from 'react'
import { TextField } from '@material-ui/core'
import { readFileASync } from '../../../services/readFile'
import './Picture.scss'

interface IProps {
    picture: string,
    onChangeFile: (picture: string) => void
}

interface IState {
    picture: string
}

class Picture extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            picture: ''
        }
    }

    onChangeFile = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files &&
            readFileASync(e.target.files[0]).then(v => {
                this.setState(prev => ({
                    ...prev, [key]: v
                }))
                this.props.onChangeFile(v);
            })
    }

    render() {
        const { picture } = this.state;
        return (
            <div className="my-picture">
                <div className={`img-block ${(picture !== '') ? `active` : ``}`}>
                    <img src={picture} alt="app" className="img-modal" />
                </div>
                <TextField
                    margin="normal"
                    onChange={this.onChangeFile('picture')}
                    type="file"
                    className="input-field"
                />
            </div>
        )
    }
}

export default Picture