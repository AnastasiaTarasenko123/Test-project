import React from 'react'
import { withAuthorization } from '../Session/WithAuthorization'
import './Editor.scss'

class Editor extends React.Component {
    render() {
        return (
            <div className="mainPage">
                <div className="editorNav"><p>Navigator</p></div>
                <div className="contentEditor"><p>Main Page</p></div>
            </div>
        );
    }
}

const condition = (authUser: any) => !!authUser;
export default withAuthorization(condition)(Editor)
