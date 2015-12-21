# Rover Amalia - Network

## Connect to the rover

The rover starts with a static eth connection on eth1, with these parameters

||||
|---|---|
|ip| 192.168.1.2 |
|netmask| 255.255.255.0 |

```bash
sudo ip addr add 192.168.1.3/24 dev enp2s0f1
sudo ip link set up dev enp2s0f1
```
