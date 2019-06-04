import * as types from '../actions/actionsTypes';

const initialState = {
	authorized: false,
	membersCount: 0,
	player1: {},
	player2: {}
};

export default function App(state = initialState, action) {
	switch (action.type) {
	case types.APP.PLAYER1_JOINED:
		return {
			...state,
			player1: action.payload,
			membersCount: 1
		};
	case types.APP.PLAYE2_JOINED:
		return {
			...state,
			player2: action.payload,
			membersCount: 2
		};
	default:
		return state;
	}
}