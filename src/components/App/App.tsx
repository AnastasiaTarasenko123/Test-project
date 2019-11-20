import React from 'react'
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom'
//import Navigation from '../Navigation/Navigation'
import { SignUpPage } from '../SignUp/SignUpPage'
import SignInPage from '../SignIn/SignInPage'
import Dashboard from '../Dashboard/Dashboard'
import * as ROUTES from '../../constants/routs'
import { withFirebase } from '../../firebase/FirebaseContext'
import { withAuthentication } from '../Session/WithAuthentication'
import AppInfo from '../AppInfo/AppInfo'
import Lists from '../Lists/Lists'
import Features from '../Features/Features'
import Editor from '../Editor/Editor'
import { RouteParams } from '../../interfaces/interfaces'
import NeatlyMain from '../../components2/NeatlyMain'
import SignUp2 from '../../components2/SignUp2'
import SignIn2 from '../../components2/SignIn2'
import ForgotPassword2 from '../../components2/ForgotPassword2'
import ResetPassword2 from '../../components2/ResetPassword2'
import Congratulations from '../../components2/Congratulations'
import ConfirmEmail from '../../components2/ConfirmEmail'
import SignInCompany from '../../components2/SignInCompany'
import MainPage2 from '../../components2/MainPage2'

interface IProps extends RouteComponentProps<RouteParams> { }

const App: React.FC<IProps> = (props: IProps) => (
  <Router>
    {/* <Navigation /> */}
    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
    <Route path={ROUTES.DASHBOARD} component={Dashboard} />
    <Route path={ROUTES.NEATLY_REGISTRATION_PAGE} component={NeatlyMain} />
    <Route path={ROUTES.NEATLY_SIGN_UP} component={SignUp2} />
    <Route path={ROUTES.NEATLY_SIGN_IN} component={SignIn2} />
    <Route path={ROUTES.NEATLY_FORGOT_PASSWORD} component={ForgotPassword2} />
    <Route path={ROUTES.NEATLY_RESET_PASSWORD} component={ResetPassword2} />
    <Route path={ROUTES.NEATLY_CONFIRM_EMAIL} component={ConfirmEmail} />
    <Route path={ROUTES.NEATLY_CONGRATULATIONS} component={Congratulations} />
    <Route path={ROUTES.NEATLY_SIGN_IN_COMPANY} component={SignInCompany} />
    <Route path={ROUTES.NEATLY_MAIN_PAGE} component={MainPage2} />
    <Route path={`${ROUTES.EDITOR}/:appId`} component={Editor} />
    <Route path={`${ROUTES.EDITOR}/:appId${ROUTES.APP_INFO}`} component={AppInfo} />
    <Route path={`${ROUTES.EDITOR}/:appId${ROUTES.LISTS}`} component={Lists} />
    <Route path={`${ROUTES.EDITOR}/:appId${ROUTES.FEATURES}`} component={Features} />
  </Router>
);

export default withAuthentication(withFirebase(App))