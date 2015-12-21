# Archlinux

ROS packages for Archlinux are available on [AUR](http://aur.archlinux.org/). If a package is missing, check out [ros-build-tools](https://aur.archlinux.org/packages/ros-build-tools/) in order to create a PKGBUILD for the new package.


## python2 vs python3

Arch switched to python3 so there may be some annoying problems since ROS still uses python2 and many libraries are not yet available to python3. 

So install python2 and related packages (pip2, ipython2), then remember these notes:

**Build with python2**

```bash
catkin_make -DPYTHON_EXECUTABLE=/usr/bin/python2
```

**Use python2 in this shell and childrens**

```bash
# put this in a file called use_python2.sh
# then do
# source use_python2.sh
# every time you need to use python2 everywhere

#!/bin/bash

dir_name="/tmp/bin"
if [[ ! -d $dir_name ]]; then
  mkdir $dir_name
  ln -s /usr/bin/python2 $dir_name/python
  ln -s /usr/bin/python2-config $dir_name/python-config
fi
export PATH=/tmp/bin:$PATH
```

## PKGBUILD

When you want to install a ROS package in your system you can create a PKGBUILD using this script:

**mk-ros-pkgbuild.py**
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

# code taken from bchretien/arch-ros-stacks, slightly modified in 
# order to just create PKGBUILD

from __future__ import print_function

import catkin_pkg.package
from optparse import OptionParser
import sys
import os
import os.path
import urllib3
import yaml
import re
from collections import OrderedDict
from termcolor import colored, cprint
import pickle

class Package(object):
  BUILD_TEMPLATE = """# Script generated with import_catkin_packages.py
pkgdesc="ROS - %(package_name)s"
pkgname='ros-custom-%(package_name)s'
pkgver='%(package_version)s'
pkgrel='1'
_pkgver_patch=%(package_version_patch)s
arch=('any')
license=('MIT')
md5sums=('SKIP')
provides=('%(package_name)s')
conflicts=('%(package_name)s')

build() {
  # Use ROS environment variables
  source /usr/share/ros-build-tools/clear-ros-env.sh
  [ -f /opt/ros/%(distro)s/setup.bash ] && source /opt/ros/%(distro)s/setup.bash

  # Create build directory
  [ -d ${srcdir}/build ] || mkdir ${srcdir}/build
  cd ${srcdir}/build

  # Build project
  cmake  ../../%(src_dir)s \\
        -DCMAKE_BUILD_TYPE=Release \
        -DCATKIN_BUILD_BINARY_PACKAGE=ON \
        -DCMAKE_INSTALL_PREFIX=/opt/ros/indigo \
        -DPYTHON_EXECUTABLE=/usr/bin/python2 \
        -DPYTHON_INCLUDE_DIR=/usr/include/python2.7 \
        -DPYTHON_LIBRARY=/usr/lib/libpython2.7.so \
        -DSETUPTOOLS_DEB_LAYOUT=OFF
  make
}

package() {
  cd "${srcdir}/build"
  make DESTDIR="${pkgdir}/" install
}
"""
  def generate(self, package_name, src_dir):
    pkgbuild = self.BUILD_TEMPLATE % {
      'distro': "indigo",
      'arch_package_name': package_name,
      'package_name': package_name,
      'src_dir': src_dir,
      'package_version': 0.1,
      'package_version_patch': 0.1,
      }
    return pkgbuild




def generate_pkgbuild(package_name, src_dir):
  """
  Generate a PKGBUILD file for the given package and the given ROS distribution.
  """
  #output_directory = os.path.join(directory, package.name)
  output_directory = './'

  # If the directory does not exist, create it
  if not os.path.exists(output_directory):
    os.mkdir(output_directory)

  pkgbuild_file = os.path.join(output_directory, 'PKGBUILD')

  print('Generating PKGBUILD for package %s'
        % (colored(package_name, 'green', attrs=['bold']) ))

  # Write PKGBUILD file
  with open(pkgbuild_file, 'w') as pkgbuild:
    package = Package()
    r = package.generate(package_name, src_dir)
    pkgbuild.write(r)


def main():
    if len(sys.argv) != 3:
        help_string = """  
Usage:
mk-ros-pkgbuild pkg_name src_dir
              """
        print(help_string)
        sys.exit(-1)
    else:
        generate_pkgbuild(sys.argv[1], sys.argv[2])

if __name__ == '__main__':
  main()
```

Usage example:

```bash
# in the main package directory:
mkdir build
cd build
mk-ros-pkgbuild.py PACKAGE_NAME  ..
```

**If you think a package is useful for everyone, put it on AUR**

## Links

[ROS Indigo - Arch Installation](http://wiki.ros.org/indigo/Installation/Arch)

