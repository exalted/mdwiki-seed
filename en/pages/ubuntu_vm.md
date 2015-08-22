# Ubuntu - VM

## Pre-installed ROS VMs

[nootrix](http://nootrix.com/) offers some VirtualBox VM image that can be used to 
quickly get a working environment with ROS

## Network

### Bridged adapter

When you want to use devices like cameras or the ToF that requires an ethernet connection,
add a VirtualBox adapter in bridged adapter mode:

![bridged adapter](http://i.stack.imgur.com/d8ZLF.png)

## 3D acceleration

if 3D acceleration does not work you can use software acceleration

```bash
export LIBGL_ALWAYS_SOFTWARE=1
```
