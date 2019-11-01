import React from 'react'
import './ModalCategory.scss'
import { Button } from '@material-ui/core'
import Category from '../Category/Category'

interface IProps {
    modalChange: () => void,
    appID: string
}

class ModalStops extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { appID } = this.props;
        return (
            <div className="modal-window-category">
                <div className="modal-block-category">
                        <Category appID = {appID} modalChange={this.props.modalChange}/>
                    <Button className="btn btn-close" onClick={this.props.modalChange}>X</Button>
                </div>
            </div>
        );
    }
}

export default ModalStops