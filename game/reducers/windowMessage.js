import reduxStore from '../lib/createStore';
import {
	authorized as playerAuthorizedAction,
} from '../actions/App';

import {
	createRoomRequest,
	joinRoomRequest
} from '../actions/room';

window.addEventListener('message', ({ data }) => {
	if(!data.rcEmbeddedSdk) {
		return;
	}

	try {
		if (data.rcEmbeddedSdk.action === 'connected') {
			const user = data.rcEmbeddedSdk.connected;
			reduxStore.dispatch(playerAuthorizedAction(user));

			const { App, room: { rid } } = reduxStore.getState();
			const { player1, player2 } = App;

			if (rid) {
				reduxStore.dispatch(joinRoomRequest(rid, user));
				return;
			} else {
				reduxStore.dispatch(createRoomRequest(user));
				return;
			}
		}
	} catch (err) {
		console.warn(err);
	}
}, false);