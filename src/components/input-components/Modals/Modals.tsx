import React from 'react'
import Category from '../../Category/Category'
import { Button } from '@material-ui/core'
import './Modals.scss'
import { ReadApplication, IReadCategory } from '../../../interfaces/interfaces'
import StopItem from '../../StopItem/StopItem'


interface ICategoryProps {
    appID: string,
    modalChange: () => void
}

interface IStopProps {
    modalChange: () => void,
    application: ReadApplication | null,
    categories: IReadCategory[]
}

export const ModalStops: React.FC<IStopProps> = (props) => (
    <div className="modal-window">
        <div className="modal-block modal-block-stop">
            <div className="content">
                <StopItem uid='' modalChange={props.modalChange} application={props.application} categories={props.categories} />
            </div>
            <Button className="btn-close" onClick={props.modalChange}>X</Button>
        </div>
    </div>
)

export const ModalCategory: React.FC<ICategoryProps> = (props) => (
    <div className="modal-window">
        <div className="modal-block modal-block-category">
            <div className="content">
                <Category uid='' appID={props.appID} modalChange={props.modalChange} />
            </div>
            <Button className="btn-close" onClick={props.modalChange}>X</Button>
        </div>
    </div>
)