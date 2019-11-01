import React from 'react'
import './ModalStops.scss'
import { Button } from '@material-ui/core'
import Stop from '../Stop/Stop'
import InputMap from '../input-components/InputMap/InputMap';
import { IStop } from '../../interfaces/interfaces';

interface IProps {
    modalChange: () => void,
    appID: string
}

interface IState {

}

class ModalStops extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { appID } = this.props;
        return (
            <div className="modal-window">
                <div className="modal-block">
                    <div className="modal-content">
                        <div className="category-details">
                            <p>Category</p>
                        </div>
                        <div className="stops-details">
                            <Stop appID={appID} modalChange={this.props.modalChange} />
                        </div>
                    </div>
                    <Button className="btn btn-close" onClick={this.props.modalChange}>X</Button>
                </div>
            </div>
        );
    }
}

export default ModalStops