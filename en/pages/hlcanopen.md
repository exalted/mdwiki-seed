# hlCANopen

[team-diana/hlCANopen](https://github.com/team-diana/hlCANopen)

hlCANopen is a C++ library that provides an high level interface for the CANopen protocol.

The library is used in [diana_powertrain](diana_powertrain.md)

## Ubuntu

### Dependencies

#### folly

boost 1.58 must be installed

in order to install folly:


```bash
sudo apt-get install \
    g++ \
    automake \
    autoconf \
    autoconf-archive \
    libtool \
    libboost-all-dev \
    libevent-dev \
    libdouble-conversion-dev \
    libgoogle-glog-dev \
    libgflags-dev \
    liblz4-dev \
    liblzma-dev \
    libsnappy-dev \
    make \
    zlib1g-dev \
    binutils-dev \
    libjemalloc-dev \
    libssl-dev \
    libiberty-dev

git clone https://github.com/facebook/folly.git
cd folly/folly
export LD_LIBRARY_PATH=/opt/boost/lib/:/usr/local/lib:$LD_LIBRARY_PATH
autoreconf -ivf
./configure CPPFLAGS="-I/opt/boost/include -I/opt/local/include" LDFLAGS="-L/opt/boost/lib -L/opt/local/lib" CXX=/usr/bin/g++-5
make
make check
sudo make install
```
