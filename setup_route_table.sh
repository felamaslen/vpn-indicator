#!/bin/bash

##
## add routing table information
##

filedir=$(dirname $0)
envfile="$filedir/.env"

source $envfile

lan4_subnet=$SUBNET_LAN
lan6_subnet=$SUBNET_LAN6

gateway4=$GATEWAY_LAN
gateway6=$GATEWAY_LAN6

vpn_remote4=$VPN_REMOTE_IP
vpn_remote6=$VPN_REMOTE_IP6

table=$VPN_TABLE
rt_tables="/etc/iproute2/rt_tables"
metric=200

ip="/sbin/ip"

table_exists() {
    cat $rt_tables | grep $table >/dev/null \
        && return 0 || return 1
}

insert_table() {
    echo "$metric $table" | tee -a $rt_tables
}

delete_table() {
    sed -i "/$metric $table/d" $rt_tables
}

del_routes() {
    $ip route flush table $table
}

setup() {
    status=0

    success=" [SUCCESS]"
    fail=" [FAIL]"

    echo -n "Making sure table $table exists..."
    (table_exists || insert_table) \
        && echo $success || (echo $fail && return 50)

    echo -n "Flushing routes in $table..."
    del_routes \
        && echo $success || (echo $fail && return 51)

    echo -n "Adding ipv4 default route via VPN link..."
    $ip route add default via $vpn_remote4 table $table \
        && echo $success || (echo $fail && status=1)
    
    echo -n "Adding ipv4 LAN route..."
    $ip route add $lan4_subnet via $gateway4 table $table \
        && echo $success || (echo $fail && status=$(($status + 2)))

    echo -n "Adding ipv6 default route via VPN link..."
    $ip -6 route add default via $vpn_remote6 table $table \
        && echo $success || (echo $fail && status=$(($status + 4)))
    
    echo -n "Adding ipv6 LAN route..."
    $ip -6 route add $lan6_subnet via $gateway6 table $table \
        && echo $success || status=$(($status + 8))

    return $status
}

echo "Setting up table and adding routes..."

echoerr() { echo "$@" 1>&2; }

err_msg_gw4="[ERROR] Error setting default IPv4 gateway to VPN"
err_msg_gw6="[ERROR] Error setting default IPv6 gateway to VPN"
err_msg_lan4="[ERROR] Error setting IPv4 LAN route"
err_msg_lan6="[ERROR] Error setting IPv6 LAN route"

status=0
setup

case $status in
    50)
        echoerr "[FATAL] Error appending routing table to $rt_tables"
        ;;
    51)
        echoerr "[FATAL] Error flushing routing table $table"
        ;;
    1)
        echoerr $err_msg_gw4
        ;;
    2)
        echoerr $err_msg_lan4
        ;;
    4)
        echoerr $err_msg_gw6
        ;;
    8)
        echoerr $err_msg_lan6
        ;;
    3)
        echoerr $err_msg_gw4
        echoerr $err_msg_lan4
        ;;
    5)
        echoerr $err_msg_gw4
        echoerr $err_msg_gw6
        ;;
    7)
        echoerr $err_msg_gw4
        echoerr $err_msg_lan4
        echoerr $err_msg_gw6
        ;;
    9)
        echoerr $err_msg_gw4
        echoerr $err_msg_lan6
        ;;
    11)
        echoerr $err_msg_gw4
        echoerr $err_msg_lan4
        echoerr $err_msg_lan6
        ;;
    12)
        echoerr $err_msg_gw6
        echoerr $err_msg_lan6
        ;;
    13)
        echoerr $err_msg_gw4
        echoerr $err_msg_gw6
        echoerr $err_msg_lan6
        ;;
    14)
        echoerr $err_msg_lan4
        echoerr $err_msg_gw6
        echoerr $err_msg_lan6
        ;;
    15)
        echoerr $err_msg_gw4
        echoerr $err_msg_lan4
        echoerr $err_msg_gw6
        echoerr $err_msg_lan6
        ;;
esac

exit $status

