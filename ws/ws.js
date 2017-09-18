const WebSocketServer = new require( 'ws' );

// clients
let clients = {};

// WebSocket server
let webSocketServer = new WebSocketServer.Server( {
  port: 8080
} );
webSocketServer.on( 'connection', ( ws )=> {
  let id = Math.random();
  clients[ id ] = ws;
  console.log( 'New connection ' + id );

  ws.on( 'message', ( message ) => {
    console.log( message );
    let recived_message = JSON.parse( message );
    console.log( 'Received a message: ' + recived_message.input );

    for ( let key in clients) {
      clients[ key ].send( JSON.stringify( recived_message ) );
    }
  } );

  ws.on( 'close', () => {
    console.log( 'Connection closed ' + id );
    delete clients[ id ];
  } );

  ws.on( 'error', ( err ) => {
    console.log('WebSocket Error: ' + err );
  } );
} );

// module.exports = webSocketServer;