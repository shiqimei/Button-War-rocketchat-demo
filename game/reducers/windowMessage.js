window.addEventListener('message', ({ data }) => {
	try {
		if (data.rcEmbeddedSdk.action === 'connected') {
			console.log(data.rcEmbeddedSdk.connected);
		}
	} catch (err) {}
}, false);