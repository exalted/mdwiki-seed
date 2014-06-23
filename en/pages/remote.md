#Setup remote ROS connection

## Rover
Make sure that the hostname is set to the actual ip of the rover:
```bash
ROS_HOSTNAME="xxx.xxx.xxx.xxx"
```

## Remote Machine
The machine **must** have all port available. Make sure there are no firewall with netcat.
In the remote machine is behind a router, all (well, most) ports must be forwarded toward it. It is possible to do it putting the rover in [DMZ](http://en.wikipedia.org/wiki/DMZ|DMZ)
The rover **must** have this environment variables exported:

```bash
ROS_HOSTNAME=xxx.xxx.xxx.xxx # remote machine actual ip address
ROS_MASTER_URI=http://xxx.xxx.xxx.xxx:11311/
```

If it is not possible to have all ports opened, it is possible to use **openvpn**.

## Links
http://wiki.ros.org/ROS/NetworkSetup
http://wiki.ros.org/Robots/TurtleBot/Network%20Setup
