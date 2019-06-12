import * as types from '../actions/actionsTypes';
import { config  } from 'koji-tools';
import gameStatus from '../constants/gameStatus';

const { settings } = config;
const initialState = {
	user: null,
	settings: settings,
	current: 'loading',
	prev: 'loading',
	loading: false,
	authorized: false
};

export default function App(state = initialState, action) {
	switch (action.type) {
	case types.APP.STATE_UPDATED:
		return {
			...state,
			...action.payload
		};
	case types.APP.AUTHORIZED:
		return {
			...state,
			authorized: true
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
			current: gameStatus.PLAY
		};
	case types.APP.COUNT_DOWN:
		return {
			...state,
			current: gameStatus.COUNTDOWN
		};
	default:
		return state;
	}
}