import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import NavEditor from '../NavEditor/NavEditor'
import './Editor.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as ROUTES from '../../constants/routs'
import AppInfo from '../AppInfo/AppInfo'
import Lists from '../Lists/Lists'
import Features from '../Features/Features'

interface IProps { }
interface IState { }

class Editor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        return (
            <div className="mainPage">
                <Router>
                        <div className="editorNav">
                            <div>
                                <NavEditor />
                            </div>
                        </div>
                        <div className="contentEditor">
                            <Route path={ROUTES.APP_INFO} component={AppInfo} />
                            <Route exact path={ROUTES.LISTS} component={Lists} />
                            <Route path={ROUTES.FEATURES} component={Features} />
                        </div>
                </Router>
            </div>
        );
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Editor)
