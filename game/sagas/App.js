import { takeLatest, put } from 'redux-saga/effects';
import { APP } from '../actions/actionsTypes';
import Settings from '../constants/settings';
import io from 'socket.io-client';

const { SERVER_URL } = Settings;
const socket = io.connect(SERVER_URL);

const handleCountDownRequest = function* handleCountDownRequest() {
	try {
		yield socket.emit(APP.COUNT_DOWN_REQUEST);
	} catch (err) {
		console.warn(err);
	}
};

const root = function* root() {
	yield takeLatest(APP.COUNT_DOWN_REQUEST, handleCountDownRequest);
};

export default root;