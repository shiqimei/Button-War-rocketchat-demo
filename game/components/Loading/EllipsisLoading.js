import React from 'react';

class EllipsisLoading extends React.PureComponent {
	render() {
		return (
			<div className='lds-ellipsis'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	}
}

export default EllipsisLoading;