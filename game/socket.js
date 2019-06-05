import io from 'socket.io-client';
import { APP } from './actions/actionsTypes';
import * as AppActions from './actions/App';
import reduxStore from './createStore';
import settings from './constants/settings';

const { SERVER_URL } = settings;
const socket = io.connect(SERVER_URL);

console.dir(socket);

socket.on(APP.PLAYER1_JOIED, player1 => {
	reduxStore.dispatch(AppActions.player1Joined(player1));
});
