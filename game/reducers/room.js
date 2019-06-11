import * as types from '../actions/actionsTypes';

const initialState = {
	rid: null,
	owner: null,
	player1: null,
	player2: null
};

export default function room(state = initialState, action) {
	switch (action.type) {
	case types.ROOM.INIT:
		return {
			...state,
			rid: action.rid
		};
	default:
		return state;
	}
}