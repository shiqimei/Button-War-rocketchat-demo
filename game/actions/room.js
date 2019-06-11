import * as types from './actionsTypes';

export function init(rid) {
	return {
		type: types.ROOM.INIT,
		rid
	};
}

export function createRoomRequest(owner) {
	return {
		type: types.ROOM.CREATE_ROOM_REQUEST,
		owner
	};
}

export function createRoomSuccess(rid) {
	return {
		type: types.ROOM.CREATE_ROOM_SUCCESS,
		rid
	};
}

export function createRoomFailed(err) {
	return {
		type: types.ROOM.CREATE_ROOM_FAILED,
		err
	};
}

export function joinRoomRequest(rid, player) {
	return {
		type: types.ROOM.JOIN_ROOM_REQUEST,
		rid,
		player
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

export function playerLeavedRoom(room) {
	return {
		type: types.ROOM.PLAYER_LEAVED_ROOM,
		room
	};
}