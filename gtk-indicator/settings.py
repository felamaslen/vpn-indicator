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
SERVER_URL = os.environ.get('SERVER_URL')

