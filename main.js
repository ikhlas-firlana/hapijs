'use strict';

const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {
	console.log(h);
	return h.file('./public/index.html');
    }
});

// Add name to route
server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: (request, h) => {
	console.log(request.params);
        return 'Hello, ' + encodeURIComponent(request.params.name) + '!';
    }
});

// Start the server
const start =  async function() {

    try {
        await server.start(require('inert'));
    }
    catch (err) {
        console.log(err);
    }

    console.log('Server running at:', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
});

start();
