import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StartButton from './Buttons/StartButton';

@connect(state => ({
	settings: state.App.settings
}))

class CenterContainer extends React.Component {
	static propTypes = {
		settings: PropTypes.object
	}

	renderInstructions(instructions) {
		let newText = instructions.split('\n').map((item, i) => {
			return <p key={i}>{item}</p>;
		});

		return (
			<Instructions>
				{ newText }
			</Instructions>
		);
	}

	render() {
		const { settings } = this.props;

		return (
			<StyledCenter>
				<Banner>{ settings.name }</Banner>
				<StartButton settings={settings} />
				{ this.renderInstructions(settings.instructions) }
			</StyledCenter>
		);
	}
}

const StyledCenter = styled.div`
	position: relative;
	width: inherit;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	padding-top: 25vh;
	padding-bottom: 25vh;
	font-size: calc((5vh + 5vw) / 2);
`;

const Banner = styled.div`
    flex: auto;
	font-family: 'Righteous';
	font-size: calc((5vh + 5vw) / 2);
	font-weight: 700;
	color: white;
    padding: 0.5em;
    border-radius: 100px;
    text-align: center;
    transition: opacity 1s;
`;

const Instructions = styled.div`
	flex: auto;
	color: white;
	font-family: 'Righteous';
	font-size: calc((5vh + 5vw) / 2);
    padding: 1em;
	font-size: 0.5em;
	font-weight: 100;
    border-radius: 100px;
    text-align: center;
    transition: opacity 1s;
`;

export default CenterContainer;