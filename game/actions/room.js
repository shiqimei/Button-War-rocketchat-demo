import * as types from './actionsTypes';

export function init(rid) {
	return {
		type: types.ROOM.INIT,
		rid
	};
}

export function initSuccess(room) {
	return {
		type: types.ROOM.INIT_SUCCESS,
		room
	};
}

export function initFailed(err) {
	return {
		type: types.ROOM.INIT_FAILED,
		err
	};
}

export function createRoomRequest() {
	return {
		type: types.ROOM.CREATE_ROOM_REQUEST
	};
}

export function createRoomSuccess(room) {
	return {
		type: types.ROOM.CREATE_ROOM_SUCCESS,
		room
	};
}

export function createRoomFailed(err) {
	return {
		type: types.ROOM.CREATE_ROOM_FAILED,
		err
	};
}

export function joinRoomRequest(rid, user) {
	return {
		type: types.ROOM.JOIN_ROOM_REQUEST,
		rid,
		user
	};
}

export function joinRoomSuccess(room) {
	return {
		type: types.ROOM.JOIN_ROOM_SUCCESS,
		room
	};
}

export function joinRoomFailed(err) {
	return {
		type: types.ROOM.JOIN_ROOM_FAILED,
		err
	};
}

export function player1LeavedRoom() {
	return {
		type: types.ROOM.PLAYER1_LEAVED_ROOM
	};
}

export function player2LeavedRoom() {
	return {
		type: types.ROOM.PLAYER2_LEAVED_ROOM
	};
}