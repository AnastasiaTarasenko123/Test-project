import { IStateSignUp } from '../components/SignUp/SignUp'
import { IStateSignIn } from '../components/SignIn/SignIn'

// plus email validation
export const isDataValidSignUp = (data: IStateSignUp): boolean => {
    if (data.password === data.confPassword &&
        data.password !== "" &&
        data.password.length >= 8 &&
        data.firstName !== "" &&
        data.lastName !== "")
        return false;
    else
        return true;
}

export const isDataValidSignIn = (data: IStateSignIn): boolean => (
    data.email === "" || data.password === ""
)

