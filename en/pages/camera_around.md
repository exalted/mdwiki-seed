# Camera Around 

This script is used to make the cameras move around while taking a few shot for the point cloud.

run the script with:

```bash
rosrun camera_around camera_around_node.py
```

then, in an another terminal, invoke the service with rosservice call

```bash
rosservice call /camera_around/start_sequence "{pan_min: 0.0, pan_max: 0.0, pan_step: 0.0, tilt_min: 0.0, tilt_max: 0.0, tilt_step: 0.0}"
```

the  value are expressed in radians, the step indicates how much the camera will move in every step.
The service does some checking in order to make sure that the values are valid. True is returned by the service if the value are ok.

Once the service is called, the pantilt will start to move from the (pan_min, tilt_min) position, then go
back and forth until all the position are reached.

A list of the positions will appear in the camera_around_node output.

Currently the script disable the cameras pubblication. In order to re-enable it, call the enable_stream service:
```bash
rosservice call /camera0/enable_stream true
rosservice call /camera1/enable_stream true
```

##Good Parameters:
The camera angles in radiant are 1.05 for the pan, and 0.8 for the tilt.
So, considering the limits of the pantilt, this parameters will make the cameras take snapshot of the front area without overlaps:

```bash
rosservice call /camera_around/start_sequence "{pan_min: -1.0, pan_max: 1.0, pan_step: 1.0, tilt_min: -0.4, tilt_max: 0.4, tilt_step: 0.8}"
```

