# VPN Indicator

This is a small project I wrote one evening. Its purpose is to have an up-to-date indicator on my Ubuntu desktop of whether or not my Linux gateway server is set to redirect its default gateway to a VPN client running on it.

## Architecture

It is assumed that you have a LAN with a gateway server. The gateway server runs a VPN point-to-point link to a remote VPN server.

The gateway has a special routing table (default: `vpndef1`) which routes requests from the LAN to the public internet via the VPN link.

The point of this app is to be an interface to a script which toggles this routing table.

---
## Server setup

### Backend Routing

In this example, the server has interfaces:
- LAN: `eth0` with
    - IPv4: `10.0.3.1/24`
    - IPv6: `2001:db8::1/48`
- VPN: `tun0` with
    - IPv4 `10.2.0.2/32` connected to remote `10.2.0.1/32`
    - IPv6: `2001:db8:200::2/128` connected to remote `2001:db8:200::1/128`

#### Linux

[**UNTESTED!**] To set up a routing table, put the correct values in `.env` (rename from `.env.example`) and run `setup_route_table.sh` as root.

What the script does is essentially:

1. `# echo 200 vpndef1 | tee -a /etc/iproute2/rt_tables` to add the routing table
2. `# ip route add default via 10.2.0.2 table vpndef1` to set the default gateway to the VPN
3. `# ip route add 10.0.3.0/24 via 10.0.3.1 table vpndef1` to allow local access
4. Similar for IPv6 routes.

#### Other operating systems

None are supported as of yet. MacOS support may be added in future.
You could probably get it to run quite easily on OpenBSD etc.

---
### Installation
Do this once the routing tables are all set up (see above).

- Run `npm install` to install dependencies.

### Running

- Run `npm start` to start the web server. The port is set in the environment variables as `PORT`; the default is 8000.

### Development

- Run `npm run dev` to watch the server for changes.
- Run `npm test` to test the server.

---
## Client setup

### GTK indicator applet (Linux [Gnome / Unity etc.])

This displays an indicator applet in the menu bar, indicating the status of the server's VPN routes (via the node web server) and allowing the user to toggle the status.

#### Dependencies

- Python 3

#### Configuration

This is done with environment variables in `gtk-indicator/.env`, which you should rename from `gtk-indicator/.env.example` and edit with the correct values.

#### Installation

Change directory to `./gtk-indicator`, and

- Run `setup.sh` to install a python environment and further dependencies

#### Running

- Run `start.sh` to run the applet

