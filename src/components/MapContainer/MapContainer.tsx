import React from 'react'
import { Map, GoogleApiWrapper, MapProps, Marker, MarkerProps, InfoWindow } from 'google-maps-react'
import { API_KEY } from '../../constants/config'
import './MapContainer.scss'

interface IProps extends MapProps {
}

interface IState {
        selectedPlace: google.maps.LatLng,
        activeMarker: Marker
        //showingInfoWindthis.state = {ow: true
}

export class MapContainer extends React.Component<IProps, IState> {
    tempLng = new google.maps.LatLng({lat: 37.778519, lng: -122.405640});
    constructor(props: IProps) {
        super(props);
        this.state = {
            selectedPlace: this.tempLng,
            activeMarker: new Marker({
                position: this.tempLng
            })
           // showingInfoWindow: activeMarker
        }
    }

    onMarkerClick = (props: any, marker: any, e: any) => {
        this.setState({
          //  selectedPlace: props,
          //  activeMarker: null,
           // showingInfoWindow: true
        });
    }

    mapClicked = (mapProps: any, map: any, clickEvent: any) => {
        console.log(clickEvent.latLng);
        this.setState({
            selectedPlace: clickEvent.latLng,
            activeMarker: new Marker ({position: clickEvent.latLng})
        });
    }

    render() {
        const { selectedPlace } = this.state;
        console.log(selectedPlace);
        return (
            <div className="mapGoogle">
                <Map google={this.props.google}
                    onClick={this.mapClicked}>
                    <Marker onClick={this.onMarkerClick} 
                    position={selectedPlace}></Marker>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)

