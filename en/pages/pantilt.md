# Pantilt unit

## Run
Run the pantilt with:
```bash
cd ~/catkin_ws/src/vision/src/flir_pantilt_d46
roslaunch launch/diana.launch
```

Move the pantilt using the bash script:
```bash
cd /home/diana/Scripts
```
This will set the pantilt to 0.4 pan and 0 tilt:
```bash
./movePantilt.sh 0.4 0 
```

Move the pantilt manually:

```bash
rostopic pub /ptu/cmd sensor_msgs/JointState "header:
  seq: 0
  stamp: {secs: 0, nsecs: 0}
  frame_id: 
name: ['pan', 'tilt']
position: [$pan_target, $tilt_target]
velocity: [0.1, 0.1]
effort: [0]"
```

## Troubleshooting

Sometime the connection computer-pantilt controller does not work. You can attempt this command in order to enstablish a connection:


```bash
for a in $(seq 0 1000); do 
  echo 'a' > /dev/ttyUSB0
done
```

Then try to restart the connection.
