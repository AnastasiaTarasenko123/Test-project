import React from 'react'
import { TextField } from '@material-ui/core'
import { LatLng, IAddress } from '../../../interfaces/interfaces'
import MapContainer from '../../MapContainer/MapContainer'
import { codeAddress, codePlace } from '../../../services/geocode'
import './InputMap.scss'

interface IProps {
    selectedPlace: LatLng,
    onChangePlace?: (selectedPlace: LatLng) => void
    displayLatLng?: boolean
}

interface IState {
    currentAddress: IAddress
    suggestions: IAddress[]
}

const emptyAddress: IAddress = {
    location: '',
    pos: {
        lat: 0,
        lng: 0
    }
}

class InputMap extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            currentAddress: { ...emptyAddress },
            suggestions: []
        }
    }

    onMapClicked = async (pos: LatLng) => {
        const result = await codePlace(pos)
        const { onChangePlace } = this.props
        if ((typeof result) === 'string') {
            onChangePlace && onChangePlace(pos)
            this.setState({
                currentAddress: { pos, location: result },
            })
        } else {
            console.error(result.message);
        }
    }

    onChangeLocation = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, 
            currentAddress: {
                ...prev.currentAddress, 
                location: value
            }
        }))
        const result = await codeAddress(value)
        if (Array.isArray(result)) {
            this.setState({ suggestions: result })
        }
        else {
            this.setState({ suggestions: [] })
            console.log(result.message);
        }
    }

    render() {
        const { displayLatLng, selectedPlace } = this.props
        const { currentAddress, suggestions } = this.state
        return (
            <div className={`${displayLatLng ? `input-map` : `input-map-block`}`}>
                <div className={`${displayLatLng ? `in-content` : `content`}`}>
                    <div className="location">
                        <TextField
                            onChange={this.onChangeLocation}
                            margin="normal"
                            variant="outlined"
                            value={currentAddress.location}
                            className="field-content"
                            placeholder="App Address"
                        />
                        {suggestions.length > 0 && 
                            <div className="suggestions">
                                {suggestions.map(s => (
                                    <div className="suggestion">
                                        <p>{s.location}</p>
                                    </div>
                                ))}
                            </div>}
                    </div>
                    {displayLatLng &&
                        <div className="lat-lng">
                            <TextField
                                type="number"
                                margin="normal"
                                variant="outlined"
                                value={currentAddress.pos.lat}
                                className="field-content"
                                placeholder="Lat Address"
                            />
                            <br />
                            <TextField
                                type="number"
                                margin="normal"
                                variant="outlined"
                                className="field-content"
                                value={currentAddress.pos.lng}
                                placeholder="Lng Address"
                            />
                        </div>
                    }
                </div>
                <div className={`${displayLatLng ? `in-content` : `content`}`}>
                    <div className="content-map">
                        <MapContainer onMapClicked={this.onMapClicked} selectedPlace={{ ...selectedPlace }} />
                    </div>
                </div>
            </div>
        );
    }
}

export default InputMap