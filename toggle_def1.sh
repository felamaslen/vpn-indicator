#!/bin/bash

# toggle IP rule to set the LAN's default gateway to the London PTP VPN link

filedir=$(dirname $0)
envfile="$filedir/.env"

source $envfile

lan4_subnet=$SUBNET_LAN
lan6_subnet=$SUBNET_LAN6
table=$VPN_TABLE
rule4_def1="from $lan4_subnet table $table"
rule6_def1="from $lan6_subnet table $table"
ip="/sbin/ip"

function enable_def1 {
    $ip rule add $rule4_def1
    $ip -6 rule add $rule6_def1
}
function disable_def1 {
    $ip rule del $rule4_def1
    $ip -6 rule del $rule6_def1
}

status4=$(ip rule ls | grep $table | grep $lan4_subnet)
status6=$(ip -6 rule ls | grep $table | grep $lan6_subnet)

if [[ $status4 && $status6 ]]; then
    echo "Disabling default gateway redirect..."
    disable_def1
else
    echo "Enabling default gateway redirect..."
    enable_def1
fi

exit 0

