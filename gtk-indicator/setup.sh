#!/bin/bash

filedir=$(dirname $0)

cd $filedir || exit 1

[ -d env ] && rm -rf env

virtualenv -p $(which python3) env || exit 1

. env/bin/activate

pip install -r requirements.txt

deactivate

exit 0

