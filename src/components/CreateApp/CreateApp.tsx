import React from 'react'
import "./CreateApp.scss"
import { Button, TextField } from '@material-ui/core'
import { isAppNameValid } from '../../services/isDataValid';

interface IProps {
    modalChange: () => void
}

interface IState {
    appName: string,
    blockActive: number
}

class CreateApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appName: "",
            blockActive: 0
        }
    }

    whichBlockActive = () => (this.state.blockActive);

    nextBlock = () => {
        var temp: number = this.state.blockActive + 1;
        this.setState({ blockActive: temp })
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    render() {
        const { appName } = this.state;
        return (
            <div className="modalWindow">
                <div className="modalBlock">
                    <div className={`modalBlocks appName ${(this.whichBlockActive() == 0) ? `active` : ``}`}>
                        <p>Welcome! Let us help you get started!</p>
                        <form>
                            <TextField
                                label="Your App Name"
                                onChange={this.onChange("appName")}
                                margin="normal"
                                variant="outlined"
                            />
                        </form>
                        <p className="textRemember">Remember, you can always change your options in our App Configuration screens.</p>
                    </div>
                    <div className={`modalBlocks uploadImage ${(this.whichBlockActive() == 1) ? `active` : ``}`}>
                        <p>Image</p>
                    </div>
                    <Button className="btn buttonClose" onClick={this.props.modalChange}>X</Button>
                    <Button variant="contained" color="primary" className="btn buttonNext" disabled={isAppNameValid(appName)} onClick={this.nextBlock.bind(this)}>Next</Button>
                </div>
            </div>
        )
    }
}

export default CreateApp