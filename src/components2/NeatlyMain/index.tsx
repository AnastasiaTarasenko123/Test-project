import React from 'react'

import './style.scss'

class NeatlyMain extends React.Component {
	render() {
		return (
			<div className="neatly-main">
				<div className="neatly-content">
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default NeatlyMain