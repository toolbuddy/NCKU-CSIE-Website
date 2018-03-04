const express = require( 'express' );
const config = require( './settings/server/config' );
const pug = require( 'pug' );

const server = express();

const about = require( './routes/about' )

server.set( 'view engine', 'pug' );

server.use( '/about', about );


server.listen(config.port, function() {
    console.log( 'Example server listening on port ' + config.port + ' for about!!' );
})

