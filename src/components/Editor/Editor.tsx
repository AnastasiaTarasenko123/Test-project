import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import NavEditor from '../NavEditor/NavEditor'
import './Editor.scss'
import { BrowserRouter as Router, Route, RouteComponentProps } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import AppInfo from '../AppInfo/AppInfo'
import Lists from '../Lists/Lists'
import Features from '../Features/Features'

interface RouteParams {
    uid: string
}

interface IProps extends RouteComponentProps<RouteParams> {
}

interface IState {
    uid: string
}

class Editor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            uid: this.props.match.params.uid
        }
    }

    render() {
        const { uid } = this.state;
        return (
            <div className="mainPage">
                <Router>
                    <div className="editorNav">
                        <div>
                            <NavEditor uid={uid} />
                        </div>
                    </div>
                    <div className="contentEditor">
                        <Route path={ROUTES.APP_INFO + '/:uid'} component={AppInfo} />
                        <Route path={ROUTES.LISTS + '/:uid'} component={Lists} />
                        <Route path={ROUTES.FEATURES + '/:uid'} component={Features} />
                    </div>
                </Router>
            </div>
        );
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Editor)
