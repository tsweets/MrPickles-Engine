#!/bin/sh

echo "Starting Reverse Proxy"
exec java ${JAVA_OPTS} -noverify -XX:+AlwaysPreTouch -Djava.security.egd=file:/dev/./urandom -cp /app/resources/:/app/classes/:/app/libs/* "org.beer30.mrpickles.bff.ReverseProxyApplication"  "$@"