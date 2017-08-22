const os = require('os');
const express = require('express');
const iprule = require('iproute').rule;

require('dotenv').config();

function getOS() {
    const platform = os.platform();

    if (platform === 'linux') {
        return Promise.resolve('linux');
    }

    if (platform === 'darwin') {
        return Promise.resolve('mac');
    }

    return Promise.reject(new Error('unknown os'));
}

function isVPNDefaultGatewayLinux() {
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

async function isVPNDefaultGateway() {
    const os = await getOS();

    if (os === 'linux') {
        const gatewayStatus = await isVPNDefaultGatewayLinux();
        return gatewayStatus;
    }

    if (os === 'mac') {
        throw new Error('MacOS not implemented yet on the server');
    }

    throw new Error('Unknown server operating system');
}

function statusResult(gatewayStatus) {
    return gatewayStatus
        ? 'vpn'
        : 'novpn';
}

async function route(req, res) {
    try {
        const gatewayStatus = await isVPNDefaultGateway();

        const result = statusResult(gatewayStatus);
        return res.end(result);
    }
    catch (err) {
        return res.status(500).end(err.message);
    }
}

function server() {
    const app = express();

    app.get('/', route);

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
