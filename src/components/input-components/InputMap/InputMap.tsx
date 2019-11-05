import React from 'react'
import { TextField } from '@material-ui/core'
import { LatLng } from '../../../interfaces/interfaces'
import MapContainer from '../../MapContainer/MapContainer'
import { codeAddress, codePlace } from '../../../services/geocode'
import './InputMap.scss'

interface IProps {
    selectedPlace: LatLng,
    onChangePlace: (selectedPlace: LatLng) => void
}

interface IState {
    location: string,
    lat: number,
    lng: number
}

class InputMap extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            location: "",
            lat: this.props.selectedPlace.lat,
            lng: this.props.selectedPlace.lng
        }
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
        const { lat, lng } = this.state;
        this.props.onChangePlace({ lat: lat, lng: lng });
        this.onMapClicked({ lat: lat, lng: lng });
    }

    onMapClicked = async (place: LatLng) => {
        this.setState({
            lat: place.lat,
            lng: place.lng
        });
        const result = await codePlace(place)
        if (!('message' in result)) {
            this.setState({
                location: result
            });
        } else {
            console.log(result.message);
        }
        const { lat, lng } = this.state;
        this.props.onChangePlace({ lat: lat, lng: lng });
    }

    onChangeLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState({
            location: value
        })
        const result = await codeAddress(value)
        if (!('message' in result)) {
            this.setState({
                lat: result.lat,
                lng: result.lng
            });
        }
        else {
            console.log(result.message);
        }
    }

    render() {
        const { lat, lng, location } = this.state;
        return (
            <div className="input-map">
                <div className="in-content">
                    <div className="location">
                        <TextField
                            onChange={this.onChangeLocation}
                            margin="normal"
                            variant="outlined"
                            value={location}
                            className="field-content"
                            placeholder="App Address"
                        />
                    </div>
                    <div className="lat-lng">
                        <TextField
                            onChange={this.onChange('lat')}
                            type="number"
                            margin="normal"
                            variant="outlined"
                            value={lat}
                            className="field-content"
                            placeholder="Lat Address"
                        />
                        <br />
                        <TextField
                            onChange={this.onChange('lng')}
                            type="number"
                            margin="normal"
                            variant="outlined"
                            className="field-content"
                            value={lng}
                            placeholder="Lng Address"
                        />
                    </div>
                </div>
                <div className="in-content">
                    <div className="content-map">
                        <MapContainer onMapClicked={this.onMapClicked} selectedPlace={{ lat, lng }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InputMap