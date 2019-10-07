import React from 'react'
import './SignUp.css'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//import Firebase from '../Firebase/firebase';

interface IProps { }
interface IState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confPassword: string
}

class SignUpForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        var value: IState = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confPassword: ""
        };
        this.state = value;
    }

    // onSubmit = (event:Event) => {
    //     //const { username, email, passwordOne } = this.state;
    //     this.props.firebase
    //         .doCreateUserWithEmailAndPassword(email, passwordOne)
    //           .then(authUser => {
    //             this.setState({ ...INITIAL_STATE });
    //           })
    //           .catch(error => {
    //             this.setState({ error });
    //           });
    //         event.preventDefault();
    // }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    render() {
        return (
            <form className="test-form" noValidate autoComplete="off">
                <TextField
                    id="outlined-name"
                    label="First Name"
                    className='input-sign-up'
                    // value={value.username}
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('firstName')}
                />
                <TextField
                    id="outlined-name"
                    label="Last Name"
                    className='input-sign-up'
                    // value={value.username}
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('lastName')}
                />
                <br />
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    className="input-sign-up"
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('email')}
                />
                <br />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    className="input-sign-up"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('password')}
                />
                <TextField
                    id="outlined-password-input"
                    label="Confirm Password"
                    className="input-sign-up"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('confPassword')}
                />
                <br />
                <br />
                <Button variant="contained" className='button-c'>
                    Submit
                </Button>
            </form>
        );
    }
}

export default SignUpForm;