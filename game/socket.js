import io from 'socket.io-client';
import {
	APP, ROOM
} from './actions/actionsTypes';
import * as AppActions from './actions/App';
import {
	initSuccess, initFailed,
	createRoomSuccess, joinRoomSuccess,
	player1LeavedRoom, player2LeavedRoom
} from './actions/room';
import reduxStore from './lib/createStore';
import settings from './constants/settings';

const { SERVER_URL } = settings;
const socket = io.connect(SERVER_URL);

socket.on(ROOM.INIT_SUCCESS, (room) => {
	reduxStore.dispatch(initSuccess(room));
});

socket.on(ROOM.INIT_FAILED, err => {
	reduxStore.dispatch(initFailed(err));
});

socket.on(APP.STATE_UPDATED, App => {
	reduxStore.dispatch(AppActions.stateUpdated(App));
});

socket.on(ROOM.CREATE_ROOM_SUCCESS, room => {
	reduxStore.dispatch(createRoomSuccess(room));
});

socket.on(ROOM.JOIN_ROOM_SUCCESS, room => {
	reduxStore.dispatch(joinRoomSuccess(room));
});

socket.on(ROOM.PLAYER1_LEAVED_ROOM, () => {
	reduxStore.dispatch(player1LeavedRoom());
});

socket.on(ROOM.PLAYER2_LEAVED_ROOM, () => {
	reduxStore.dispatch(player2LeavedRoom());
});

socket.on(APP.COUNT_DOWN, () => {
	reduxStore.dispatch(AppActions.countDown());
});