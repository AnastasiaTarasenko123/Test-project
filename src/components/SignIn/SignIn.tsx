import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './SignIn.css'

class SignIn extends React.Component {
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
                <Button variant="contained" className='button-c'>
                    Login
                </Button>
            </form>
        );
    }
}

export default SignIn;