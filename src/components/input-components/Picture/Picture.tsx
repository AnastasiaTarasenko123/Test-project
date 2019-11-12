import React from 'react'
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

    ref = React.createRef<any>();
    defaultPicture = "../../../assets/images/upload.png";

    onChangeFile = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files &&
            readFileASync(e.target.files[0]).then(v => {
                this.props.onChangeFile(v);
            })
    }

    handleClick = () => {
        this.ref.current && this.ref.current.click();
    }

    render() {
        const { picture } = this.props;
        return (
            <div className="my-picture">
                <div className="my-img-block">
                    {picture === '' ?
                        <img src={require("../../../assets/images/upload.png")} alt="app" className="img-modal" onClick={this.handleClick} />
                        :
                        <img src={picture} alt="app" className="img-modal" onClick={this.handleClick} />
                    }
                </div>
                <input
                    onChange={this.onChangeFile('myPicture')}
                    type="file"
                    className="input-field"
                    ref={this.ref}
                />
            </div>
        )
    }
}

export default Picture