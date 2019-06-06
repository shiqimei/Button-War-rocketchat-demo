function createActionTypes(base, types) {
	const res = {};
	types.forEach(type => (res[type] = `${ base }_${ type }`));
	return res;
}

const APP = [
	'STATE_UPDATED',
	'PLAYER1_JOIN_REQUEST',
	'PLAYER2_JOIN_REQUEST',
	'PLAYER1_JOINED',
	'PLAYER2_JOINED',
	'PLAYER1_SCORE_REQUEST',
	'PLAYER2_SCORE_REQUEST',
	'SCORE_UPDATED'
];

module.exports = createActionTypes('APP', APP);