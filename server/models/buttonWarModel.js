const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buttonWarSchema = new Schema({
	roomId: Number,
	player1Score: Number,
	player2Score: Number,
	membersCount: Number
}, { collection: 'roomList' });

module.exports = mongoose.model('ButtonWar', buttonWarSchema);