import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';

class InfoBox extends React.Component {
	static propTypes = {
		player: PropTypes.object
	}

	componentDidUpdate() {
		const { player } = this.props;
		console.log(player);
	}

	renderAvatar(player) {
		return (
			<img style={imgStyle} src={player.avatarUrl} />
		);
	}

	render() {
		const { player } = this.props;
		const className = classNames({
			'wbBounceIn': Boolean(player)
		});

		return player ? (
			<div style={mainStyle} className={className}>
				{ this.renderAvatar(player) }
				<p style={pStyle}>{player.username}</p>
			</div>
		) : null;
	}
}

const mainStyle = {
	position: 'absolute',
	bottom: 40,
	left: 25
};

const imgStyle = {
	height: 60,
	width: 60,
	borderRadius: '50%'
};

const pStyle = {
	color: 'white',
	textAlign: 'center',
	fontSize: 20,
	fontWeight: 600,
	fontFamily: 'Righteous'
};

export default InfoBox;