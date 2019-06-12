import { takeLatest, put } from 'redux-saga/effects';
import { ROOM } from '../actions/actionsTypes';
import {
	init as initRoomAction,
	createRoomFailed
} from '../actions/room';
import io from 'socket.io-client';
import Settings from '../constants/settings';

const { SERVER_URL } = Settings;
const socket = io.connect(SERVER_URL);


const handleCreateRoomequest = function* handleCreateRoomequest({ user }) {
	try {
		yield socket.emit(ROOM.CREATE_ROOM_REQUEST, user);
	} catch (err) {
		yield put(createRoomFailed(err));
	}
};

const root = function* root() {
	yield takeLatest(ROOM.CREATE_ROOM_REQUEST, handleCreateRoomequest);
}

export default root;