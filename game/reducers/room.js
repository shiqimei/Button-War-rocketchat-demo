import * as types from '../actions/actionsTypes';

const initialState = {
	rid: '',
	player1: null,
	player1Score: 0,
	player2: null,
	player2Score: 0,
	initialized: false
};

export default function room(state = initialState, action) {
	switch (action.type) {
	case types.ROOM.INIT:
		return {
			...state,
			rid: action.rid
		};
	case types.ROOM.INIT_SUCCESS:
		return {
			...state,
			initialized: true
		};
	case types.ROOM.CREATE_ROOM_SUCCESS:
		return {
			...state,
			...action.room
		};
	default:
		return state;
	}
}