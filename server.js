const { Server } = require("socket.io");
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html');  
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error loading index.html');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });  
});

server.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});

const io = new Server(server, { 
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log('User connected');

  socket.on('subscribe', (channel) => {
    console.log(`subscribe on ${channel}`);
    socket.join(channel);
  });

  socket.on('unsubscribe', (channel) => {
    console.log(`Unsubscribe on ${channel}`);
    socket.leave(channel);
  });

  socket.on('disconnect', () => {
    console.log('Disconected');
  });

  socket.on("broadcast", ({ channel, message }) => {
    console.log('broadcast to:', channel, 'message:', message);
    io.to(channel).emit(channel, message);
  });
});
