const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buttonWarSchema = new Schema({
	rid: String,
	player1: Object,
	player2: Object,
	player1Score: Number,
	player2Score: Number,
}, { collection: 'roomList' });

module.exports = mongoose.model('ButtonWar', buttonWarSchema);