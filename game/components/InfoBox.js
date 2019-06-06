import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Position from '../constants/position';

class InfoBox extends React.Component {
	static propTypes = {
		player: PropTypes.object,
		position: PropTypes.string.isRequired
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

	renderStyle = () => {
		const { position } = this.props;
		if (position === Position.BOTTOMRIGHT) {
			return {
				...mainStyle,
				right: 25
			};
		} else {
			return {
				...mainStyle,
				left: 25
			};
		}
	}

	render() {
		const { player } = this.props;
		const className = classNames({
			'wbBounceIn': Boolean(player)
		});

		return player ? (
			<div style={this.renderStyle()} className={className}>
				{ this.renderAvatar(player) }
				<p style={pStyle}>{player.username}</p>
			</div>
		) : null;
	}
}

const mainStyle = {
	position: 'absolute',
	bottom: 40
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