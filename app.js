const express = require('express');
const route = require('default-network');

function isVPNDefaultGateway() {
    return new Promise((resolve, reject) => {
        route.collect((err, data) => {
            if (err) {
                reject(err);
            }

            const defaultIsTun = Object.keys(data)[0].indexOf('tun') === 0;
            resolve(defaultIsTun);
        });
    });
}

function statusRoute(req, res) {
    isVPNDefaultGateway()
        .then(status => {
            res.end(status ? 'vpn' : 'novpn');
        })
        .catch(err => {
            console.log('Error:', err);
            res.end('error');
        });
}

function main() {
    const app = express();

    app.get('/', statusRoute);

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log('Listening on port', port);
    });
}

main();

