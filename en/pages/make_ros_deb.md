# make_ros_deb

make_ros_deb is a simple utility that help generating a .deb package from a ROS package source.

make_ros_deb is written in **ruby**. 

## Install

See the README.md

Make sure your PATH includes the executable installed in your gem directory.

## Example

*make_ros_deb* will create a debian directory with all the files required in order to build the package.

Specify the name of the package, the directory containing the *package.xml* file (with all the source as well).
It is also possible to specify extra compilr option using the **cmake_extra_options** flag

```bash
make_ros_deb.rb create --deb_package_name "ros-indigo-gazebo-ros-control" --source_dir gazebo_ros_control --maintainer_id 'Vincenzo Giovanni Comito (ubuntu repository key) <clynamen@gmail.com>' --cmake_extra_options CMAKE_CXX_COMPILER=/usr/bin/g++-5,BOOST_ROOT=/opt/boost 
```

then, build the package with:

```bash
dpkg-buildpackage
```

The created package will be present in the upper directory (..)
