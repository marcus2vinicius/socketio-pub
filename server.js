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

  socket.on("broadcast", ({ canal, mensagem }) => {  
    console.log('broadcast: ', canal, mensagem)  
    io.to(canal).emit(canal, mensagem);
  });

});

io.listen(3000);

console.log("Listening port "+3000)