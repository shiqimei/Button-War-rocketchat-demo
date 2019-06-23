import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import InfoBox from '../containers/InfoBox';
import CenterContainer from '../containers/CenterContainer';
import Blocker from '../containers/Blocker';

import position from '../constants/position';
import GameStatus from '../constants/gameStatus';

@connect(state => ({
	player1: state.room.player1,
	player2: state.room.player2,
	rid: state.room.rid,
	current: state.App.current
}))

class App extends React.Component {
	static propTypes = {
		player1: PropTypes.object,
		player2: PropTypes.object,
		rid: PropTypes.string,
		current: PropTypes.string
	}

	renderCenterContainer() {
		return (
			<CenterContainer />
		);
	}

	renderBlocker() {
		return (
			<Blocker/>
		);
	}

	render() {
		const { player1, player2, rid, current } = this.props;
		return (
			<React.Fragment>
				{ current === GameStatus.READY ? this.renderCenterContainer() : null }
				<InfoBox position={position.BOTTOMLEFT} player={player1} />
				<InfoBox position={position.BOTTOMRIGHT} player={player2} />
				{ rid ? null : this.renderBlocker() }
			</React.Fragment>	
		);
	}
}

export default App;