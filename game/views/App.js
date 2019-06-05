import React from 'react';
import PropTypes from 'prop-types';

import AuthPanel from '../components/AuthPanel';
import InfoBox from '../components/InfoBox';

import { connect } from 'react-redux';

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
				<InfoBox player={player1} />
			</React.Fragment>	
		);
	}
}

export default App;