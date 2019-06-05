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
	'AUTHORIZED',
	'PLAYER1_JOIN_REQUEST',
	'PLAYER2_JOIN_REQUEST',
	'PLAYER1_JOIED',
	'PLAYER2_JOINED',
	'PLAYER1_SCORE_REQUEST',
	'PLAYER2_SCORE_REQUEST',
	'SCORE_UPDATED',
	'READY',
	'START_GAME',
	'COUNT_DOWN_COMPLETE'
]);

export const AUTHPANEL = createRequestTypes('AUTHPANEL', [
	...defaultTypes,
	'SHOW_PANEL',
	'HIDE_PANEL'
]);