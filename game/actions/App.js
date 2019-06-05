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

export function startGame() {
	return {
		type: types.APP.START_GAME
	};
}

export function countDownComplete() {
	return {
		type: types.APP.COUNT_DOWN_COMPLETE
	};
}