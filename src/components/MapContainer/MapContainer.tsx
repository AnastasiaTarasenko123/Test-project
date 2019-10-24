import React from 'react'
import { Map, GoogleApiWrapper, MapProps, Marker, MarkerProps } from 'google-maps-react'
import { API_KEY } from '../../constants/config'
import './MapContainer.scss'

interface IProps extends MapProps { }

interface IState {}

export class MapContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <div className="mapGoogle">
                <Map google={this.props.google}>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)

