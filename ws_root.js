const WebSocketServer = require('websocket').server;
const SocketHelpers = require('./app/Http/Helpers/SocketHelpers')

class MyWebsocketServer {

 constructor (server) {
    this.server = server;

    // create the server
  this.wsServer = new WebSocketServer({
    httpServer: server
  });

  //websocket properties
  this.connections = [];
  this.startSocket();  
 }


  startSocket = () => {
     try {
        this.wsServer.on('request', async(req) => {
            try {
          //validate user connection here
          const userData = req.resourceURL.query;
         //if (!SocketHelpers.isConnectionValid(userData)) {console.log('User Rejected! ');  req.reject();  return};

         //accept connection
         const connection = req.accept(null, req.origin);
         this.connections.push(connection)

         console.log('user connected!')
         //receive users message
         connection.on('message', (message) => {

         })


         //user disconnet
         connection.on('close', () => {
             try {
                console.log('closing')
                for (let i = 0; i < this.connections; i ++) {
                    if (this.connections[i] == connection) {
                        this.connections.splice(i, 1)
                        console.log('user disconnected!')
                    }
                 }
             } catch (e) {
                console.log('onclose error: '+e)
             }
         })


        } catch (e) {
            console.log('startSocket error2: '+e)
        }

        })


     } catch (e) {
      console.log('startSocket error: '+e)
     }
  }





};


module.exports = MyWebsocketServer;
