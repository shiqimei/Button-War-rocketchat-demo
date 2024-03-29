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

const randomString = require('./utils/randomString');

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
			if (player1LeavedRoom.player2) {
				player1LeavedRoom.player1 = player1LeavedRoom.player2;
				player1LeavedRoom.player2 = undefined;
				await player1LeavedRoom.save();
				const room = await model.findOne({ rid: rid }, { _id: 0, __v: 0, 'player1.socketId': 0, 'player2.socketId': 0 });
				console.log(`${chalk.green('[INFO]')} player1 ${username} leaved room ${chalk.red(rid)}`);
				io.emit(Actions.ROOM.PLAYER2_LEAVED_ROOM, room);
			} else {
				const result = await model.deleteOne({ rid: rid });
				if (result.ok) {
					console.log(`${chalk.green('[INFO]')} player1 ${username} leaved room ${chalk.red(rid)}`);
					io.emit(Actions.ROOM.PLAYER2_LEAVED_ROOM);
				}
			}
		}

		const player2LeavedRoom = await model.findOne({
			'player2.socketId': socket.id
		});

		if (player2LeavedRoom) {
			const { rid, player2: { username } } = player2LeavedRoom;
			player2LeavedRoom.player2 = undefined;
			await player2LeavedRoom.save();
			console.log(`${chalk.green('[INFO]')} player2 ${username} leaved room ${chalk.red(rid)}`);
			io.emit(Actions.ROOM.PLAYER2_LEAVED_ROOM);
		}
	});

	socket.on(Actions.ROOM.INIT, async rid => {
		const result = await model.find({ rid: rid });
		if (result.length) {
			const room = await model.findOne({ rid: rid }, { _id: 0, __v: 0, 'player1.socketId': 0, 'player2.socketId': 0 });
			io.emit(Actions.ROOM.INIT_SUCCESS, room);
		}
	});

	socket.on(Actions.ROOM.JOIN_ROOM_REQUEST, async (rid, user) => {
		const room = await model.findOne({ rid: rid });
		if (room) {
			room.player2 = {
				...user,
				socketId: socket.id
			};
			await room.save();
			const newRoom = await model.findOne({ rid: rid }, { _id: 0, __v: 0 });
			io.emit(Actions.ROOM.JOIN_ROOM_SUCCESS, newRoom);
			console.log(`${chalk.green('[INFO]')} player2 ${user.username} joined room ${chalk.yellow(rid)}`);
		} else {
			handleCreateRoomRequest(socket, user, rid);
		}
	});

	socket.on(Actions.ROOM.CREATE_ROOM_REQUEST, async user => {
		console.log(user);
		handleCreateRoomRequest(socket, user);
	});

	socket.on(Actions.APP.COUNT_DOWN_REQUEST, () => {
		io.emit(Actions.APP.COUNT_DOWN);
	});

	socket.on(Actions.APP.START_GAME_REQUEST, () => {
		io.emit(Actions.APP.START_GAME);
	});

	socket.on(Actions.ROOM.PLAYER1_TAP_REQUEST, () => {
		io.emit(Actions.ROOM.PLAYER1_TAP_SUCCESS);
	});

	socket.on(Actions.ROOM.PLAYER2_TAP_REQUEST, () => {
		io.emit(Actions.ROOM.PLAYER2_TAP_SUCCESS);
	});
});

async function handleCreateRoomRequest(socket, user, rid = null) {
	rid = rid ? rid : socket.id;
	const room = {
		rid,
		player1: {
			...user,
			socketId: socket.id
		}
	};
	const roomItem = new model(room);
	roomItem.save( async (err) => {
		if (err) {
			console.warn(err);
			io.emit(Actions.ROOM.CREATE_ROOM_FAILED, err);
		} else {
			console.log(`${chalk.green('[INFO]')} ${user.username} created room ${chalk.yellow(rid)}`);
			const result = await model.findOne({ rid: rid }, { _id: 0, __v: 0, 'player1.socketId': 0, 'player2.socketId': 0 });
			io.emit(Actions.ROOM.CREATE_ROOM_SUCCESS, result);
			console.log(result);
		}
	});
}

server.listen(PORT, () => {
	console.log('Server is live on PORT:', PORT);
});