import React from 'react'
import "./ModalCreateApp.scss"
import { Button, TextField, Radio } from '@material-ui/core'
import { isModalsValid } from '../../services/isDataValid';
import ImageUploader from 'react-images-upload';
import { ChromePicker, ColorChangeHandler, } from 'react-color'

interface IProps {
    modalChange: () => void
}

interface IState {
    appName: string,
    picture: ImageUploader | null,
    color: string,
    blockActive: number,
    next: number,
    valueBtn: string
}

class ModalCreateApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appName: "",
            picture: null,
            color: "#000000",
            blockActive: 0,
            next: 0,
            valueBtn: "Next" || "Finish"
        }
    }

    whichBlockActive = () => (this.state.blockActive);

    nextBlock = () => {
        var temp: number = this.state.blockActive;
        var nextTemp: number = this.state.next;
        this.checkBtn(++temp);
        this.setState({ blockActive: temp, next: ++nextTemp });
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.setState(prev => ({
            ...prev,
            [key]: value
        }))
        if (e.target.name == "blockActive")
            this.checkBtn(Number(value));
    }

    checkBtn = (temp: number) => {
        if (this.state.valueBtn == "Next" && temp > 3)
            this.setState({ valueBtn: "Finish" });
        else if (this.state.valueBtn == "Finish" && temp < 4)
            this.setState({ valueBtn: "Next" });
    }

    onChangeColorPicker = () => {

    }

    //ColorPicker, ImageUpload haven't done

    render() {
        const { appName, color, blockActive, valueBtn, next } = this.state;
        return (
            <div className="modalWindow">
                <div className="modalBlock">
                    <div className="navigationModal">
                        <div className="radioBtn">
                            <Radio
                                checked={blockActive == 0}
                                onChange={this.onChange("blockActive")}
                                value="0"
                                color="default"
                                disabled={!(next >= 0)}
                            />
                            <br />
                            <label>Welcome</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={blockActive == 1}
                                onChange={this.onChange("blockActive")}
                                value={1}
                                color="default"
                                disabled={!(next >= 1)}
                            />
                            <br />
                            <label>Branding</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={blockActive == 2}
                                onChange={this.onChange("blockActive")}
                                value={2}
                                color="default"
                                disabled={!(next >= 2)}
                            />
                            <br />
                            <label>Info</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={blockActive == 3}
                                onChange={this.onChange("blockActive")}
                                value={3}
                                color="default"
                                disabled={!(next >= 3)}
                            />
                            <br />
                            <label>Features</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={blockActive == 4}
                                onChange={this.onChange("blockActive")}
                                value={4}
                                color="default"
                                disabled={!(next >= 4)}
                            />
                            <br />
                            <label>Preview</label>
                        </div>
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
                        <div className="uploadImg">
                            <p>Upload Your App Image</p>
                            {<ImageUploader
                                withIcon={true}
                                buttonText="Choose images"
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            /> }
                        </div>
                        <div className="chooseColor">
                            <p>Choose Your Accent</p>
                            <TextField
                                label="Choose your color"
                                margin="normal"
                                value={color}
                                onChange={this.onChange("color")}
                            />
                            <ChromePicker
                                color={color}
                            />
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
                    <Button variant="contained" color="primary" className="btn buttonNext" disabled={isModalsValid(appName, blockActive)} onClick={this.nextBlock.bind(this)}>{valueBtn}</Button>
                </div>
            </div>
        )
    }
}

export default ModalCreateApp