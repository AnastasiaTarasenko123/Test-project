import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import NavEditor from '../NavEditor/NavEditor'
import './Editor.scss'
import { RouteComponentProps } from 'react-router-dom'

interface RouteParams {
    appId: string
}

interface IProps extends RouteComponentProps<RouteParams> {
}

interface IState {
    appId: string
}

class Editor extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            appId: this.props.match.params.appId || ''
        }
    }

    render() {
        const { appId } = this.state;
        return (
            <div className="editorNav">
                <NavEditor appId={appId} />
            </div>
        );
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Editor)

