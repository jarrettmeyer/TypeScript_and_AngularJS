#!/usr/bin/env sh

apt-get update -y
apt-get dist-upgrade -y
apt-get install -y nginx

#
#
#
rm /etc/nginx/nginx.conf
ln -s /home/vagrant/TypeScript_and_AngularJS/vagrant/nginx.conf /etc/nginx/nginx.conf
service nginx restart

