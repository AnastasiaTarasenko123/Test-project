import React from 'react'
import { withRouter } from 'react-router-dom';

import './SignUp.css'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase/FirebaseContext'
import Firebase from '../Firebase/Firebase';
import * as ROUTES from '../../constants/routs';
import { compose } from 'recompose'

interface IState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confPassword: string,
    error: Error | null
}

interface IProps {
    firebase: Firebase,
    history: any
}

const SignUpPage: React.FC<IProps> = ({ firebase }): React.ReactElement => (
    <div className="sign-up-page">
        <h1>Sign Up</h1>
        <p>Account Information</p>
        <SignUpForm />
    </div>
)

class SignUpFormBase extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = this.value;
    }

    value: IState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: "",
        error: null
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (this.props.firebase !== null) {
            this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(authUser => {
                    return this.props.firebase
                        .user(authUser.user!.uid)
                        .set({firstName: this.state.firstName,
                            email: this.state.email});
                })
                .then(authUser => {
                    this.setState({ ... this.value });
                    this.props.history.push(ROUTES.DASHBOARD);
                })
                .catch(error => {
                    this.setState({ error });
                });
        }
        event.preventDefault();
    }

    onChange = (key: keyof IState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    // + валідація форми

    isInvalid = (): boolean => {
        if (this.state.password === this.state.confPassword &&
            this.state.password !== "" &&
            this.state.password.length >= 8 &&
            this.state.firstName !== "" &&
            this.state.lastName !== "")
            return false;
        else
            return true;
    }

    render() {
        return (
            <form className="test-form" noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <TextField
                    id="outlined-name"
                    label="First Name"
                    className='input-sign-up'
                    value={this.state.firstName}
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('firstName')}
                />
                <TextField
                    id="outlined-name"
                    label="Last Name"
                    className='input-sign-up'
                    value={this.state.lastName}
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('lastName')}
                />
                <br />
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    className="input-sign-up"
                    value={this.state.email}
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
                    value={this.state.password}
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
                    value={this.state.confPassword}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange('confPassword')}
                />
                <br />
                <br />
                <Button variant="contained" className='button-sign-up' type="submit" disabled={this.isInvalid()}>
                    Submit
                </Button>
            </form>
        );
    }
}

const SignUpForm = compose<IProps, {}>(withRouter, withFirebase)(SignUpFormBase);

export default SignUpPage;