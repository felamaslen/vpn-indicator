const server = require('./app').server;

async function main() {
    const srv = await server();

    console.log('Server listening on port', srv.port);

    return srv;
}

main();

