import * as types from './actionsTypes';

export function player1Joined(info) {
	return {
		type: types.APP.PLAYER1_JOINED,
		payload: info
	};
}

export function player2Joined(info) {
	return {
		type: types.APP.PLAYER2_JOINED,
		payload: info
	};
}