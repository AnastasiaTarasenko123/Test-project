import React from 'react'
import "./ModalCreateApp.scss"
import { Button, TextField, Radio, Switch } from '@material-ui/core'
import { isModalsValid } from '../../services/isDataValid'

interface IProps {
    modalChange: () => void
}

interface IState {
    appName: string,
    picture: string,
    color: string,
    description: string,
    location: string,
    isCategories: boolean,
    isGPS: boolean,
    blockActive: number,
    next: number,
    valueBtn: string
}

class ModalCreateApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appName: "",
            picture: "",
            color: "",
            description: "",
            location: "",
            isCategories: true,
            isGPS: true,
            blockActive: 0,
            next: 0,
            valueBtn: "Next" || "Finish"
        }
    }

    whichBlockActive = () => (Number(this.state.blockActive));

    nextBlock = () => {
        var temp: number = this.state.blockActive;
        var nextTemp: number = this.state.next;
        this.checkBtn(++temp);
        this.setState({ blockActive: temp, next: ++nextTemp });
    }

    //if it is file -> fakepath
    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, [key]: value
        }))
        if (e.target.name === "blockActive")
            this.checkBtn(Number(value));
    }

    onChangeSwitch = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(prev => ({
            ...prev, [key]: !this.state[key]
        }))
    }

    onChangePicture = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        // var uploadFile: string = "";
        // if(e.target.files != null)
        // {
        //     uploadFile = e.target.files[0].path;
        // }
        // this.setState(prev => ({
        //     ...prev, [key]: uploadFile
        // }))
    }

    checkBtn = (temp: number) => {
        if (this.state.valueBtn === "Next" && temp > 3)
            this.setState({ valueBtn: "Finish" });
        else if (this.state.valueBtn === "Finish" && temp < 4)
            this.setState({ valueBtn: "Next" });
    }

    render() {
        const { appName, picture, color, description, isCategories, isGPS, blockActive, valueBtn, next } = this.state;
        var tempImg = picture === "" ? "" : require(picture);
        return (
            <div className="modalWindow">
                <div className="modalBlock">
                    <div className="navigationModal">
                        <div className="radioBtn">
                            <Radio
                                checked={blockActive === 0}
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
                                checked={blockActive === 1}
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
                                checked={blockActive === 2}
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
                                checked={blockActive === 3}
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
                                checked={blockActive === 4}
                                onChange={this.onChange("blockActive")}
                                value={4}
                                color="default"
                                disabled={!(next >= 4)}
                            />
                            <br />
                            <label>Preview</label>
                        </div>
                    </div>
                    <div className={`blocks welcome ${(this.whichBlockActive() === 0) ? `active` : ``}`}>
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
                    <div className={`blocks branding ${(this.whichBlockActive() === 1) ? `active` : ``}`}>
                        <div className="uploadImg divLeft">
                            <p>Upload Your App Image</p>
                            <TextField
                                className="imageInput"
                                margin="normal"
                                onChange={this.onChangePicture("picture")}
                                type="file"
                            />
                            <div>
                                <img src={tempImg} alt="Picture for app" />
                            </div>
                        </div>
                        <div className="chooseColor divRight">
                            <p>Choose Your Accent</p>
                            <TextField
                                label="Choose your color"
                                className="colorInput"
                                margin="normal"
                                value={color}
                                onChange={this.onChange("color")}
                                type="color"
                            />
                        </div>
                    </div>
                    <div className={`blocks info ${(this.whichBlockActive() === 2) ? `active` : ``}`}>
                        <div className="description divLeft">
                            <p>Add Your Description</p>
                            <TextField
                                label="Add a description of your app"
                                multiline
                                rows="18"
                                value={description}
                                onChange={this.onChange("description")}
                                margin="normal"
                                variant="outlined"
                                className="inputInfo"
                            />
                        </div>
                        <div className="location divRight">
                            <p>Enter Your App Location</p>
                            <TextField
                                label="Enter Your Location"
                                onChange={this.onChange("location")}
                                margin="normal"
                                variant="outlined"
                                className="inputInfo"
                            />
                        </div>
                    </div>
                    <div className={`blocks features ${(this.whichBlockActive() === 3) ? `active` : ``}`}>
                        <p>Turn on the feature you want to include in your app.</p>
                        <div className="categories divLeft">
                            <h1>Categories</h1>
                            <p>Include more than one list of categories</p>
                            <Switch
                                checked={!isCategories}
                                onChange={this.onChangeSwitch("isCategories")}
                                value={isCategories}
                                color="primary"
                            />
                        </div>
                        <div className="GPS divRight">
                            <h1>GPS Map</h1>
                            <p>Include a GPS map</p>
                            <Switch
                                checked={!isGPS}
                                onChange={this.onChangeSwitch("isGPS")}
                                value={isGPS}
                                color="primary"
                                className="gpsSwitch"
                            />
                        </div>
                    </div>
                    <div className={`blocks preview ${(this.whichBlockActive() === 4) ? `active` : ``}`}>
                        <h1>{appName}</h1>
                        <img src={picture} alt="Picture for app" />

                    </div>
                    <Button color="primary" className="btn buttonClose" onClick={this.props.modalChange}>X</Button>
                    <Button variant="contained" color="primary" className="btn buttonNext" disabled={isModalsValid(appName, blockActive)} onClick={this.nextBlock.bind(this)}>{valueBtn}</Button>
                </div>
            </div>
        )
    }
}

export default ModalCreateApp