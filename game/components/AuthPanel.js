import React from 'react';
import PropTypes from 'prop-types';

import AllowButton from './Buttons/AllowButton';
import CancelButton from './Buttons/CancelButton';
import RocketChat from '../lib/rocketchat-koji';

import { connect } from 'react-redux';
import * as authPanelActions from '../actions/authPanel';
import { config as globalConfig } from 'koji-tools';

@connect(state => ({
	show: state.authPanel.show
}), dispatch => ({
	showPanel: () => dispatch(authPanelActions.showPanel()),
	hidePanel: () => dispatch(authPanelActions.hidePanel())
}))

class AuthPanel extends React.Component {
	static propTypes = {
		show: PropTypes.bool
	}

	renderPanel(show) {
		const { hidePanel } = this.props;
		const { settings } = globalConfig;
		
		return (
			<div style={mainStyle} ref='main' className='wbBounceIn'>
				<h3 style={h3Style} > { settings.name } <span style={pStyle}>Apply</span></h3>
				<p style={pStyle}>Obtain your Rocket.Chat username, userId and avatar.</p>
				<div className='buttonBox' style={buttonBoxStyle}>
					<CancelButton onClick={() => {
						this.refs.main.className = 'wbBounceOut';
						setTimeout( () => {
							this.refs.main.className = '';
							hidePanel();
						}, 200);
					}} />
					<AllowButton onClick={() => {
						//TODO dirty bounceOut animation implement. Need to refactor later :(
						this.refs.main.className = 'wbBounceOut';
						setTimeout( () => {
							this.refs.main.className = '';
							hidePanel();
						}, 200);
						RocketChat.getUserInfo();
					}}/>
				</div>
			</div>
		);
	}

	render() {
		const { show } = this.props;

		return show ? this.renderPanel(show) : null;
	}
}

const mainStyle = {
	position: 'absolute',
	top: '25%',
	left: '15%',
	right: '15%',
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
	width: 220,
	margin: '20px auto 5px',
	justifyContent: 'space-around'
};

export default AuthPanel;