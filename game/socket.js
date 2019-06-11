import io from 'socket.io-client';
import { APP } from './actions/actionsTypes';
import * as AppActions from './actions/App';
import reduxStore from './lib/createStore';
import settings from './constants/settings';

const { SERVER_URL } = settings;
const socket = io.connect(SERVER_URL);

socket.on(APP.STATE_UPDATED, App => {
	reduxStore.dispatch(AppActions.stateUpdated(App));
});