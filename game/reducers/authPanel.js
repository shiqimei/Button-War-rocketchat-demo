import * as types from '../actions/actionsTypes';

const initialState = {
	show: false
}

export default function authPanel(state = initialState, action) {
	switch (action.type) {
		case types.AUTHPANEL.SHOW_PANEL:
			return {
				...state,
				show: true
			};
		case types.AUTHPANEL.HIDE_PANEL:
			return {
				...state,
				show: false
			};
		default:
			return state;
	}
}