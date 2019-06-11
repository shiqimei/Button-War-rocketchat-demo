const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3003;
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const Actions = require('./constants/actions');
const chalk = require('chalk');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	console.log(req.query)
});

const currentState = {};

// database
mongoose.connect('mongodb://localhost:27017/local');
const db = mongoose.connection;

db.on('error', () => {
	console.error('Failed to connect to mongoose!');
});

db.on('open', () => {
	console.info('Connected to mongoose.');
});

// socket.io
io.on('connection', (socket) => {

	socket.on('disconnect', () => {
		console.log(`${chalk.gray(socket.id)} ${chalk.red('leaved')}`);
	});

	// waiting for player2 to join
	if (currentState.player1 && !currentState.player2) {
		io.emit(Actions.STATE_UPDATED, currentState);
	}

	socket.on(Actions.PLAYER1_JOIN_REQUEST, player => {
		currentState.player1 = player;
		currentState.membersCount = 1;

		console.log(`${chalk.gray(socket.id)} ${player.username} ${chalk.green('connected')}
		`);

		io.emit(Actions.PLAYER1_JOINED, player);
	});

	socket.on(Actions.PLAYER2_JOIN_REQUEST, player => {
		currentState.player2 = player;
		currentState.membersCount = 2;
		io.emit(Actions.PLAYER2_JOINED, player);
	});
});

server.listen(PORT, () => {
	console.log('Server is live on PORT:', PORT);
});