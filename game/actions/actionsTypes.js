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
	'PLAYER1_JOINED',
	'PLAYER2_JOINED',
	'READY',
	'START_GAME',
	'COUNT_DOWN_COMPLETE'
]);

export const AUTHPANEL = createRequestTypes('AUTHPANEL', [
	...defaultTypes,
	'SHOW_PANEL',
	'HIDE_PANEL'
]);