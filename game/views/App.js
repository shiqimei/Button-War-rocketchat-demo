import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import AuthPanel from '../components/AuthPanel';
import InfoBox from '../components/InfoBox';
import CenterContainer from '../components/CenterContainer';

@connect(state => ({
	player: state.App.player
}))

class App extends React.Component {
	static propTypes = {
		player: PropTypes.object
	}

	render() {
		const { player } = this.props;

		return (
			<React.Fragment>
				<AuthPanel />
				<CenterContainer />
				<InfoBox player={player} />
			</React.Fragment>	
		);
	}
}

export default App;