#Setup remote ROS connection

ROS runs on network so it is possible to run multiple nodes on different machines. 

There must be only **one** master.

There are two important environment variables:
  * ROS_MASTER_URI
    this is the ip/hostname of the unique master. e.g http://xxx.xxx.xxx.xxx:11311/
  * ROS_HOSTNAME
    this is the ip/hostname of the current machine (i.e. it may be different from ROS_MASTER_URI). e.g. "xxx.xxx.xxx.xxx"

ROS_MASTER_URI should be the same across all over the network. While ROS_HOSTNAME should be the ip address of the single remote computer.

## Rover
Make sure that the hostname is set to the actual ip of the rover:
```bash
ROS_HOSTNAME="xxx.xxx.xxx.xxx" # ip address of the rover
ROS_MASTER_URI=http://xxx.xxx.xxx.xxx:11311/ # ip address of the rover, where the master is located.
```

## Remote Machine
The machine **must** have all port available. Make sure there are no firewall with netcat.
In the remote machine is behind a router, all (well, most) ports must be forwarded toward it. It is possible to do it putting the rover in [DMZ](http://en.wikipedia.org/wiki/DMZ|DMZ)
The rover **must** have this environment variables exported:

```bash
ROS_HOSTNAME=xxx.xxx.xxx.xxx # actual remote machine ip address (e.g. different computer than the rover)
ROS_MASTER_URI=http://xxx.xxx.xxx.xxx:11311/ # ip address of the rover, where the master is located.
```

If it is not possible to have all ports opened, it is possible to use **openvpn**.

## Troubleshooting

#### I see that the topics are listed on the remote machine, but the output is empty when I run *rostopic pub /topic_name*

This is due to a wrong ROS_HOSTNAME. Make sure that the machine that publishes the topic has exported ROS_HOSTNAME to **its** ip address.
It is also possible that the remote machine cannot access the local machine. Check if the ports can be opened with netcat, in both direction.

#### I changed the terminal and the topic does not seem to work anymore

Remember that when you do

```bash
export ENV_VARIABLE=value
```

you are exporting that environment variable **only** for that terminal instance. You have to run that everytime!

## Links
http://wiki.ros.org/ROS/NetworkSetup
http://wiki.ros.org/Robots/TurtleBot/Network%20Setup
