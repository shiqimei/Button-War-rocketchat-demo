import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class StartButton extends React.Component {
	static propTypes = {
		settings: PropTypes.object.isRequired
	}

	render() {
		const { settings } = this.props;
		const { startText } = settings;

		return (
			<Button>{ startText }</Button>
		);
	}
}

const Button = styled.div`
	position: absolute;
	top: 50%;
  	left: 50%;
  	transform: translate(-50%, -100%);
	padding: 1.2vh 2em;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	box-shadow: 0 0 5px 0 rgb(120, 120, 120);
	color: #191919;
	background-color: white;
	font-size: 18px;
	font-weight: 700;
	border-radius: 100px;
	text-align: center;
	cursor: pointer;
	animation: button 2s ease-in-out infinite;
	transition: opacity 1s, background-color 0.5s;
	
	:hover {
		color: red;
	}
`;

export default StartButton;