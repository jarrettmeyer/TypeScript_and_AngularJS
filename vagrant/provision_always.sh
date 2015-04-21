#!/usr/bin/env bash

echo Running provision_always.sh script...

echo Starting nginx server...
service nginx start
cd /home/vagrant/TypeScript_and_AngularJS

#
# Vagrant provision scripts automatically get run as sudo. Bower will complain
# about this, so we need to tell it to shut up with the allow-root switch.
#
echo Installing npm packages...
npm install
bower install --allow-root

echo Building application...
grunt build:dev

echo Done.
