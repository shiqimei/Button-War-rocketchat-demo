import * as types from '../actions/actionsTypes';
import { config  } from 'koji-tools';
import gameStatus from '../constants/gameStatus';

const { settings } = config;
const initialState = {
	authorized: false,
	membersCount: 0,
	player: null,
	player1: null,
	player2: null,
	player1Score: 0,
	player2Score: 0,
	settings: settings,
	current: 'loading',
	prev: 'loading'
};

export default function App(state = initialState, action) {
	switch (action.type) {
	case types.APP.AUTHORIZED:
		return {
			...state,
			player: action.payload,
			authorized: true
		};
	case types.APP.PLAYER1_JOINED:
		return {
			...state,
			player1: action.payload,
			membersCount: 1
		};
	case types.APP.PLAYER2_JOINED:
		return {
			...state,
			player2: action.payload,
			membersCount: 2
		};
	case types.APP.SCORE_UPDATED:
		return {
			...state,
			player1Score: action.payload.player1Score,
			player2Score: action.payload.player2Score
		};
	case types.APP.READY:
		return {
			...state,
			prev: state.current,
			current: gameStatus.READY
		};
	case types.APP.START_GAME:
		return {
			...state,
			prev: state.current,
			current: gameStatus.COUNTDOWN
		};
	case types.APP.COUNT_DOWN_COMPLETE:
		return {
			...state,
			prev: state.current,
			current: gameStatus.PLAY
		};
	default:
		return state;
	}
}