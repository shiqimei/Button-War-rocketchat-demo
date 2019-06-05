import reduxStore from '../createStore';
import { authorized as playerAuthorizedAction } from '../actions/App';

window.addEventListener('message', ({ data }) => {
	if(!data.rcEmbeddedSdk) {
		return;
	}

	try {
		if (data.rcEmbeddedSdk.action === 'connected') {
			const { connected } = data.rcEmbeddedSdk;
			reduxStore.dispatch(playerAuthorizedAction(connected));
		}
	} catch (err) {
		console.warn(err);
	}
}, false);