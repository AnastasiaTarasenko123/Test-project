import React from 'react'
import "./ModalCreateApp.scss"
import { Button, TextField, Radio } from '@material-ui/core'
import { isModalsValid } from '../../services/isDataValid';

interface IProps {
    modalChange: () => void
}

interface IState {
    appName: string,
    blockActive: number
}

class ModalCreateApp extends React.Component<IProps, IState> {
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
        const { appName, blockActive } = this.state;
        return (
            <div className="modalWindow">
                <div className="modalBlock">
                    <div className="navigationModal">

                        <label>
                            <Radio
                                // checked={selectedValue === 'd'}
                                // onChange={handleChange}
                                value="b"
                                color="default"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'D' }}
                            />
                            Welcome
                        </label>
                        <label>
                            <Radio
                                // checked={selectedValue === 'd'}
                                // onChange={handleChange}
                                value="d"
                                color="default"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'D' }}
                            />
                            Branding
                        </label>
                        <label>
                            <Radio
                                // checked={selectedValue === 'd'}
                                // onChange={handleChange}
                                value="d"
                                color="default"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'D' }}
                            />
                            Info
                        </label>
                        <label>
                            <Radio
                                // checked={selectedValue === 'd'}
                                // onChange={handleChange}
                                value="d"
                                color="default"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'D' }}
                            />
                            Features
                        </label>
                        <label>
                            <Radio
                                // checked={selectedValue === 'd'}
                                // onChange={handleChange}
                                value="d"
                                color="default"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'D' }}
                            />
                            Preview
                        </label>
                    </div>
                    <div className={`blocks welcome ${(this.whichBlockActive() == 0) ? `active` : ``}`}>
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
                    <div className={`blocks branding ${(this.whichBlockActive() == 1) ? `active` : ``}`}>
                        <div>
                            <p>Upload Your App Image</p>
                        </div>
                        <div>
                            <p>Choose Your Accent</p>
                        </div>
                    </div>
                    <div className={`blocks info ${(this.whichBlockActive() == 2) ? `active` : ``}`}>
                        <div>
                            <p>Add Your Description</p>
                        </div>
                        <div>
                            <p>Enter Your App Location</p>
                        </div>
                    </div>
                    <div className={`blocks features ${(this.whichBlockActive() == 3) ? `active` : ``}`}>
                        <p>Turn on the feature you want to include in your app.</p>
                    </div>
                    <div className={`blocks preview ${(this.whichBlockActive() == 4) ? `active` : ``}`}>
                        <p>the end.</p>
                    </div>
                    <Button color="primary" className="btn buttonClose" onClick={this.props.modalChange}>X</Button>
                    <Button variant="contained" color="primary" className="btn buttonNext" disabled={isModalsValid(appName, blockActive)} onClick={this.nextBlock.bind(this)}>Next</Button>
                </div>
            </div>
        )
    }
}

export default ModalCreateApp