# Cameras - Connection

## Static IP Address

Each camera starts with a static ip address in the **169.254.x.x** range.

Set up a static ip address for your computer:

*replace enp2s0f1 with the name of your ethernet interface*

```bash
sudo ip link set enp2s0f1 up
sudo ip addr add dev enp2s0f1 169.254.153.222/16
```
