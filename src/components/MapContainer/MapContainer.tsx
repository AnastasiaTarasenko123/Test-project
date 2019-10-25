import React from 'react'
import { Map, GoogleApiWrapper, MapProps, Marker } from 'google-maps-react'
import { API_KEY } from '../../constants/config'
import './MapContainer.scss'
import { LatLng } from '../../interfaces/interfaces'

interface IProps extends MapProps {
    selectedPlace: LatLng,
    onMapClicked: (selectedPlace:LatLng) => void,
}

interface IState {
       activeMarker: Marker
}

export class MapContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            activeMarker: new Marker({position: {lat: this.props.selectedPlace.lat, 
            lng: this.props.selectedPlace.lng}})
        };
    }

    mapClicked = (mapProps: any, map: any, clickEvent: any) => {
        const {lat, lng} = clickEvent.latLng
        this.props.onMapClicked({lat: lat(), lng: lng()});
        this.setState({activeMarker: new Marker({position: {lat, lng}})});
    }

    render() {
        const { selectedPlace } = this.props;
        return (
            <div className="mapGoogle">
                <Map google={this.props.google}
                    onClick={this.mapClicked}>
                    <Marker position={selectedPlace}></Marker>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)

