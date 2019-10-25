import React from 'react'
import { Map, GoogleApiWrapper, MapProps, Marker } from 'google-maps-react'
import { API_KEY } from '../../constants/config'
import './MapContainer.scss'

export interface LatLng {
    lat: number
    lng: number
}

interface IProps extends MapProps {
    selectedPlace: LatLng,
    onMapClicked: (selectedPlace:LatLng) => void,
}

interface IState {
       // selectedPlace: google.maps.LatLng,
       activeMarker: Marker
        //showingInfoWindthis.state = {ow: true
}

export class MapContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            activeMarker: new Marker({position: {lat: this.props.selectedPlace.lat, 
            lng: this.props.selectedPlace.lng}})
        };
    }

    onMarkerClick = (props: any, marker: any, e: any) => {
        this.setState({
          //  selectedPlace: props,
          //  activeMarker: null,
           // showingInfoWindow: true
        });
    }

    mapClicked = (mapProps: any, map: any, clickEvent: any) => {
        // console.log(clickEvent.latLng);
        // this.setState({
        //     selectedPlace: clickEvent.latLng,
        //     activeMarker: new Marker ({position: clickEvent.latLng})
        // });
        const {lat, lng} = clickEvent.latLng
        this.props.onMapClicked({lat: lat(), lng: lng()});
        this.setState({activeMarker: new Marker({position: {lat, lng}})});
    }

    render() {
        const { selectedPlace } = this.props;
        console.log(selectedPlace);
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

