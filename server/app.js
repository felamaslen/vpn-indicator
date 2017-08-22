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

function statusResult(gatewayStatus) {
    return gatewayStatus
        ? 'vpn'
        : 'novpn';
}

function server() {
    const app = express();

    app.get('/', (req, res) => {
        isVPNDefaultGateway()
            .then(gatewayStatus => res.end(statusResult(gatewayStatus)))
            .catch(() => res.status(500).end('server error'));
    });

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log('Listening on port', port);
    });
}

module.exports = {
    isVPNDefaultGateway,
    statusResult,
    server
};
