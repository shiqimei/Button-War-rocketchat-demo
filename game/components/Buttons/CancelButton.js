import React from 'react';

class CancelButton extends React.PureComponent {
	render() {
		return (
			<button style={style}>Cancel</button>
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