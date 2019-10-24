import React from 'react'
import { Map, GoogleApiWrapper, MapProps, Marker, MarkerProps, InfoWindow } from 'google-maps-react'
import { API_KEY } from '../../constants/config'
import './MapContainer.scss'

interface IProps extends MapProps {
}

interface IState {
}

export class MapContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    onMarkerClick = (props: any, marker: any, e: any) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    render() {
        return (
            <div className="mapGoogle">
                {/* onClick={this.onMapClicked} */}
                <Map google={this.props.google}>
                    <Marker onClick={this.onMarkerClick}></Marker> 
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)

