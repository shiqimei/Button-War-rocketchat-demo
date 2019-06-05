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

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
	console.log(socket.id, ' connected');

	socket.on('disconnect', () => {
		console.log(socket.id, ' disconnected');
	});

	socket.on(Actions.PLAYER1_JOIN_REQUEST, player => {
		console.log(Actions.PLAYER1_JOINED);
		io.emit(Actions.PLAYER1_JOINED, player);
	});
});

server.listen(PORT, () => {
	console.log('Server is live on PORT:', PORT);
});