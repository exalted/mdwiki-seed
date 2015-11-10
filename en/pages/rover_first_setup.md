# Rover First Setup

This page contains an how-to to bring up the rover after major system break, hardware failure or apocalyptic events.

## Install udev rules

write this into */etc/udev/rules.d/suspension_port.rules*

```bash
SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", ATTRS{serial}=="AD01UXQC", SYMLINK+="suspension_port", MODE="0777"
```

and this in /etc/udev/rules.d/pantilt_port.rules

```bash
SUBSYSTEM=="tty", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", ATTRS{serial}=="A9012XPP", SYMLINK+="pantilt_port", MODE="0777"
```

## Bring the rover up after ubuntu installation

Warning: this section is old, do not use it 

Note: please make sure to have the following tools installed:

* git
* wget

```bash 
sudo apt-get install git wget
```

- - -


Download the bootstrap script from github:
```bash
cd ~
wget https://raw.github.com/team-diana/scripts/master/bootstrap.sh
```


run the script, follow the istructions
```bash 
bootstrap.sh
```

during the script, you will be asked to insert the link that contains third party packages.
the scripts expect a zip file that contains the directory with third party packages.
the directory must contains this files:

```bash
rover-packages
├── flycapture2-2.5.3.4-amd64-pkg.tgz
├── p7432_linux30_drvsrc.tar
└── p9116_linux30_drvsrc.tar
```

This directory can be found in gdrive under Condivise/Elettronica/Rover(3.0) 2013/ros-packages
In gdrive select download then pass the link to the script.
