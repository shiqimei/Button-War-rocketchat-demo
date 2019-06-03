import React from 'react';
import PropTypes from 'prop-types';

import AllowButton from './Buttons/AllowButton';
import CancelButton from './Buttons/CancelButton';

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
			<div style={mainStyle}>
				<h3><span style={pStyle}>Apply</span></h3>
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
	top: '35%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	background: 'white',
	zIndex: '1000',
	padding: 15,
	boxShadow: '0 0 5px 1px rgb(120, 120, 120)',
	borderRadius: 5
};

const pStyle = {
	fontSize: 14,
	marginTop: 5,
	fontWeight: 'normal'
};

const buttonBoxStyle = {
	display: 'flex',
	width: 230,
	marginTop: 20,
	justifyContent: 'space-around'
};

export default AuthPanel;