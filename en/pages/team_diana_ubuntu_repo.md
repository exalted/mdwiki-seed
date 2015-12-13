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

## Build package

#### commands: 

Create the directory with all the files needed for building a debian package.
```bash

make_ros_deb.rb create --deb_package_name "libhlcanopen" --source_dir hlCANopen --maintainer_id 'Vincenzo Giovanni Comito (ubuntu repository key) <clynamen@gmail.com>' --cmake_extra_options CMAKE_CXX_COMPILER=/usr/bin/g++-5,BOOST_ROOT=/opt/boost --trace
```

Build the package using the data of the previous directory
```bash
dpkg-buildpackage
```

The package is created in the parent directory.
