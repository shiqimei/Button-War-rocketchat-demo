import { call, put, takeEvery } from 'redux-saga/effects';
import { APP } from '../actions/actionsTypes';
import * as AppActions from '../actions/App';
import settings from '../constants/settings';
import io from 'socket.io-client';

const { SERVER_URL } = settings;
const socket = io.connect(SERVER_URL);

const handlePlayer1JoinRequest = function* handlePlayer1JoinRequest({ payload }) {
	try {
		yield socket.emit(APP.PLAYER1_JOIN_REQUEST, payload);
	} catch (err) {
		console.warn(err);
	}
};

const handlePlayer2JoinRequest = function* handlePlayer2JoinRequest({ payload }) {
	try {
		yield socket.emit(APP.PLAYER2_JOIN_REQUEST, payload);
	} catch (err) {
		console.warn(err);
	}
};

const root = function* root() {
	yield takeEvery(APP.PLAYER1_JOIN_REQUEST, handlePlayer1JoinRequest);
	yield takeEvery(APP.PLAYER2_JOIN_REQUEST, handlePlayer2JoinRequest);
};

export default root;