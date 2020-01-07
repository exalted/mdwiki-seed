#  Steps to get the vagrant kvm running
1. Download the vagrant package to install. Please double check the vagrant supported version. Check the vagrant libvirt project for details)

```
# install kvm/libvirt.
apt-get build-dep vagrant ruby-libvirt
apt-get install qemu libvirt-daemon-system libvirt-clients ebtables dnsmasq-base
apt-get install libxslt-dev libxml2-dev libvirt-dev zlib1g-dev ruby-dev
```

2. Install vagrant plugin.
`vagrant plugin install vagrant-libvirt`
libvirt providers only work with this plugin
**note** Sometimes, the plugin install is broken and has the dependency conflict, type in `vagrant plugin expunge` to reinstall the plugin.

3.  

