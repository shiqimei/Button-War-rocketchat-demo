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
    flex: auto;
    margin: 0 auto;
    padding: 1.2vh 2em;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	font-size: 18px;
	font-weight: 700;
    box-shadow: 0 0 5px 0 rgb(120, 120, 120);
    color: #191919;
    background-color: white!important;
    font-size: 18px;
    border-radius: 100px;
    margin: 10px auto;
    text-align: center;
    cursor: pointer;
    animation: button 2s ease-in-out infinite;
    transition: opacity 1s, background-color 0.5s;
`;

export default StartButton;