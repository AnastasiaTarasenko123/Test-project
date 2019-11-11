import React from 'react'
import "./ModalCreateApp.scss"
import { Button, TextField, Radio, Switch, Table, TableCell, TableRow, TableBody } from '@material-ui/core'
import { isModalsValid } from '../../services/isDataValid'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import { AuthUserContext } from '../Session/SessionContext'
import { Application } from '../../interfaces/interfaces'
import { createItem } from '../../services/itemFirebase'
import Picture from '../input-components/Picture/Picture'
import InputMap from '../input-components/InputMap/InputMap'

interface IProps {
    modalChange: () => void,
    firebase: Firebase
}

interface IState extends Application {
    location: string,
    blockActive: number,
    activeNum: number
}

const updateState: IState = {
    userID: '',
    appName: '',
    picture: '',
    color: '#000000',
    description: '',
    location: '',
    selectedPlace: { lat: 0, lng: 0 },
    isCategories: false,
    isGPS: false,
    blockActive: 0,
    activeNum: 0
}

class ModalCreateApp extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { ...updateState };
    }

    whichBlockActive = () => (Number(this.state.blockActive));

    onCreateApp = (event: React.FormEvent<HTMLFormElement>, authUser: any) => {
        const { appName, picture, color, description, selectedPlace, isCategories, isGPS } = this.state
        const userID = authUser.uid;
        createItem('applications', this.props.firebase, { userID, appName, picture, color, description, selectedPlace, isCategories, isGPS });
        this.setState({ ...updateState });
        this.props.modalChange();
        event.preventDefault();
    }

    nextBlock = () => {
        let temp: number = Number(this.state.blockActive) + 1;
        let active: number = Number(this.state.activeNum) + 1;
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

    onChangeFile = (picture: string) => {
        this.setState({ picture: picture });
    }

    render() {
        const { appName, picture, color, description, location, selectedPlace, isCategories, isGPS, blockActive, activeNum } = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div className="modal-window-create-app">
                        <div className="modal-block-create-app">
                            <div className="navigation-modal">
                                <div className="radio-btn">
                                    <Radio
                                        checked={this.whichBlockActive() === 0}
                                        onChange={this.onChange('blockActive')}
                                        value={0}
                                        color="default"
                                        disabled={!(activeNum >= 0)}
                                    />
                                    <br />
                                    <label>Welcome</label>
                                </div>
                                <div className="radio-btn">
                                    <Radio
                                        checked={this.whichBlockActive() === 1}
                                        onChange={this.onChange('blockActive')}
                                        value={1}
                                        color="default"
                                        disabled={!(activeNum >= 1)}
                                    />
                                    <br />
                                    <label>Branding</label>
                                </div>
                                <div className="radio-btn">
                                    <Radio
                                        checked={this.whichBlockActive() === 2}
                                        onChange={this.onChange('blockActive')}
                                        value={2}
                                        color="default"
                                        disabled={!(activeNum >= 2)}
                                    />
                                    <br />
                                    <label>Info</label>
                                </div>
                                <div className="radio-btn">
                                    <Radio
                                        checked={this.whichBlockActive() === 3}
                                        onChange={this.onChange('blockActive')}
                                        value={3}
                                        color="default"
                                        disabled={!(activeNum >= 3)}
                                    />
                                    <br />
                                    <label>Features</label>
                                </div>
                                <div className="radio-btn">
                                    <Radio
                                        checked={this.whichBlockActive() === 4}
                                        onChange={this.onChange('blockActive')}
                                        value={4}
                                        color="default"
                                        disabled={!(activeNum >= 4)}
                                    />
                                    <br />
                                    <label>Preview</label>
                                </div>
                            </div>
                            <form onSubmit={event => this.onCreateApp(event, authUser)}>
                                <div className={`blocks ${(this.whichBlockActive() === 0) ? `active` : ``}`}>
                                    <div className="welcome">
                                        <p>Welcome! Let us help you get started!</p>
                                        <TextField
                                            label="Your App Name"
                                            onChange={this.onChange('appName')}
                                            type="text"
                                            margin="normal"
                                        />
                                        <p>Remember, you can always change your options in our App Configuration screens.</p>
                                    </div>
                                </div>
                                <div className={`blocks ${(this.whichBlockActive() === 1) ? `active` : ``}`}>
                                    <div className="block-flex">
                                        <div className="upload-img in-block-flex">
                                            <p>Upload Your App Image</p>
                                            <Picture picture={picture} onChangeFile={this.onChangeFile} />
                                        </div>
                                        <div className="choose-color in-block-flex">
                                            <p>Choose Your Accent</p>
                                            <TextField
                                                label="Choose your color"
                                                className="input-create-app"
                                                margin="normal"
                                                value={color}
                                                onChange={this.onChange('color')}
                                                type="color"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={`blocks ${(this.whichBlockActive() === 2) ? `active` : ``}`}>
                                    <div className="block-flex">
                                        <div className="description in-block-flex">
                                            <p>Add Your Description</p>
                                            <TextField
                                                label="Add a description of your app"
                                                multiline
                                                rows="18"
                                                value={description}
                                                onChange={this.onChange('description')}
                                                margin="normal"
                                                className="input-create-app"
                                            />
                                        </div>
                                        <div className="location in-block-flex">
                                            <p>Enter Your App Location</p>
                                            <InputMap
                                                selectedPlace={selectedPlace}
                                                onChangePlace={(selectedPlace) => { this.setState({ selectedPlace }) }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={`blocks ${(this.whichBlockActive() === 3) ? `active` : ``}`}>
                                    <p>Turn on the feature you want to include in your app.</p>
                                    <div className="block-flex">
                                        <div className="categories in-block-flex block-features">
                                            <h1 className="features-title">Categories</h1>
                                            <p className="features-description">Include more than one list of categories</p>
                                            <Switch
                                                checked={isCategories}
                                                onChange={this.onChangeSwitch('isCategories')}
                                                value={!isCategories}
                                                color="primary"
                                            />
                                        </div>
                                        <div className="GPS in-block-flex block-features">
                                            <h1 className="features-title">GPS Map</h1>
                                            <p className="features-description">Include a GPS map</p>
                                            <Switch
                                                checked={isGPS}
                                                onChange={this.onChangeSwitch('isGPS')}
                                                value={!isGPS}
                                                color="primary"
                                                className="gpsSwitch"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={`blocks preview ${(this.whichBlockActive() === 4) ? `active` : ``}`}>
                                    <h1 className="app-name">{appName}</h1>
                                    <div className={`img-block ${(picture !== '') ? `img-active` : ``}`}>
                                        <img src={picture} alt="app" className="img-preview" />
                                    </div>
                                    <div className="table-preview" >
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
                                                    <TableCell>{this.state.isCategories === true ? 'Gategories' : ''} {isGPS === true ? 'GPS' : ''}
                                                        {this.state.isCategories === false && isGPS === false ? 'none' : ''} </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                                <Button color="primary" className="btn button-close" onClick={this.props.modalChange}>X</Button>
                                <Button variant="contained" color="primary" className={`button-next ${(blockActive < 4) ? `active` : ``}`}
                                    disabled={isModalsValid(appName)} onClick={this.nextBlock.bind(this)}>Next</Button>
                                <Button variant="contained" color="primary" className={`button-next ${(Number(blockActive) === 4) ? `active` : ``}`}
                                    type="submit">Finish</Button>
                            </form>
                        </div>
                    </div>
                )
                }
            </AuthUserContext.Consumer>
        )
    }
}

export default withFirebase(ModalCreateApp)