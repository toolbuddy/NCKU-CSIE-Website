import express from 'express';

import config from 'settings/server/config.js';
import language from 'settings/language/middleware';
import apis from 'apis/urls';
import routes from 'routes/urls';

// Start server.
const server = express();
server.listen( config.port );

// Set static files routes.
server.use( '/css', express.static( `${ config.projectRoot }/static/dist/css` ) );
server.use( '/js', express.static( `${ config.projectRoot }/static/dist/js` ) );
server.use( '/image', express.static( `${ config.projectRoot }/static/src/image` ) );

// Set language option.
server.use( language );

// Set web server routes.
server.use( '/', routes );

// Set web server api routes.
server.use( '/api', apis );
