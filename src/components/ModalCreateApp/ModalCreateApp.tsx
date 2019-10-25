import React from 'react'
import "./ModalCreateApp.scss"
import { Button, TextField, Radio, Switch, Table, TableCell, TableRow, TableBody } from '@material-ui/core'
import { isModalsValid } from '../../services/isDataValid'
import MapContainer from '../MapContainer/MapContainer'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import { AuthUserContext } from '../Session/SessionContext'
import { LatLng } from '../MapContainer/MapContainer'
import { API_KEY } from '../../constants/config'

interface IProps {
    modalChange: () => void,
    firebase: Firebase
}

interface IState {
    appName: string,
    picture: string,
    color: string,
    description: string,
    location: string,
    selectedPlace: LatLng,
    isCategories: boolean,
    isGPS: boolean,
    blockActive: number,
    activeNum: number,
    valueBtn: "Next" | "Finish"
}

class ModalCreateApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appName: "",
            picture: "",
            color: "#000000",
            description: "",
            location: "",
            selectedPlace: { lat: 0, lng: 0 },
            isCategories: false,
            isGPS: false,
            blockActive: 0,
            activeNum: 0,
            valueBtn: "Next"
        }
    }

    whichBlockActive = () => (Number(this.state.blockActive));

    onCreateApp = (event: React.FormEvent<HTMLFormElement>, authUser: any) => {
        this.props.modalChange();
        const { appName, picture, color, description, selectedPlace, isCategories, isGPS } = this.state
        this.props.firebase.applications().push({
            userID: authUser.uid,
            appName: appName,
            picture: picture,
            color: color,
            description: description,
            isCategories: isCategories,
            isGPS: isGPS,
        })
        this.setState({
            appName: "",
            picture: "",
            color: "#000000",
            description: "",
            location: "",
            selectedPlace: { lat: 0, lng: 0 },
            isCategories: false,
            isGPS: false,
            blockActive: 0,
            activeNum: 0,
            valueBtn: "Next"
        })
        event.preventDefault();
    }

    nextBlock = () => {
        var temp: number = Number(this.state.blockActive) + 1;
        var active: number = Number(this.state.activeNum) + 1;
        this.setState({
            blockActive: temp,
            activeNum: active
        });
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
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

    onChangeCodeAddress = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
        this.codeAddress(value);
    }

    onMapClicked = (place: LatLng) => {
        this.setState({
            selectedPlace: place
        });
        this.codePlace(place);
    }

    codeAddress = async (value: any) => {
        const { results, status } = await (await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/Geocode/json?
        key=${API_KEY}&address=${value}`)).json()
        if (status == 'OK') {
            this.setState({
                selectedPlace: {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    }

    codePlace = async (value: LatLng) => {
       const { results, status } = await (await fetch(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/Geocode/json?
       key=${API_KEY}&lat=${value.lat}&lng=${value.lng}`)).json()
        if (status === 'OK') {
            this.setState({
                location: results[0].formatted_address
            })
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
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
        const { appName, picture, color, description, location, selectedPlace, isCategories, isGPS, blockActive, activeNum } = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
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
                            <form onSubmit={event => this.onCreateApp(event, authUser)}>
                                <div className={`blocks welcome ${(this.whichBlockActive() === 0) ? `active` : ``}`}>
                                    <p>Welcome! Let us help you get started!</p>
                                    <TextField
                                        label="Your App Name"
                                        onChange={this.onChange("appName")}
                                        margin="normal"
                                        variant="outlined"
                                    />
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
                                            onChange={this.onChangeCodeAddress("location")}
                                            margin="normal"
                                            variant="outlined"
                                            className="inputInfo"
                                        />
                                        <MapContainer onMapClicked={this.onMapClicked} selectedPlace={selectedPlace} />
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
                                                {/* <TableRow>
                                                    <TableCell>Location: </TableCell>
                                                    <TableCell>{location}</TableCell>
                                                </TableRow> */}
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
                                <Button variant="contained" color="primary" className={`buttonNext ${(blockActive < 4) ? `active` : ``}`}
                                    disabled={isModalsValid(appName)} onClick={this.nextBlock.bind(this)}>Next</Button>
                                <Button variant="contained" color="primary" className={`buttonNext ${(Number(blockActive) === 4) ? `active` : ``}`}
                                    type="submit">Finish</Button>
                            </form>
                        </div>
                    </div>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

export default withFirebase(ModalCreateApp)