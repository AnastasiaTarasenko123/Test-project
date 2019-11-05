import React from 'react'
import './ModalCategory.scss'
import { Button } from '@material-ui/core'
import Category from '../Category/Category'

interface IProps {
    appID: string,
    modalChange: () => void
}

class ModalStops extends React.Component<IProps> {
    
    render() {
        const { appID } = this.props;
        return (
            <div className="modal-window-category">
                <div className="modal-block-category">
                    <div className="content">
                        <Category uid='' appID={appID} modalChange={this.props.modalChange} />
                    </div>
                    <Button className="btn btn-close" onClick={this.props.modalChange}>X</Button>
                </div>
            </div>
        );
    }
}

export default ModalStops