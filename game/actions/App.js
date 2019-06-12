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

export function startGameRequest() {
	return {
		type: types.APP.START_GAME_REQUEST
	};
}

export function startGame() {
	return {
		type: types.APP.START_GAME
	};
}

export function countDownRequest() {
	return {
		type: types.APP.COUNT_DOWN_REQUEST
	};
}

export function countDown() {
	return {
		type: types.APP.COUNT_DOWN
	};
}