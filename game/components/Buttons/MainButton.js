import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as AppActions from '../../actions/App';
import * as RoomActions from '../../actions/room';

import RocketChat from '../../lib/rocketchat-koji';
import { APP_NAME } from '../../constants/settings';

@connect(state => ({
	authorized: state.App.authorized
}), dispatch => ({
	countDownRequest: () => dispatch(AppActions.countDownRequest()),
	invitingOthersRequest: () => dispatch(RoomActions.invitingOthersRequest())
}))

class MainButton extends React.Component {
	static propTypes = {
		settings: PropTypes.object.isRequired,
		countDownRequest: PropTypes.func,
		invitingOthersRequest: PropTypes.func,
		authorized: PropTypes.bool,
		text: PropTypes.string
	}

	async _onStartGameClick() {
		const {
			countDownRequest, authorized, text
		} = this.props;

		if (!authorized) {
			RocketChat.getUserInfo(APP_NAME);
		} else {
			if (text === 'Start Game') {
				countDownRequest();
			}
			if (text === 'Inviting Others to Join') {
				invitingOthersRequest();
			}
		}
	}

	render() {
		const { settings, text } = this.props;
		const { startText } = settings;

		return (
			<Button onClick={() => this._onStartGameClick()}>
				{ text ? text : startText }
			</Button>
		);
	}
}

const Button = styled.div`
    flex: auto;
    margin: 0 auto;
    padding: 1.2vh 2em;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	font-size: 18px;
	font-weight: 700;
    box-shadow: 0 0 5px 0 rgb(120, 120, 120);
    color: #191919;
    background-color: white!important;
    font-size: 18px;
    border-radius: 100px;
    margin: 10px auto;
    text-align: center;
    cursor: pointer;
    animation: button 2s ease-in-out infinite;
    transition: opacity 1s, background-color 0.5s;
`;

export default MainButton;