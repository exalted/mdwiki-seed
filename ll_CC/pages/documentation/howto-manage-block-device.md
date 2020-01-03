** Note ** the color is optional and does not affect success of your task
# wiping the block device
```
lsblk # find the block device
dd if=/dev/zero of=/dev
```

# formating drive
`lsblk` locate the name of device
# umount the device
umount /dev/sd


**note** : lsblk | grep /dev/sdc /
# mounting 
lsblk -f
Look for the system type to mount and the name of block device in the format `/dev/sdx`
```
# create a folder so that you can mount your device to.
#mkdir -p /mnt/<name_of_your_block>
mkdir -p /mnt/usb1
id -u # view current id of your host  
mount -t <formatsystem> -o - /dev/sdx /mnt/usb1

```
