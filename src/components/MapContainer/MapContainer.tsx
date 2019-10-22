import React from 'react'
import { Map, GoogleApiWrapper, MapProps } from 'google-maps-react'
import API_KEY from '../../constants/apiKey'
import './MapContainer.scss'

interface IProps extends MapProps { }

export class MapContainer extends React.Component<IProps> {
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

