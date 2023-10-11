const { Server } = require("socket.io");

const io = new Server({ 
  cors:{
    origin: "*"
  }});

io.on("connection", (socket) => {
  console.log('new user connected')

  socket.on('subscribe', (channel)=>{
    console.log(`subscribe on ${channel}`)
    socket.join(channel);
  })

  socket.on('unsubscribe', (channel) => {
    console.log(`unsubscribe on ${channel}`)
    socket.leave(channel);
  })

  socket.on('disconect',()=>{
    console.log('disconect')
  })

  socket.on("broadcast", ({ channel, message }) => {
    console.log('broadcast: ', channel, message)
    io.to(channel).emit(channel, message);
  });

});

io.listen(3000);

console.log("Listening port "+3000)