# Websocket - Pub/Sub
## implementado com node socket.io para publish/subscribe

Available on :
- dockerhub:  [hub.docker.com/r/vinymd/socketio-pub](https://hub.docker.com/r/vinymd/socketio-pub)
- online: [vinymd-socketio-pub.onrender.com](https://vinymd-socketio-pub.onrender.com)


## Running

### Local
```bash
npm install
node server.js
```

### docker
```bash
$ docker-compose up
```
Open [localhost:3000](http://localhost:3000)

## Usage
### Client Receiving msgs
```javascript
        import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
        const socket = io("https://vinymd-socketio-pub.onrender.com");

        socket.on("connect", () => {
            console.log("Connected Socket.io");
            start()
        });

        socket.on("disconnect", () => {
            console.log("Disconnect Socket.io");
        });

        function start(){
            socket.emit("subscribe", 'topic1');

            socket.on('topic1', (msg) => {
               console.log(`Message received from topic1: ${msg}`);
            })
        }
```
### Client Sending msgs
```javascript
       socket.emit("broadcast", {channel: 'topic1', message: 'Message sent from html2'});
```
