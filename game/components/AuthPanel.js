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
			<div>
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

export default AuthPanel;