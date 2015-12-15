# Tutorial - Image Processor, stereo odometry and Point Cloud 

In this tutorial we will use common tools that are used during [SLAM](slam.md) development and testing.

## Requirements

- a [ros bag file](rosbag.md) with the stereo cameras images in it. Otherwise it is possible to use directly a *calibrated* stereo camera.
- the [vo2](vo2.md) package
- the [octomap](octomap.md) related packages 

## 1. Play the rosbag file

Start roscore

```bash
roscore
```

Since we are using recorded data, we need to sync with the time of the recorded data (see [rosbag](rosbag.md)

```bash
rosparam set /use_sim_time true
```

then play the file

```bash
rosbag play filename.bag
```

## 2. Start the image stereo proc

Note: this and further commands assume that the image are published as /stereo/left/image_raw and /stereo/right/image_raw

```bash
ROS_NAMESPACE=/stereo rosrun stereo_image_proc stereo_image_proc
```

you should see new topic like \*/image_rect, /stereo/disparity and/stereo/pointcloud2

now, check out the [disparity image](stereo_disparity.md): 

```bash
rosrun image_view disparity_view image:=/stereo/disparity
```

You should see an image like this:

![](http://openqbo.org/wiki/lib/exe/fetch.php?w=200&media=qbo_apps:ros_pack:qbo_camera:tutorials:good_disparity.jpg)

You can change the parameters of *stereo\_image\_proc* with rqt\_reconfigure:

```bash
rosrun rqt_reconfigure rqt_reconfigure
```

Select stereo_image_proc and try change the parameters, more informations will be available at [stereo disparity]((stereo_disparity.md))

## 3. Setup the transform tree.

The rover moves, but also its part moves too (think about the pantilt) 

So we need to tell all the process in ROS how the robot parts positions and rotations (transforms). See also [tf](tf.md) 

We will write a simple python script that will publish the required tf for us. These tf are made up and entirely static (fixed).

save this file in static_tf_pub.py:

```python
#!/usr/bin/env python2
from __future__ import print_function
import rospy
import tf
import time
import signal
import numpy as np
from sensor_msgs.msg import JointState
from time import sleep

JOINT_STATE_TOPIC='/rover_amalia/joint_states'

br1 = tf.TransformBroadcaster()
br2 = tf.TransformBroadcaster()

def publish_tf():
    v = (0, 0, 0)
    q1 = tf.transformations.quaternion_from_euler(0, 0, 0)
    q = q1 
    br1.sendTransform(v,
                    q,
                    rospy.Time.now(),
                    "odom",
                    "map")
    q1 = tf.transformations.quaternion_from_euler(np.pi*3/2, 0, np.pi*3/2)
    q = q1 
    br2.sendTransform(v,
                    q,
                    rospy.Time.now(),
                    "stereo",
                    "base_link")

RUN = True 

def stop(signal, frame):
    global RUN
    RUN = False

if __name__ == "__main__":
    rospy.init_node("urdf_static")
    signal.signal(signal.SIGINT, stop)
    while RUN:
        publish_tf()
        sleep(0.01)
```


then run it with

```bash
python2 static_tf_pub.py
```

Now check that the tf **tree** is correct. Generate a pdf file using:

```bash
rosrun tf view_frames
```

Check out the new *frames.pdf*, it should appear like this:

![](/uploads/exampletf.png)

If it is ok proceed to the next step.


## 4. Run vo2

viso2ros can be run with this launch file

*viso2.launch* : 

```xml
<launch>
<node pkg="viso2_ros" type="stereo_odometer" name="vo2" 
    args="stereo:=stereo image:=image_rect _publish_tf:=true" output="screen">
  <rosparam>
    max_features: 20
    half_resolution: 1
  </rosparam>
</node>
</launch>
```

Start it with roslaunch:

```
roslaunch viso2.launch
```

## 5. Run octomap

As for viso2ros we will use a luanch file:

*octomap_stereo.launch* :

```xml
<?xml version="1.0"?>
<launch>
<node pkg="octomap_server" type="octomap_server_node" name="octomap_server">
    <param name="resolution" value="0.05" />

    <!-- fixed map frame (set to 'map' if SLAM or localization running!) -->
    <param name="frame_id" type="string" value="map" />

    <!-- maximum range to integrate (speedup!) -->
    <param name="sensor_model/max_range" value="5.0" />
    
    <param name="height_map" value="true" />

    <param name="latch" value="false" />
    <!-- data source to integrate (PointCloud2) -->
    <remap from="cloud_in" to="/stereo/points2" />

</node>
</launch>
```

```bash
roslaunch octomap_stereo.launch
```

## 6. Run rviz

Start rviz with 

```bash
rosrun rviz rviz
```

Add the following visualizations (click 'add' on the left side, then go to the 'topics' tab):

- Two image window where you can see the image stream from the two cameras
- A pointcloud 2 visualization of /stereo/points2
* A visualization of the /odom topic 
* A visualization of the octomap output



