# Howto create a vm #
The purpose of this article is describing the process of building a vm for system testing.

## Descriptions ##
This guide is used to build a vm. The process includes network configuration, storage creating, and memory allocating. 

## Definition & Concept ##
- domain~VM name
- storage pool (could me a directory file or block device)
 To generate storage pool to store iso images, type this following command.
`virsh`

## Steps to build the vm ##
0. Pre check if libvirt is installed and enabled.
1. create the storage pool
2. Naming vm domain



## Manage kvm ##
`virh list` to view current running vm

* Remove the VM ##
```
virsh shutdown <vm-name>
```
* Destroy the VM



# Set up network interface #



## Method 2 - Using the virt-install ##
```
# start a vim build to control via vnc 
virt-install --name <virtual-name> --ram 2048 --file=/home/anpham/images/ --vnc --cdrom=/
```

# System testing #

Define how you are going to build your system
- block device
- cpu count
- memory usuage
- usb passing through
- pci passing through
- method communicate with vm (console, ssh, vnc)



