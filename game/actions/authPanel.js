import * as types from './actionsTypes';

export function showPanel() {
	return {
		type: types.AUTHPANEL.SHOW_PANEL
	};
}

export function hidePanel() {
	return {
		type: types.AUTHPANEL.HIDE_PANEL
	};
}