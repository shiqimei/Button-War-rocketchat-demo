import io from 'socket.io-client';

const socket = io.connect('http://localhost:3003');

console.dir(socket);

