const express = require('express');
const iprule = require('iproute').rule;

require('dotenv').config();

function isVPNDefaultGateway() {
    const vpnTable = 'vpndef1';
    const subnetLan = '192.168.3.0/24';

    return new Promise((resolve, reject) => {
        iprule.show((err, rules) => {
            if (err) {
                return reject(err);
            }

            const tunnelIndex = rules.findIndex(
                rule => rule.from === subnetLan && rule.lookup === vpnTable
            );

            const lanIndex = rules.findIndex(
                rule => rule.from === subnetLan
            );

            const defaultIsTunnel = tunnelIndex <= lanIndex && tunnelIndex !== -1;

            return resolve(defaultIsTunnel);
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

