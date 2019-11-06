import React from 'react'
import { TextField } from '@material-ui/core'
import { readFileASync } from '../../../services/readFile'
import './Picture.scss'

interface IProps {
    picture: string,
    onChangeFile: (picture: string) => void
}

interface IState {
    myPicture: string
}

class Picture extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            myPicture: ''
        }
    }

    onChangeFile = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files &&
            readFileASync(e.target.files[0]).then(v => {
                this.props.onChangeFile(v);
            })
    }

    render() {
        const { picture } = this.props;
        return (
            <div className="my-picture">
                <div className={`img-block ${(picture !== '') ? `active` : ``}`}>
                    <img src={picture} alt="app" className="img-modal" />
                </div>
                <TextField
                    margin="normal"
                    onChange={this.onChangeFile('myPicture')}
                    type="file"
                    className="input-field"
                />
            </div>
        )
    }
}

export default Picture