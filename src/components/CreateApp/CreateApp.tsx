import React from 'react'
import "./CreateApp.scss"

interface IProps {
    modalChange: () => void
}

class CreateApp extends React.Component<IProps> {
    render() {
        return(
            <div className="modalWindow">
                <div className="modalBlock">
                    <div className="appName">
                        <h3>Welcome! Let us help you get started!</h3>
                        <button onClick={this.props.modalChange}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateApp