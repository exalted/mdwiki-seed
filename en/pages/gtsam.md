# GTSAM


## Installation

```bash
sudo apt-get install libtbb-dev
git clone https://bitbucket.org/gtborg/gtsam/
cd gtsam
mkdir build
cd build
cmake .. -DCMAKE_CXX_COMPILER=/usr/bin/clang++-3.6
make
sudo make install
```

### Install the matlab toolbox

In the **build** directory:
```bash
cmake .. -DGTSAM_INSTALL_MATLAB_TOOLBOX=T -DGTSAM_TOOLBOX_INSTALL_PATH:PATH=/usr/local/MATLAB/R2015b/toolbox -DCMAKE_CXX_COMPILER=/usr/bin/clang++-3.6
make
sudo make install
sudo find /usr/local/MATLAB -iname '*stdc++*' -delete
```
