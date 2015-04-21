#!/usr/bin/env bash
curl -sL https://deb.nodesource.com/setup_0.12 | bash -
apt-get update -y
apt-get dist-upgrade -y
apt-get install -y nginx nodejs

#
# Install global npm packages
#
echo Installing global npm packages...
npm install -g bower grunt-cli karma-cli typescript

#
# Configure nginx
#
echo Configuring nginx server...
rm /etc/nginx/nginx.conf
ln -s /home/vagrant/TypeScript_and_AngularJS/vagrant/nginx.conf /etc/nginx/nginx.conf
service nginx restart

