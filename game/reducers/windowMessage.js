import reduxStore from '../lib/createStore';
import {
	authorized as playerAuthorizedAction,
	player1JoinRequest as player1JoinRequestAction,
	player2JoinRequest as player2JoinRequestAction
} from '../actions/App';

window.addEventListener('message', ({ data }) => {
	if(!data.rcEmbeddedSdk) {
		return;
	}

	try {
		if (data.rcEmbeddedSdk.action === 'connected') {
			const { connected } = data.rcEmbeddedSdk;
			reduxStore.dispatch(playerAuthorizedAction(connected));

			const { App } = reduxStore.getState();
			const { player, player1, player2 } = App;

			if (!player1) {
				reduxStore.dispatch(player1JoinRequestAction(player));
				return;
			}

			if (!player2) {
				reduxStore.dispatch(player2JoinRequestAction(player));
				return;
			}
		}
	} catch (err) {
		console.warn(err);
	}
}, false);