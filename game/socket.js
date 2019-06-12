import io from 'socket.io-client';
import {
	APP, ROOM
} from './actions/actionsTypes';
import * as AppActions from './actions/App';
import {
	createRoomRequest, createRoomSuccess
} from './actions/room';
import reduxStore from './lib/createStore';
import settings from './constants/settings';

const { SERVER_URL } = settings;
const socket = io.connect(SERVER_URL);

socket.on(APP.STATE_UPDATED, App => {
	reduxStore.dispatch(AppActions.stateUpdated(App));
});

socket.on(ROOM.CREATE_ROOM_SUCCESS, room => {
	reduxStore.dispatch(createRoomSuccess(room));
});