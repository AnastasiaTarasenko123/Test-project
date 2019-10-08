import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SignUpLink from '../SignUp/SignUpLink'
import './SignIn.css'

const SignInPage: React.FC = ():React.ReactElement =>(
         <div className="sign-in-page">
            <SignInForm/>
            <br/>
            <SignUpLink/>
        </div>
)

class SignInForm extends React.Component {
    render() {
        return (
            <form className="test-form" noValidate autoComplete="off">
                <TextField
                    id="outlined-email-input"
                    label="Email"
                    className="email-c"
                    type="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <TextField
                    id="outlined-password-input"
                    label="Password"
                    className="password-c"
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <br />
                <Button variant="contained" className='button-sign-in'>
                    Login
                </Button>
            </form>
        );
    }
}

export default SignInPage;