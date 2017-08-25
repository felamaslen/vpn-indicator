# flake8: noqa

"""
Main app entry point
"""

import os
import struct
import signal
import socket
import requests
from threading import Timer

from settings import APPINDICATOR_ID, SERVER_IP, SERVER_URL, \
        SERVER_AUTH_USERNAME, SERVER_AUTH_PASSWORD, \
        REQUEST_INTERVAL, HTTP_TIMEOUT

import gi

# set gi gtk options
gi.require_version('Gtk', '3.0')
gi.require_version('AppIndicator3', '0.1')

from gi.repository import Gtk as gtk
from gi.repository import AppIndicator3 as appindicator

DIR_PATH = os.path.dirname(os.path.realpath(__file__))

ICON_SUCCESS = DIR_PATH + '/success.svg'
ICON_FAIL = DIR_PATH + '/fail.svg'
ICON_UNKNOWN = DIR_PATH + '/unknown.svg'
ICON_PENDING = DIR_PATH + '/refresh.svg'

STATUS_DISABLED = 0
STATUS_ENABLED = 1
STATUS_PENDING = 2

class GatewayError(Exception):
    """ custom exception to throw when we can't find the local
    default gateway """
    pass

class VPNIndicatorApplet(object):
    """ wrapper class for the applet """
    def __init__(self):
        self.status_toggle = STATUS_PENDING

        self.indicator = appindicator.Indicator.new(APPINDICATOR_ID, \
                'ldnvpnind', appindicator.IndicatorCategory.SYSTEM_SERVICES)
        self.indicator.set_status(appindicator.IndicatorStatus.ACTIVE)
        self.indicator.set_icon(ICON_FAIL)
        self.indicator.set_menu(self.build_menu())

        self.request_timer = None

        self.vpn_is_connected()

        gtk.main()

    @staticmethod
    def get_default_gateway():
        """ read the default gateway directly from /proc """
        with open('/proc/net/route') as handler:
            for line in handler:
                fields = line.strip().split()
                if fields[1] != '00000000' or not int(fields[3], 16) & 2:
                    continue

                return socket.inet_ntoa(struct.pack('<L', int(fields[2], 16)))

    @staticmethod
    def default_gateway_is_server():
        """ the local default gateway must be the local server which connects
        to the VPN """
        return str(VPNIndicatorApplet.get_default_gateway()) == SERVER_IP

    def quit(self, source):
        """ close the applet """
        if self.request_timer is not None:
            self.request_timer.cancel()

        gtk.main_quit()

    def set_new_status(self, response):
        response_string = response.text

        self.status_toggle = STATUS_ENABLED if response_string == 'vpn' \
                else STATUS_DISABLED

        icon = ICON_SUCCESS if self.status_toggle == STATUS_ENABLED \
                else ICON_FAIL

        self.indicator.set_icon(icon)

    def toggle_vpn_redirect(self, source):
        """ run a command on the server """
        if self.status_toggle == STATUS_PENDING:
            return

        self.status_toggle = STATUS_PENDING

        self.indicator.set_icon(ICON_PENDING)

        try:
            response = requests.put('{}/api/toggle'.format(SERVER_URL), timeout=HTTP_TIMEOUT, \
                    auth=(SERVER_AUTH_USERNAME, SERVER_AUTH_PASSWORD))
            response.raise_for_status()

            self.set_new_status(response)

        except (requests.exceptions.RequestException):
            # some error occurred with the request
            self.indicator.set_icon(ICON_UNKNOWN)

            return

    def vpn_is_connected(self):
        """ contact the local server via its node express server
        and find out whether its default gateway is set to the VPN """

        if self.request_timer is not None:
            self.request_timer.cancel()

        try:
            if not VPNIndicatorApplet.default_gateway_is_server():
                self.status_toggle = STATUS_PENDING
                raise GatewayError()

            response = requests.get('{}/status'.format(SERVER_URL), timeout=HTTP_TIMEOUT)
            response.raise_for_status()

            self.set_new_status(response)

        except (requests.exceptions.RequestException, GatewayError):
            # some error occurred with the request
            # try again after changing the icon to unknown
            self.status_toggle = STATUS_PENDING
            self.indicator.set_icon(ICON_UNKNOWN)

        self.request_timer = Timer(REQUEST_INTERVAL, self.vpn_is_connected)
        self.request_timer.start()

    def build_menu(self):
        """ create a menu to display when the user clicks the applet """
        menu = gtk.Menu()

        item_toggle = gtk.MenuItem('Toggle')
        item_toggle.connect('activate', self.toggle_vpn_redirect)

        item_quit = gtk.MenuItem('Quit')
        item_quit.connect('activate', self.quit)

        menu.append(item_toggle)
        menu.append(item_quit)

        menu.show_all()

        return menu


def main():
    """ main entry point """
    signal.signal(signal.SIGINT, signal.SIG_DFL) # allow ctrl+c to quit

    VPNIndicatorApplet()

if __name__ == "__main__":
    main()
