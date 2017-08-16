#!/usr/bin/python3
# flake8: noqa

"""
Main app entry point
"""

import os
import gi
gi.require_version('Gtk', '3.0')
gi.require_version('AppIndicator3', '0.1')

from gi.repository import Gtk as gtk
from gi.repository import AppIndicator3 as appindicator

import signal
from threading import Timer
import urllib.request
import socket

from settings import APPINDICATOR_ID, SERVER_URL

dir_path = os.path.dirname(os.path.realpath(__file__))
icon_success = dir_path + '/success.svg'
icon_fail = dir_path + '/fail.svg'
icon_unknown = dir_path + '/unknown.svg'

def vpn_is_connected(indicator):
    try:
        response = urllib.request.urlopen(SERVER_URL, timeout=1)

        response_string = response.read().decode('utf-8')

        status_connected = response_string == 'vpn'

        indicator.set_icon(icon_success if status_connected else icon_fail)

    except (socket.timeout, urllib.error.URLError):
        # some error occurred with the request
        # try again after changing the icon to unknown
        indicator.set_icon(icon_unknown)

    timer = Timer(5.0, vpn_is_connected, [indicator])
    timer.start()

def build_menu():
    menu = gtk.Menu()
    item_quit = gtk.MenuItem('Quit')
    item_quit.connect('activate', quit)
    menu.append(item_quit)
    menu.show_all()
    return menu

def quit(source):
    gtk.main_quit()

def main():
    """ main entry point """
    signal.signal(signal.SIGINT, signal.SIG_DFL) # allow ctrl+c to quit

    indicator = appindicator.Indicator.new(APPINDICATOR_ID, 'ldnvpnind', appindicator.IndicatorCategory.SYSTEM_SERVICES)
    indicator.set_status(appindicator.IndicatorStatus.ACTIVE)
    indicator.set_icon(icon_fail)
    indicator.set_menu(build_menu())

    vpn_is_connected(indicator)

    gtk.main()

if __name__ == "__main__":
    main()
