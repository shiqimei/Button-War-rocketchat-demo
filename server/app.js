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
const model = require('./models/model');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req) => {
	console.log(req.query);
});

// database
mongoose.connect('mongodb://localhost:27017/local', {
	useNewUrlParser: true
});
const db = mongoose.connection;

db.on('error', () => {
	console.error('Failed to connect to mongoose!');
});

db.on('open', () => {
	console.info('Connected to mongoose.');
});

// socket.io
io.on('connection', (socket) => {

	socket.on('disconnect', async () => {
		const player1LeavedRoom = await model.findOne({
			'player1.socketId': socket.id
		}, { _id: 0, __v: 0 });

		if (player1LeavedRoom) {
			const { rid, player1: { username } } = player1LeavedRoom;
			const result = await model.deleteOne({ rid: rid });
			if (result.ok) {
				console.log(`${chalk.green('[INFO]')} player1 ${username} leaved room ${chalk.red(rid)}`);
			}
		}

		const player2LeavedRoom = await model.findOne({
			'player2.socketId': socket.id
		}, { _id: 0, __v: 0 });

		if (player2LeavedRoom) {
			const { rid, player2: { username } } = player2LeavedRoom;
			const result = await model.deleteOne({ rid: rid });
			if (result.ok) {
				console.log(`${chalk.green('[INFO]')} player2 ${username} leaved room ${chalk.red(rid)}`);
			}
		}
	});

	socket.on(Actions.ROOM.CREATE_ROOM_REQUEST, async user => {
		const room = {
			rid: socket.id,
			player1: {
				...user,
				socketId: socket.id
			}
		};
		const roomItem = new model(room);
		roomItem.save((err) => {
			if (err) {
				console.warn(err);
				io.emit(Actions.ROOM.CREATE_ROOM_FAILED, err);
			} else {
				console.log(`${chalk.green('[INFO]')} ${user.username} created room ${chalk.yellow(socket.id)}`);
				io.emit(Actions.ROOM.CREATE_ROOM_SUCCESS, socket.id);
			}
		});
	});
});

server.listen(PORT, () => {
	console.log('Server is live on PORT:', PORT);
});