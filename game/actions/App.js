import * as types from './actionsTypes';

export function authorized(player) {
	return {
		type: types.APP.AUTHORIZED,
		payload: player
	};
}

export function player1JoinRequest(player1) {
	return {
		type: types.APP.PLAYER1_JOIN_REQUEST,
		payload: player1
	};
}

export function player2JoinRequest(player2) {
	return {
		type: types.APP.PLAYER2_JOIN_REQUEST,
		payload: player2
	};
}

export function player1Joined(player1) {
	return {
		type: types.APP.PLAYER1_JOINED,
		payload: player1
	};
}

export function player2Joined(player2) {
	return {
		type: types.APP.PLAYER2_JOINED,
		payload: player2
	};
}

export function player1ScoreRequest() {
	return {
		type: types.APP.PLAYER1_SCORE_REQUEST
	};
}

export function player2ScoreRequest() {
	return {
		type: types.APP.PLAYER2_SCORE_REQUEST
	};
}

export function scoreUpdated() {
	return {
		type: types.APP.SCORE_UPDATED
	};
}

export function ready() {
	return {
		type: types.APP.READY
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