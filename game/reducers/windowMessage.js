import reduxStore from '../lib/createStore';
import {
	authorized as playerAuthorizedAction,
} from '../actions/App';

import {
	createRoomRequest
} from '../actions/room';

window.addEventListener('message', ({ data }) => {
	if(!data.rcEmbeddedSdk) {
		return;
	}

	try {
		if (data.rcEmbeddedSdk.action === 'connected') {
			const user = data.rcEmbeddedSdk.connected;
			reduxStore.dispatch(playerAuthorizedAction(user));

			const { App } = reduxStore.getState();
			const { player, player1, player2 } = App;

			if (!player1) {
				reduxStore.dispatch(createRoomRequest(user));
				return;
			}
		}
	} catch (err) {
		console.warn(err);
	}
}, false);