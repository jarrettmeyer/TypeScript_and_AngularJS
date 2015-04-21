Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.provision :shell, path: "./vagrant/provision.sh"
    config.vm.provision :shell, path: "./vagrant/provision_always.sh", run: "always"
    config.vm.network :forwarded_port, host: 8080, guest: 8080
    config.vm.synced_folder ".", "/home/vagrant/TypeScript_and_AngularJS"
end
