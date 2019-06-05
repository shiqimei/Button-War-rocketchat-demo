import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import InfoBox from '../components/InfoBox';
import CenterContainer from '../components/CenterContainer';

@connect(state => ({
	player1: state.App.player1
}))

class App extends React.Component {
	static propTypes = {
		player1: PropTypes.object
	}

	render() {
		const { player1 } = this.props;

		return (
			<React.Fragment>
				<AuthPanel />
				<CenterContainer />
				<InfoBox player={player1} />
			</React.Fragment>	
		);
	}
}

export default App;