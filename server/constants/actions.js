function createActionTypes(base, types) {
	const res = {};
	types.forEach(type => (res[type] = `${ base }_${ type }`));
	return res;
}

const APP = [
	'STATE_UPDATED',
	'AUTHORIZED',
	'PLAYER1_SCORE_REQUEST',
	'PLAYER2_SCORE_REQUEST',
	'SCORE_UPDATED',
	'READY',
	'START_GAME_REQUEST',
	'START_GAME',
	'COUNT_DOWN_REQUEST',
	'COUNT_DOWN'
];

const ROOM = [
	'INIT',
	'INIT_SUCCESS',
	'INIT_FAILED',
	'CREATE_ROOM_REQUEST',
	'CREATE_ROOM_SUCCESS',
	'CREATE_ROOM_FAILED',
	'JOIN_ROOM_REQUEST',
	'JOIN_ROOM_SUCCESS',
	'JOIN_ROOM_FAILED',
	'PLAYER1_LEAVED_ROOM',
	'PLAYER2_LEAVED_ROOM',
	'PLAYER1_TAP_REQUEST',
	'PLAYER2_TAP_REQUEST',
	'PLAYER1_TAP_SUCCESS',
	'PLAYER2_TAP_SUCCESS'
];


module.exports = {
	APP: createActionTypes('APP', APP),
	ROOM: createActionTypes('ROOM', ROOM)
};
