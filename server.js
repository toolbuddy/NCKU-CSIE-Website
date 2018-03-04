const express = require( 'express' );
const config = require( './settings/server/config' );
const pug = require( 'pug' );
const Student = require( './routes/Student' );
const server = express();

server.set('view engine','pug');

server.use('/Student',Student);
server.listen(3000);

module.exports=server;

