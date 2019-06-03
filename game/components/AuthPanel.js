import React from 'react';
import PropTypes from 'prop-types';

import AllowButton from './Buttons/AllowButton';
import CancelButton from './Buttons/CancelButton';

import { connect } from 'react-redux';
import { config as globalConfig } from 'koji-tools';

@connect(state => ({
	show: state.authPanel.show
}))

class AuthPanel extends React.Component {
	static propTypes = {
		show: PropTypes.bool
	}

	renderPanel() {
		const { settings } = globalConfig;

		return (
			<div style={mainStyle}>
				<h3 style={h3Style} > { settings.name } <span style={pStyle}>Apply</span></h3>
				<p style={pStyle}>Obtain your Rocket.Chat username, userid and avatar.</p>
				<div className='buttonBox' style={buttonBoxStyle}>
					<CancelButton />
					<AllowButton />
				</div>
			</div>
		);
	}

	render() {
		const { show } = this.props;

		return show ? this.renderPanel() : null;
	}
}

const mainStyle = {
	position: 'absolute',
	top: '38%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	background: 'white',
	zIndex: '1000',
	padding: 10,
	boxShadow: '0 0 1px .5px rgb(150, 150, 150)',
	borderRadius: 5
};

const h3Style = {
	fontSize: 16
};

const pStyle = {
	fontSize: 14,
	marginTop: 5,
	fontWeight: 'normal'
};

const buttonBoxStyle = {
	display: 'flex',
	width: 250,
	marginTop: 20,
	justifyContent: 'space-around'
};

export default AuthPanel;