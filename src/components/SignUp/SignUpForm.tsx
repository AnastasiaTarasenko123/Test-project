import React from 'react'
import { withRouter } from 'react-router-dom'
import './SignUp.scss'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withFirebase } from '../../firebase/FirebaseContext'
import Firebase from '../../firebase/Firebase'
import * as ROUTES from '../../constants/routs'
import { compose } from 'recompose'
import { isDataValidSignUp } from '../../services/isDataValid'
import { registration } from '../../services/auth'


export interface IStateSignUp {
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

class SignUpFormBase extends React.Component<IProps, IStateSignUp> {
    value: IStateSignUp = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confPassword: '',
        error: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = this.value;
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const { firebase, history } = this.props
        const { firstName, email, password } = this.state
        if (firebase !== null) {
            registration(firebase, firstName, email, password, authUser => {
                this.setState({ ...this.value });
                history.push(ROUTES.DASHBOARD);
            }, (error: any) => {
                this.setState({ error });
            });
        }
        event.preventDefault();
    }

    onChange = (key: keyof IStateSignUp) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    render() {
        const { firstName, lastName, email, password, confPassword } = this.state;
        return (
            <div className="sign-up-form">
                <h1 className="sign-up-title">Sign Up</h1>
                <p className="sign-up-description">Account Information</p>
                <form autoComplete="off" onSubmit={this.onSubmit}>
                    <TextField
                        label="First Name"
                        value={firstName}
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange('firstName')}
                        className="sign-up-input"
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange('lastName')}
                        className="sign-up-input"
                    />
                    <br />
                    <TextField
                        label="Email"
                        value={email}
                        type="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange('email')}
                        className="sign-up-input"
                    />
                    <br />
                    <TextField
                        label="Password"
                        value={password}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange('password')}
                        className="sign-up-input"
                    />
                    <TextField
                        label="Confirm Password"
                        value={confPassword}
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.onChange('confPassword')}
                        className="sign-up-input"
                    />
                    <br />
                    <br />
                    <Button variant="contained" className="button-sign-up" color="primary" type="submit" disabled={isDataValidSignUp(this.state)}>
                        Submit
                </Button>
                </form>
            </div>
        );
    }
}

export const SignUpForm = compose<IProps, {}>(withRouter, withFirebase)(SignUpFormBase)