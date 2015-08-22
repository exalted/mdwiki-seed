# Team Diana Ubuntu Repository

## Add the repository

```bash
sudo add-apt-repository "deb http://46.101.222.199/ trusty main"
```

then update the package list

```bash
sudo apt-get update
```

## Setup

In order to setup a ubuntu repository follow [this guide](https://www.digitalocean.com/community/tutorials/how-to-use-reprepro-for-a-secure-package-repository-on-ubuntu-14-04)

## Hosting

We currently host our repository on digital ocean. 

## Add packages

You can add **debian** (.deb) packages to the repository.
Debian packages are really complex and requires many details in order to be built.
In order to overcome this problem, since many ROS packages share the same build procedure (i.e. cmake .. && make && make install ) a simple ruby gem was created in order to create a **.deb** package

See [make_ros_deb](make_ros_deb.md)

## reprepro commands examples

Remove packages: 

```bash
# inside the repository directory
reprepro -b . remove trusty boost-build boost-all-dev boost-all
```

Add packages:

```bash
# inside the repository directory
reprepro -b . includedeb trusty ../*.deb
```
