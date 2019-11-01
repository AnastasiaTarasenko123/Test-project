import React from 'react'
import './ModalCategory.scss'
import { Button, TextField } from '@material-ui/core'
import { withFirebase } from '../../firebase/FirebaseContext'
import { ICategory } from '../../interfaces/interfaces'
import Firebase from '../../firebase/Firebase'
import { createItem } from '../../services/itemFirebase'

interface IProps {
    appID: string,
    firebase: Firebase,
    modalChange: () => void
}

interface IState extends ICategory {

}

class ModalStops extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appID: this.props.appID,
            categoryName: '',
            description: ''
        }
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
    }

    addCategory = (event: React.FormEvent<HTMLFormElement>) => {
        const { appID, categoryName, description } = this.state;
        createItem('categories', this.props.firebase, { appID, categoryName, description });
        this.props.modalChange();
        event.preventDefault();
    }

    render() {
        const { categoryName, description } = this.state;
        return (
            <div className="modal-window-category">
                <div className="modal-block-category">
                    <div className="category">
                        <h2>Category</h2>
                        <form onSubmit={event => this.addCategory(event)}>
                            <TextField
                                margin="normal"
                                onChange={this.onChange('categoryName')}
                                type="text"
                                className="input-field"
                                value={categoryName}
                                label="Category Name"
                            />
                            <br />
                            <TextField
                                label="Stop Description"
                                multiline
                                rows="8"
                                value={description}
                                onChange={this.onChange('description')}
                                margin="normal"
                                className="input-field"
                                variant="outlined"
                            />
                            <br />
                            <Button variant="contained" color="primary" className="btn-add-category" type="submit">ADD</Button>
                        </form>
                    </div>
                    <Button className="btn btn-close" onClick={this.props.modalChange}>X</Button>
                </div>
            </div>
        );
    }
}

export default withFirebase(ModalStops)