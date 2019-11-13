import React from 'react'
import { IReadCategory } from '../../interfaces/interfaces'
import { TextField, Button } from '@material-ui/core'
import { readItem, update, createItem } from '../../services/itemFirebase'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'
import './Category.scss'

interface IProps {
    firebase: Firebase,
    uid: string,
    appID: string,
    modalChange: () => void
}

interface IState extends IReadCategory { }

const emptyState: IState = {
    uid: '',
    appID: '',
    categoryName: '',
    description: ''
}

class Category extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { ...emptyState }
    }

    componentDidMount() {
        const { uid } = this.props;
        if(uid !== '')
            readItem(this.props.firebase, uid, 'categories', (value: IReadCategory) => { this.setState({ ...value }) },
                () => { });
    }

    componentDidUpdate(prevProps: IProps) {
        const { uid } = this.props;
        if (uid !== '' && prevProps.uid !== this.props.uid) {
            readItem(this.props.firebase, uid, 'categories', (value: IReadCategory) => { this.setState({ ...value }) },
                () => { });
        }
    }

    componentWillUnmount() {
        this.props.firebase.db.ref().off();
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const { uid } = this.state;
        this.setState(prev => ({
            ...prev, [key]: value
        }));
        if (uid !== '') {
            update('category', this.props.firebase, uid, key, value);
        }
    }

    addCategory = (event: React.FormEvent<HTMLFormElement>) => {
        const { categoryName, description } = this.state;
        const { appID } = this.props;
        createItem('categories', this.props.firebase, { appID, categoryName, description });
        this.props.modalChange();
        this.setState({...emptyState});
        event.preventDefault();
    }

    render() {
        const { categoryName, description, uid } = this.state;
        return (
            <div className="my-category">
                <h2 className={`title-category ${uid === '' ? `` : `title-category-in-list`}`}>Category</h2>
                <form onSubmit={event => this.addCategory(event)}>
                    <TextField
                        margin="normal"
                        type="text"
                        className="input-field-category"
                        value={categoryName}
                        label="Category Name"
                        onChange={this.onChange('categoryName')}
                    />
                    <br />
                    <TextField
                        label="Stop Description"
                        multiline
                        rows="3"
                        value={description}
                        margin="normal"
                        className="input-field-category"
                        onChange={this.onChange('description')}
                    />
                    <br />

                    {uid === '' ?
                        <div className="my-category-add">
                            <Button variant="contained" color="primary" type="submit">ADD</Button>
                        </div>
                        : ''}
                </form>
            </div>
        )
    }
}

export default withFirebase(Category)