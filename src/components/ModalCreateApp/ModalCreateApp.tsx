import React from 'react'
import "./ModalCreateApp.scss"
import { Button, TextField, Radio, Switch, Table, TableCell, TableRow, TableBody } from '@material-ui/core'
import { isModalsValid } from '../../services/isDataValid'
import MapContainer from '../MapContainer/MapContainer'

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
    activeNum: number,
    valueBtn: string
}

class ModalCreateApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appName: "",
            picture: "",
            color: "#000000",
            description: "",
            location: "home",
            isCategories: false,
            isGPS: false,
            blockActive: 0,
            activeNum: 0,
            valueBtn: "Next" || "Finish"
        }
    }

    whichBlockActive = () => (Number(this.state.blockActive));

    finishSend = () => {
        this.props.modalChange();
    }

    nextBlock = () => {
        if (this.state.blockActive === 4)
            this.finishSend();
        else {
            var temp: number = Number(this.state.blockActive) + 1;
            var active: number = Number(this.state.activeNum) + 1;
            this.setState({
                blockActive: temp,
                activeNum: active
            });
            this.checkBtn(temp);
        }
    }

    checkBtn = (temp: number) => {
        const { valueBtn } = this.state;
        if (valueBtn.toString() === "Next" && temp > 3)
            this.setState({ valueBtn: "Finish" });
        else if (valueBtn.toString() === "Finish" && temp < 4)
            this.setState({ valueBtn: "Next" });
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
        if (key === "blockActive") {
            this.checkBtn(Number(value));
        }
    }

    onChangeSwitch = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState(prev => ({
            ...prev, [key]: !this.state[key]
        }))
    }

    onChangeFile = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files &&
            this.readFileASync(e.target.files[0]).then(v => {
                this.setState(prev => ({
                    ...prev, [key]: v
                }))
            })
    }

    readFileASync = (file: File) => (
        new Promise((resolve: (v: string) => void, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
        })
    )

    render() {
        const { appName, picture, color, description, location, isCategories, isGPS, blockActive, valueBtn, activeNum } = this.state;
        return (
            <div className="modalWindow">
                <div className="modalBlock">
                    <div className="navigationModal">
                        <div className="radioBtn">
                            <Radio
                                checked={this.whichBlockActive() === 0}
                                onChange={this.onChange("blockActive")}
                                value={0}
                                color="default"
                                disabled={!(activeNum >= 0)}
                            />
                            <br />
                            <label>Welcome</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={this.whichBlockActive() === 1}
                                onChange={this.onChange("blockActive")}
                                value={1}
                                color="default"
                                disabled={!(activeNum >= 1)}
                            />
                            <br />
                            <label>Branding</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={this.whichBlockActive() === 2}
                                onChange={this.onChange("blockActive")}
                                value={2}
                                color="default"
                                disabled={!(activeNum >= 2)}
                            />
                            <br />
                            <label>Info</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={this.whichBlockActive() === 3}
                                onChange={this.onChange("blockActive")}
                                value={3}
                                color="default"
                                disabled={!(activeNum >= 3)}
                            />
                            <br />
                            <label>Features</label>
                        </div>
                        <div className="radioBtn">
                            <Radio
                                checked={this.whichBlockActive() === 4}
                                onChange={this.onChange("blockActive")}
                                value={4}
                                color="default"
                                disabled={!(activeNum >= 4)}
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
                                onChange={this.onChangeFile("picture")}
                                type="file"
                            />
                            <div className={`imgBlock ${(picture !== "") ? `imgActive` : ``}`}>
                                <img src={picture} alt="app" className="imgModal" />
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
                            <MapContainer />
                        </div>
                    </div>
                    <div className={`blocks features ${(this.whichBlockActive() === 3) ? `active` : ``}`}>
                        <p>Turn on the feature you want to include in your app.</p>
                        <div className="categories divLeft">
                            <h1>Categories</h1>
                            <p>Include more than one list of categories</p>
                            <Switch
                                checked={isCategories}
                                onChange={this.onChangeSwitch("isCategories")}
                                value={!isCategories}
                                color="primary"
                            />
                        </div>
                        <div className="GPS divRight">
                            <h1>GPS Map</h1>
                            <p>Include a GPS map</p>
                            <Switch
                                checked={isGPS}
                                onChange={this.onChangeSwitch("isGPS")}
                                value={!isGPS}
                                color="primary"
                                className="gpsSwitch"
                            />
                        </div>
                    </div>
                    <div className={`blocks preview ${(this.whichBlockActive() === 4) ? `active` : ``}`}>
                        <h1>{appName}</h1>
                        <div className={`imgBlock ${(picture !== "") ? `imgActive` : ``}`}>
                            <img src={picture} alt="app" className="imgPreview" />
                        </div>
                        <div className="tablePreview" >
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Color: </TableCell>
                                        <TableCell>{color}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Description: </TableCell>
                                        <TableCell>{description}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Location: </TableCell>
                                        <TableCell>{location}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Features: </TableCell>
                                        <TableCell>{this.state.isCategories === true ? "Gategories" : ""} {this.state.isGPS === true ? "GPS" : ""}
                                            {this.state.isCategories === false && this.state.isGPS === false ? "none" : ""} </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <Button color="primary" className="btn buttonClose" onClick={this.props.modalChange}>X</Button>
                    <Button variant="contained" color="primary" className="btn buttonNext" disabled={isModalsValid(appName, blockActive)} onClick={this.nextBlock.bind(this)}>{valueBtn}</Button>
                </div>
            </div>
        )
    }
}

export default ModalCreateApp