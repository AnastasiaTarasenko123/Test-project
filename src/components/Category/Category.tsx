import React from 'react'
import { IReadCategory } from '../../interfaces/interfaces'
import { TextField } from '@material-ui/core'
import { readItem, update } from '../../services/itemFirebase'
import Firebase from '../../firebase/Firebase'
import { withFirebase } from '../../firebase/FirebaseContext'

interface IProps {
    firebase: Firebase,
    uid: string
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
        readItem(this.props.firebase, uid, 'categories', (value: IReadCategory) => { this.setState({ ...value }) },
            () => { });
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevProps.uid !== this.props.uid) {
            const { uid } = this.props;
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
        update('category', this.props.firebase, uid, key, value);
    }

    render() {
        const { categoryName, description } = this.state;
        return (
            <div>
                <TextField
                    margin="normal"
                    type="text"
                    className="input-field"
                    value={categoryName}
                    label="Category Name"
                    onChange={this.onChange('categoryName')}
                />
                <br />
                <TextField
                    label="Stop Description"
                    multiline
                    rows="4"
                    value={description}
                    margin="normal"
                    className="input-field"
                    variant="outlined"
                    onChange={this.onChange('description')}
                />
            </div>
        )
    }
}

export default withFirebase(Category)