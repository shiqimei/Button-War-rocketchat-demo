const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3003;
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

io.on('connection', (socket) => {
	console.log('a user connected:', socket.id);

	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
});

server.listen(PORT, () => {
	console.log('Server is live on PORT:', PORT);
});