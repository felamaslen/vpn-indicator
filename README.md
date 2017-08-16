# VPN Indicator

This is a small project I wrote in an hour one evening. Its purpose is to have an up-to-date indicator on my Ubuntu desktop of whether or not my Linux gateway server is set to redirect its default gateway to a VPN client running on it.

## Installation

### Dependencies

    `python-dotenv` for the gtk indicator (you can install with pip)

Run `npm install` on the server, then `npm start` to start the web server.

Copy `gtk-indicator` somewhere on your Ubuntu desktop. Rename `.env.example` to `.env`, configure it and run `main.py`. It should come up with an indicator in the top right menu bar.

## Configuration

For the server, the default port is `8000`, and this is configured at runtime by the PORT environment variable.

For the gtk indicator, configuration is in the `gtk-indicator/.env` file which you should rename from `.env.example`.

