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

SERVER_SSH = {
        'ip': os.environ.get('SERVER_SSH_IP'),
        'port': os.environ.get('SERVER_SSH_PORT'),
        'key': os.environ.get('SERVER_SSH_KEY'),
        'user': os.environ.get('SERVER_SSH_USER'),
        'cmd': os.environ.get('SERVER_SSH_CMD')
    }

REQUEST_INTERVAL = 5.0

