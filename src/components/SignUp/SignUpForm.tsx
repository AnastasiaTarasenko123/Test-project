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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: "",
        error: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = this.value;
    }

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (this.props.firebase !== null) {
            this.props.firebase.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(authUser => {
                    return this.props.firebase
                        .user(authUser.user!.uid)
                        .set({
                            firstName: this.state.firstName,
                            email: this.state.email
                        });
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

    onChange = (key: keyof IStateSignUp) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    render() {
        return (
            <form className="test-form" noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <TextField
                    label="First Name"
                    value={this.state.firstName}
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange("firstName")}
                />
                <TextField
                    label="Last Name"
                    value={this.state.lastName}
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange("lastName")}
                />
                <br />
                <TextField
                    label="Email"
                    value={this.state.email}
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange("email")}
                />
                <br />
                <TextField
                    label="Password"
                    value={this.state.password}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange("password")}
                />
                <TextField
                    label="Confirm Password"
                    value={this.state.confPassword}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onChange("confPassword")}
                />
                <br />
                <br />
                <Button variant="contained" className="button-sign-up" type="submit" disabled={isDataValidSignUp(this.state)}>
                    Submit
                </Button>
            </form>
        );
    }
}

export const SignUpForm = compose<IProps, {}>(withRouter, withFirebase)(SignUpFormBase)