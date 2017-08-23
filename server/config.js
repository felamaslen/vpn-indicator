require('dotenv').config();

module.exports = () => {
    return {
        vpnTable: process.env.VPN_TABLE,
        subnetLan: process.env.SUBNET_LAN
    };
};

