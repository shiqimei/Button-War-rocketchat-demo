const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const defaultTypes = [REQUEST, SUCCESS, FAILURE];

function createRequestTypes(base, types = defaultTypes) {
	const res = {};
	types.forEach(type => (res[type] = `${ base }_${ type }`));
	return res;
}

export const APP = createRequestTypes('APP', [
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
]);

export const ROOM = createRequestTypes('ROOM', [
	...defaultTypes,
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
]);