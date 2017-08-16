"""
Main settings configuration
"""
# flake8: noqa

import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

APPINDICATOR_ID = 'vpnindicator'

SERVER_IP = os.environ.get('SERVER_IP')
SERVER_PORT = os.environ.get('SERVER_PORT')

SERVER_URL = 'http://%s:%s' % (SERVER_IP, SERVER_PORT)

