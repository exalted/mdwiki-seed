# Howto create a vm #
The purpose of this article is describing the process of building a vm for system testing.

## Descriptions ##
This guide is used to build a vm. The process includes network configuration, storage creating, and memory allocating. 

## Definition & Concept ##
- domain~VM name
- storage pool (could me a directory file or block device)
 To generate storage pool to store iso images, type this following command.
`virsh`


## Manage/Configure lvm 
This part is used to describe the process of setting up block device to use for vm. If you build a workstation
```
```

### set-up the storage pool
```
virsh pool-define-as <pool-name> --type dir --target <directory_to_store>
virsh pool-autostart <pool-name> 
#or
virsh pool-start <pool-name>
```
To verify your pool
virsh pool-list --all --details

## Steps to build the vm ##
0. To pre-check if libvirt is installed and enabled, type the following command 

1. Create the storage pool
2. Name the vm domain



## Manage kvm ##
Type `virh list` to view current running vm

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



