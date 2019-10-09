import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SignUpLink from '../SignUp/SignUpLink'
import './SignIn.css'
import Firebase from '../Firebase/Firebase'
import * as ROUTES from '../../constants/routs';
import { withFirebase } from '../Firebase/FirebaseContext'

const SignInPage: React.FC = (): React.ReactElement => (
    <div className="sign-in-page">
        <SignInForm />
        <br />
        <SignUpLink />
    </div>
)

interface IState {
    email: string,
    password: string,
    error: Error | null
}

interface IProps { 
    firebase: Firebase | null,
    history: any
}

class SignInFormBase extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = this.value;
    }
    value: IState = {
        email: "",
        password: "",
        error: null
    }
    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (this.props.firebase !== null) {
            this.props.firebase.doSignInWithEmailAndPassword(this.state.email, this.state.password)
                .then(authUser => {
                    this.setState({ ... this.value });
                    this.props.history.push(ROUTES.EDITOR);
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
    render() {
        const isInvalid = this.state.email === '' || this.state.password === '';
        return (
            <form className="test-form" noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    className="email-sign-in"
                    onChange={this.onChange('email')}
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    className="password-sign-up"
                    onChange={this.onChange('password')}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <br />
                <Button variant="contained" className='button-sign-in' type="submit" disabled={isInvalid}>
                    Login
                </Button>
                {this.state.error && <p>{this.state.error.message}</p>}
            </form>
        );
    }
}

const SignInForm = compose<IProps, {}>(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;