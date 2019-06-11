import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import AuthPanel from '../containers/AuthPanel';
import InfoBox from '../containers/InfoBox';
import CenterContainer from '../containers/CenterContainer';

import position from '../constants/position';

@connect(state => ({
	player1: state.App.player1,
	player2: state.App.player2
}))

class App extends React.Component {
	static propTypes = {
		player1: PropTypes.object,
		player2: PropTypes.object
	}

	render() {
		const { player1, player2 } = this.props;

		return (
			<React.Fragment>
				<AuthPanel />
				<CenterContainer />
				<InfoBox position={position.BOTTOMLEFT} player={player1} />
				<InfoBox position={position.BOTTOMRIGHT} player={player2} />
			</React.Fragment>	
		);
	}
}

export default App;