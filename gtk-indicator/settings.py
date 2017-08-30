"""
Main settings configuration
"""
# flake8: noqa

import os
from os.path import join, dirname
from dotenv import Dotenv

dotenv = Dotenv(os.path.join(os.path.dirname(__file__), '.env'))
os.environ.update(dotenv)

APPINDICATOR_ID = 'vpnindicator'

SERVER_IP = os.environ.get('SERVER_IP')
SERVER_PORT = os.environ.get('SERVER_PORT')

SERVER_URL = 'http://%s:%s' % (SERVER_IP, SERVER_PORT)

SERVER_AUTH_USERNAME = os.environ.get('SERVER_AUTH_USERNAME')
SERVER_AUTH_PASSWORD = os.environ.get('SERVER_AUTH_PASSWORD')

REQUEST_INTERVAL = 5.0
HTTP_TIMEOUT = 0.5

