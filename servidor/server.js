const express = require('express');
const path = require('path');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3001; // Cambiado a 3001

let users = [];

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001', // Cambia esto a tu origen
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado');

  socket.on('join', (user) => {
    users.push({ id: socket.id, ...user });
    io.emit('updateUsers', users);
    io.emit('userConnected', user);
  });

  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  });

  socket.on('mensaje', (datos) => {
    io.emit('mensaje', datos);
  });

  socket.on('disconnect', () => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      users = users.filter(u => u.id !== socket.id);
      io.emit('updateUsers', users);
      io.emit('userDisconnected', user);
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
