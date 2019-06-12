import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import AuthPanel from '../containers/AuthPanel';
import InfoBox from '../containers/InfoBox';
import CenterContainer from '../containers/CenterContainer';
import Blocker from '../containers/Blocker';

import position from '../constants/position';

@connect(state => ({
	player1: state.room.player1,
	player2: state.room.player2,
	rid: state.room.rid
}))

class App extends React.Component {
	static propTypes = {
		player1: PropTypes.object,
		player2: PropTypes.object,
		rid: PropTypes.string
	}

	renderBlocker() {
		return (
			<Blocker/>
		);
	}

	render() {
		const { player1, player2, rid } = this.props;
		console.log(player2)
		return (
			<React.Fragment>
				<AuthPanel />
				<CenterContainer />
				<InfoBox position={position.BOTTOMLEFT} player={player1} />
				<InfoBox position={position.BOTTOMRIGHT} player={player2} />
				{ rid ? null : this.renderBlocker() }
			</React.Fragment>	
		);
	}
}

export default App;