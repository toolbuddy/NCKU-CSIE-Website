// including public module
const express = require( 'express' );

const config = require( './settings/server/config' );
const routes = require( './routes/urls' );

// start server
const server = express();
<<<<<<< HEAD

server.use( express.static( __dirname + '/static/dist' ) );

=======
>>>>>>> 1ac65bc6c7a62ae3705b04005005a9ad5257bb26
server.listen( config.port );

// set render engine
server.set( 'view engine', 'pug' );
server.use( express.static( 'static/dist' ) );
server.use( '/', routes );
