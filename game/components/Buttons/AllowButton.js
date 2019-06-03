import React from 'react';
import PropsTypes from 'prop-types';

class AllowButton extends React.Component {
	static propTypes = {
		height: PropsTypes.number,
		width: PropsTypes.number
	}

	render() {
		return (
			<button style={style}>
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
	cursor: 'pointer'
};

export default AllowButton;