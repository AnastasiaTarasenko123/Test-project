import React from 'react'
import { ReadApplication } from '../../interfaces/interfaces'
import './ModalStops.scss'
import { Button } from '@material-ui/core'
import Stop from '../Stop/Stop'

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
                    <div className="border-modal">
                        <p>Lists</p>
                    </div>
                    <div className="modal-content">
                        <div className="navigation-stops">
                            <p>Stops</p>
                        </div>
                        <div className="details">
                            <div className="category-details">
                                <p>Category</p>
                            </div>
                            <div className="stops-details">
                                <Stop appID={appID} />
                            </div>
                        </div>
                    </div>
                    <Button color="primary" className="btn btn-close" onClick={this.props.modalChange}>X</Button>
                </div>
            </div>
        );
    }
}

export default ModalStops