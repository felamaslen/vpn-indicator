const os = require('os');
const express = require('express');
const iprule = require('iproute').rule;

require('dotenv').config();
const config = require('./config')();

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
    return new Promise((resolve, reject) => {
        iprule.show((err, rules) => {
            if (err) {
                return reject(err);
            }

            const tunnelIndex = rules.findIndex(
                rule => rule.from === config.subnetLan && rule.lookup === config.vpnTable
            );

            const lanIndex = rules.findIndex(
                rule => rule.from === config.subnetLan
            );

            const defaultIsTunnel = tunnelIndex <= lanIndex && tunnelIndex !== -1;

            return resolve(defaultIsTunnel);
        });
    });
}

async function isVPNDefaultGateway() {
    const platform = await getOS();

    if (platform === 'linux') {
        const gatewayStatus = await isVPNDefaultGatewayLinux();
        return gatewayStatus;
    }

    if (platform === 'mac') {
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
