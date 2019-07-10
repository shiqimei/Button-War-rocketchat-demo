function getUserInfo(appName) {
	if (window.parent) {
		window.parent.postMessage({
			rcEmbeddedSdk: {
				action: 'getUserInfo',
				payload: {
					appName
				}
			},
		}, '*');
	}
}

function invitingOthers(appName) {
	if (window.parent) {
		window.parent.postMessage({
			rcEmbeddedSdk: {
				action: 'invitingOthers',
				payload: {
					appName
				}
			},
		}, '*');
	}
}

export default {
	getUserInfo,
	invitingOthers
};
