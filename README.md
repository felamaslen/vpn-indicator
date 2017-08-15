# VPN Indicator

This is a small project I wrote in an hour one evening. Its purpose is to have an up-to-date indicator on my Ubuntu desktop of whether or not my Linux gateway server is set to redirect its default gateway to a VPN client running on it.

## Installation

Run `npm install` on the server, then `npm start` to start the web server.

Copy `gtk-indicator` somewhere on your Ubuntu desktop, and run `main.py`. It should come up with an indicator in the top right menu bar.

## Configuration

Right now, configuration is done by editing the source code (!). Open `main.py` in `gtk-indicator` to set the URL of your server.
