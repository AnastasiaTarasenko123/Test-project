import React from 'react'
import './ModalStops.scss'
import { Button } from '@material-ui/core'
import StopItem from '../StopItem/StopItem'
import { IReadCategory, ReadApplication } from '../../interfaces/interfaces'

interface IProps {
    modalChange: () => void,
    application: ReadApplication | null,
    categories: IReadCategory[]
}

class ModalStops extends React.Component<IProps> {

    render() {
        const { application, categories } = this.props;
        return (
            <div className="modal-window">
                <div className="modal-block">
                    <div className="content-stop">
                        <StopItem uid='' modalChange={this.props.modalChange} application={application} categories={categories} />
                    </div>
                    <Button className="btn btn-close" onClick={this.props.modalChange}>X</Button>
                </div>
            </div>
        );
    }
}

export default ModalStops