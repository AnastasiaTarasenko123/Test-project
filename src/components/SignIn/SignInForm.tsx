import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './SignIn.scss'
import Firebase from '../../firebase/Firebase'
import * as ROUTES from '../../constants/routs';
import { withFirebase } from '../../firebase/FirebaseContext'
import { isDataValidSignIn } from '../../services/isDataValid'
import { login } from '../../services/login'
import { thisExpression } from '@babel/types'

export interface IStateSignIn {
    email: string,
    password: string,
    error: Error | null
}

interface IProps {
    firebase: Firebase | null,
    history: any
}

class SignInFormBase extends React.Component<IProps, IStateSignIn> {
    value: IStateSignIn = {
        email: "",
        password: "",
        error: null
    };

    constructor(props: IProps) {
        super(props);
        this.state = this.value;
    }

    //in service
    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const { firebase, history } = this.props;
        const { email, password } = this.state;
        if (firebase) {
            login(firebase, email, password, authUser => {this.setState({...this.value}); history.push(ROUTES.DASHBOARD);}, (error) => this.setState({error}))
        }
        // if (firebase !== null) {
        //     firebase.doSignInWithEmailAndPassword(email, password)
        //         .then(authUser => {
        //             this.setState({ ... this.value });
        //             history.push(ROUTES.DASHBOARD);
        //         })
        //         .catch(error => {
        //             this.setState({ error });
        //         });
        // }
        event.preventDefault();
    }

    onChange = (key: keyof IStateSignIn) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        this.setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    render() {
    const { error } = this.state;
        return (
            <form className="test-form" noValidate autoComplete="off" onSubmit={this.onSubmit}>
                <TextField
                    label="Email"
                    onChange={this.onChange("email")}
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <TextField
                    label="Password"
                    onChange={this.onChange("password")}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <br />
                <Button variant="contained" type="submit" disabled={isDataValidSignIn(this.state)}>
                    Login
                </Button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export const SignInForm = compose<IProps, {}>(withRouter, withFirebase)(SignInFormBase)
