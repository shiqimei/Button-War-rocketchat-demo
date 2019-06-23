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

export default {
	getUserInfo
};
