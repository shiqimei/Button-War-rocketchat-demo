window.addEventListener('message', ({ data }) => {
	if(!data.rcEmbeddedSdk) {
		return;
	}

	try {
		if (data.rcEmbeddedSdk.action === 'connected') {
			console.log(data.rcEmbeddedSdk.connected);
		}
	} catch (err) {
		console.warn(err);
	}
}, false);