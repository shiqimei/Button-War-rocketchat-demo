import React from 'react';
import PropTypes from 'prop-types';

class AllowButton extends React.Component {
	static propTypes = {
		onClick: PropTypes.func
	}

	render() {
		const { onClick } = this.props;

		return (
			<button style={style} onClick={onClick}>
				Allow
			</button>
		);
	}
}

const style = {
	color: 'white',
	background: '#07BF5F',
	outline: 'none',
	border: '.5px #eff solid',
	padding: '8px 30px',
	borderRadius: 3,
	cursor: 'pointer',
	fontWeight: 600
};

export default AllowButton;