import { IStateSignUp } from '../components/SignUp/SignUpForm'
import { IStateSignIn } from '../components/SignIn/SignInForm'

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

export const isModalsValid = (data: any, count: number): boolean => {
    var result: boolean;
    switch(count){
        case 0: result = data === ""; break;
        default: 
            result = false;
    }
    return result;
}
