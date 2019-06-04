import reduxStore from '../createStore';
import { player1Joined as player1JoinedAction} from '../actions/App';

window.addEventListener('message', ({ data }) => {
	if(!data.rcEmbeddedSdk) {
		return;
	}

	try {
		if (data.rcEmbeddedSdk.action === 'connected') {
			const { connected } = data.rcEmbeddedSdk;
			reduxStore.dispatch(player1JoinedAction(connected));
		}
	} catch (err) {
		console.warn(err);
	}
}, false);