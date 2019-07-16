/**
 * Obtain context info about the current user. This method receives the current game
 * name and will return an object containing the current user's username and avatar
 * URL and the current the opened room's name.
 * @param {String} appName
 * @returns {Object} { username : String. avatarUrl : String, roomName : String }
 */

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

/**
 * Call inviting others modal window to shrare your game link to other channel, room and user.
 * This method receives the current game and has no return.
 * @param {String} appName
 */
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
