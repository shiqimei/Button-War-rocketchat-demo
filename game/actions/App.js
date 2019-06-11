import * as types from './actionsTypes';

export function stateUpdated(App) {
	return {
		type: types.APP.STATE_UPDATED,
		payload: App
	};
}

export function authorized(user) {
	return {
		type: types.APP.AUTHORIZED,
		user
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