function createActionTypes(base, types) {
	const res = {};
	types.forEach(type => (res[type] = `${ base }_${ type }`));
	return res;
}

const APP = [
	'STATE_UPDATED'
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
	'PLAYER_LEAVED_ROOM'
];


module.exports = {
	APP: createActionTypes('APP', APP),
	ROOM: createActionTypes('ROOM', ROOM)
};
