import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StartButton from './Buttons/StartButton';
import EllipsisLoading from './Loading/EllipsisLoading';

import gameStatus from '../constants/gameStatus';

@connect(state => ({
	settings: state.App.settings,
	prev: state.App.prev,
	current: state.App.current,
	authorized: state.App.authorized,
	loading: state.App.loading,
	player1: state.App.player1
}))

class CenterContainer extends React.Component {
	static propTypes = {
		settings: PropTypes.object,
		prev: PropTypes.string,
		current: PropTypes.string,
		authorized: PropTypes.bool,
		player1: PropTypes.object,
		loading: PropTypes.bool
	}

	renderNotice() {
		return (
			<Notice>Waiting for player 2 to join...</Notice>
		);
	}

	renderLoading() {
		return (
			<Container>
				<EllipsisLoading />
			</Container>
		);
	}

	renderStartButton(settings) {
		return (
			<StartButton settings={settings} />
		);
	}

	renderInstructions(instructions) {
		let newText = instructions.split('\n').map((item, i) => {
			return <p key={i}>{item}</p>;
		});

		return (
			<Instructions>
				{ newText }
			</Instructions>
		);
	}

	render() {
		const {
			settings, current, authorized, player1, loading
		} = this.props;

		return current === gameStatus.COUNTDOWN ? null : (
			<StyledCenter>
				<Banner>{ settings.name }</Banner>
				{ !authorized ? this.renderStartButton(settings) : null }
				{ loading ? this.renderLoading() : null }
				{ player1 ? this.renderNotice() : null }
				{ this.renderInstructions(settings.instructions) }
			</StyledCenter>
		);
	}
}

const StyledCenter = styled.div`
	position: relative;
	width: inherit;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding-top: 25vh;
	padding-bottom: 25vh;
	font-size: calc((5vh + 5vw) / 2);
	z-index: 999;
`;

const Container = styled.div`
	text-align: center;
`;

const Notice = styled.p`
	font-family: 'Righteous';
	color: white;
	font-size: 16px;
	text-align: center;
`;

const Banner = styled.div`
    flex: auto;
	font-family: 'Righteous';
	font-size: calc((5vh + 5vw) / 2);
	font-weight: 700;
	color: white;
    padding: 0.5em;
    border-radius: 100px;
    text-align: center;
    transition: opacity 1s;
`;

const Instructions = styled.div`
	flex: auto;
	color: white;
	font-family: 'Righteous';
	margin-top: 10px;
    padding: 1em;
	font-size: 0.5em;
	font-weight: 100;
    border-radius: 100px;
    text-align: center;
	transition: opacity 1s;
	&>p {
		font-size: 20px;
	}
`;

export default CenterContainer;