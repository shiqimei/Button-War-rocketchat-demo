import React from 'react';
import PropTypes from 'prop-types';

class CancelButton extends React.Component {
	static propTypes = {
		onClick: PropTypes.func
	}

	render() {
		const { onClick } = this.props;

		return (
			<button style={style} onClick={onClick}>Cancel</button>
		);
	}
}

const style = {
	color: 'black',
	background: '#EDEBEE',
	outline: 'none',
	border: '.5px #eff solid',
	padding: '8px 30px',
	borderRadius: 3,
	cursor: 'pointer',
	fontWeight: 600
};

export default CancelButton;