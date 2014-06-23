# Rover First Setup

This page contains an how-to to bring up the rover after major system break, hardware failure or apocalyptic events.

## Bring the rover up after ubuntu installation

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
