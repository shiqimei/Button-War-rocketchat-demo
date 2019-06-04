function getUserInfo() {
	if (window.parent) {
		window.parent.postMessage({
			rcEmbeddedSdk: {
				version: '0.0.1',
				action: 'getUserInfo',
			},
		}, '*');
	}
}

export default {
	getUserInfo
};
