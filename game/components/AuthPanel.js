import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

@connect(state => ({
	show: state.authPanel.show
}))

class AuthPanel extends React.Component {
	static propTypes = {
		show: PropTypes.bool
	}

	renderPanel() {
		return (
			<div style={style}>
				<h3></h3>
				<p>This is a panel!</p>
			</div>
		);
	}

	render() {
		const { show } = this.props;

		return show ? this.renderPanel() : null;
	}
}

const style = {
	position: 'absolute',
	top: '35%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	background: 'white',
	zIndex: '1000',
	padding: 10,
	boxShadow: '0 0 5px 1px rgb(120, 120, 120)',
	borderRadius: 5
};

export default AuthPanel;