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

	render() {
		const { settings } = this.props;

		return (
			<StyledCenter>
				<Banner>{ settings.name }</Banner>
				<StartButton settings={settings} />
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
	color: white;
    padding: 0.5em;
    border-radius: 100px;
    text-align: center;
    transition: opacity 1s;
`;

export default CenterContainer;