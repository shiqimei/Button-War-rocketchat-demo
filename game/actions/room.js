import * as types from './actionsTypes';

export function init(rid) {
	return {
		type: types.ROOM.INIT,
		rid
	};
}