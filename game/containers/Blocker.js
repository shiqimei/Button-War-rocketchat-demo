import React from 'react';
import styled from 'styled-components';

class Blocker extends React.PureComponent {
	render() {
		return (
			<BlockerContainer>
				<p style={stylep}>Invalid Room!</p>
			</BlockerContainer>
		);
	}
}

const stylep = {
	color: 'white',
	fontSize: 28,
	fontWeight: 900
};

const BlockerContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, .9);
	z-index: 99999;
	display: flex;
	padding-top: 100px;
	justify-content: center;
`;

export default Blocker;