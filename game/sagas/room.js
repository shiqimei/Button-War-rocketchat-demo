import { takeLatest, put } from 'redux-saga/effects';
import { ROOM } from '../actions/actionsTypes';
import {
	init as initRoomAction,
	createRoomFailed,
	joinRoomFailed,
	createRoomSuccess
} from '../actions/room';
import io from 'socket.io-client';
import Settings from '../constants/settings';
import reduxStore from '../lib/createStore';

const { SERVER_URL } = Settings;
const socket = io.connect(SERVER_URL);

const handleInit = function* handleInit({ rid }) {
	try {
		yield socket.emit(ROOM.INIT, rid);
	} catch (err) {
		console.warn(err);
	}
};

const handleCreateRoomequest = function* handleCreateRoomequest({ user }) {
	try {
		yield socket.emit(ROOM.CREATE_ROOM_REQUEST, user);
	} catch (err) {
		yield put(createRoomFailed(err));
	}
};

const handlejoinRoomequest = function* handlejoinRoomequest({ rid, user }) {
	try {
		yield socket.emit(ROOM.JOIN_ROOM_REQUEST, rid, user);
	} catch (err) {
		yield put(joinRoomFailed(err));
	}
};

const root = function* root() {
	yield takeLatest(ROOM.CREATE_ROOM_REQUEST, handleCreateRoomequest);
	yield takeLatest(ROOM.JOIN_ROOM_REQUEST, handlejoinRoomequest);
};

export default root;