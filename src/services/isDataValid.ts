import { IStateSignUp } from '../components/SignUp/SignUpForm'
import { IStateSignIn } from '../components/SignIn/SignInForm'

const checkEmail = (check: string): boolean => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(check);
}

export const isDataValidSignUp = (data: IStateSignUp): boolean => (
    data.password !== data.confPassword ||
    data.password === "" ||
    data.password.length < 8 ||
    data.firstName === "" ||
    data.lastName === "" ||
    !checkEmail(data.email)
)

export const isDataValidSignIn = (data: IStateSignIn): boolean => (
    data.email === '' ||
    data.password === '' ||
    data.password.length < 8 ||
    !checkEmail(data.email)
)

export const isModalsValid = (data: any): boolean => (
    data === ''
)
