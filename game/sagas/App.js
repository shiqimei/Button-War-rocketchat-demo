import { takeLatest, put } from 'redux-saga/effects';
import { APP } from '../actions/actionsTypes';
import { SERVER_URL } from '../constants/settings';
import io from 'socket.io-client';

const socket = io.connect(SERVER_URL);

const handleCountDownRequest = function* handleCountDownRequest() {
	try {
		yield socket.emit(APP.COUNT_DOWN_REQUEST);
	} catch (err) {
		console.warn(err);
	}
};

const handleStartGameRequest = function* handleStartGameRequest() {
	try {
		yield socket.emit(APP.START_GAME_REQUEST);
	} catch (err) {
		console.warn(err);
	}
};


const root = function* root() {
	yield takeLatest(APP.COUNT_DOWN_REQUEST, handleCountDownRequest);
	yield takeLatest(APP.START_GAME_REQUEST, handleStartGameRequest);
};

export default root;