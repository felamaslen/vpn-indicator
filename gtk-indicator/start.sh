#!/bin/bash

filedir=$(dirname $0)

cd $filedir || exit 1

. env/bin/activate

python3 main.py

exit 0

