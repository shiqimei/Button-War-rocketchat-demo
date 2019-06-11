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
			user: action.user
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