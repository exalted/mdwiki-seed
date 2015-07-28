# hlCANopen

[team_diana/hlCANopen](https://github.com/team_diana/hlCANopen)

hlCANopen is a C++ library that provides an high level interface for the CANopen protocol.

The library is used in [diana_powertrain](diana_powertrain.md)

## Ubuntu

### Dependencies

#### folly

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
autoreconf -ivf
./configure
make
make check
sudo make install
```
