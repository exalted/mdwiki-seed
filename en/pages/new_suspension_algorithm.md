# New Suspension Algorithm


## Visualization


start roscore

```bash
roscore
```

#### Rover

Use the model urdf file available in [team-diana/gazebo-models](https://github.com/team-diana/gazebo-models)

https://github.com/team-diana/gazebo-models/tree/master/urdf/rover_amalia

In order to use it, download both the _model.urdf_ file and _robot\_state\_publisher.launch_
Then run the robot\_state\_publisher:

```bash
roslaunch  robot_state_publisher.launch
```

Then start rviz with this launch file:

_rviz.launch_ :
```bash
<launch>
    <node name="rviz" pkg="rviz" type="rviz"  args="--ogre-log"/>
    <param name="robot_description" command="cat model.urdf" />
</launch>
```

```bash
roslaunch rviz.launch
```

in rviz, add the model (Add -> RobotModel):

![add robot model](/uploads/new_suspension_algorithm_1.png)

While the joints of the suspension must be controlled by the script, all the other joints must be fixed. 
Run this script in order to set up the other joints:

_urdf\_static.py_ :

```python
#!/usr/bin/env python2
from __future__ import print_function
import rospy
import tf
import time
import signal
from sensor_msgs.msg import JointState
from time import sleep

JOINT_STATE_TOPIC='/rover_amalia/joint_states'

def publish_joint(name):
    joint_publisher = rospy.Publisher(JOINT_STATE_TOPIC, JointState, queue_size=10)
    msg = JointState()
    now = rospy.get_rostime()
    msg.header.stamp = now
    msg.name = [name]
    msg.position = [0]
    joint_publisher.publish(msg)

def publish_tf():
    v = (0, 0, 0.35)
    q = (0, 0, 0, 1)
    br = tf.TransformBroadcaster()
    br.sendTransform(v,
                    q,
                    rospy.Time.from_sec(time.time()),
                    'rover_amalia_chassis',
                    'map')

joints=(
"rover_amalia_turret_pan",
"rover_amalia_turret_tilt",
"rover_amalia_leg_shaft_f_r",
"rover_amalia_leg_shaft_f_l",
"rover_amalia_leg_shaft_b_r",
"rover_amalia_leg_shaft_b_l",
"rover_amalia_joint_turret_base_turret",
"rover_amalia_joint_chassis_rangefinder_front",
"rover_amalia_joint_chassis_rangefinder_rear",
"rover_amalia_hinge_depth_camera_link"
)

RUN = True 

def stop(signal, frame):
    global RUN
    RUN = False

if __name__ == "__main__":
    rospy.init_node("urdf_static")
    signal.signal(signal.SIGINT, stop)
    while RUN:
        [publish_joint(j) for j in joints]
        publish_tf()
        sleep(0.2)
```

```bash
python urdf_static.py
```

You should be able to see this now:

![static urdf](/uploads/new_suspension_algorithm_2.png)

Only wheels and arms are missing now.

Here it is an example script that controls the arms:

```python
#!/usr/bin/env python2
from __future__ import print_function
import rospy
from sensor_msgs.msg import JointState
import math
from time import sleep
import signal
import sys

JOINT_STATE_TOPIC='/rover_amalia/joint_states'

class SuspensionArm(object):
    def __init__(self, joint_name, sign):
        self.joint_name = joint_name
        self.sign = sign
        self.angle_rad = 0
        self.joint_publisher = rospy.Publisher(JOINT_STATE_TOPIC, JointState, queue_size=10)

    def publish(self):
       msg = JointState()
       now = rospy.get_rostime()
       msg.header.stamp = now
       msg.name = [self.joint_name]
       msg.position = [self.angle_rad]
       self.joint_publisher.publish(msg)

    def set_angle_rad(self, angle_rad):
       self.angle_rad = self.sign * angle_rad


RUN=True

def stop(signal, frame):
    global RUN
    RUN = False

if __name__ == "__main__":
    rospy.init_node("example_suspension_publisher")
    arms = [SuspensionArm('rover_amalia_joint_chassis_leg_f_r', -1), 
            SuspensionArm('rover_amalia_joint_chassis_leg_f_l', -1), 
            SuspensionArm('rover_amalia_joint_chassis_leg_b_r', 1), 
            SuspensionArm('rover_amalia_joint_chassis_leg_b_l', 1)]
    signal.signal(signal.SIGINT, stop)
    angle = 0
    sign = 1
    while RUN:
        if angle >= math.pi/2 or angle < 0:
            sign = -sign
        angle += sign * 0.01
        for arm in arms:
            arm.set_angle_rad(angle)
            arm.publish()
        sleep(0.1)
```

When run, you should see the arms moving from 0 to 90 degrees:

![moving arms](/uploads/new_suspension_algorithm_3.png)


#### Terrain

Use this script to generate a terrain visualization

_generate\_terrain.py_ :

```python
#!/usr/bin/env python2
from __future__ import print_function
import numpy as np
import noise
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
from visualization_msgs.msg import Marker
import rospy
import sys
import random


size=(40, 40)

def create_map(octave=1, persistence=0.5, lacunarity=2.0):
    octave = float(octave)
    x = np.arange(1, 1+size[0])
    y = np.arange(1, 1+size[1])
    x, y = np.meshgrid(x, y)

    z = np.zeros(size)
    rand=int(random.randint(1, 1000))
    print("seed: {}".format(rand))
    for x1, y1 in zip(np.nditer(x), np.nditer(y)):
        freq=30.0
        z[x1-1, y1-1] = noise.snoise3(x1/freq, y1/freq, rand, int(octave), persistence, lacunarity)

    x -= size[0]/2
    y -= size[1]/2

    return x, y, z

def plot(x, y, z): 
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    print("SHAPES ARE {} {} {} ".format(x.shape, y.shape, z.shape))
    ax.plot_surface(x, y, z, rstride=1, cstride=1, cmap=cm.coolwarm)
    print(z.shape)
    plt.show()

def ask_parameters():
    ans = raw_input("Insert octave or 'exit':\n")
    if ans == 'exit' or ans == 'q':
        sys.exit(0)
    octave = float(ans)
    ans = raw_input("Insert persistence:\n")
    persistence = float(ans)
    ans = raw_input("Insert lacunarity:\n")
    lacunarity = float(ans)
    return octave, persistence, lacunarity

class MapPublisher(object):
    def __init__(self):
        self.publisher =  rospy.Publisher('/heightmap', Marker, queue_size=100000)

    def publish(self, x, y, z):
        x = x.reshape(1, -1)[0]
        y = y.reshape(1, -1)[0]
        z = z.reshape(1, -1)[0]
        marker_count = 0
        z_range = (max(z)-min(z))
        for i in range(1, np.size(z)): 
            m = Marker()
            m.header.frame_id = 'map'
            m.ns = 'heightmap'
            m.id = i
            m.type = Marker.CUBE
            m.action = Marker.ADD
            scale = 1.0/10
            scale_z = scale*5
            m.pose.position.x  = x[i] * scale
            m.pose.position.y  = y[i] * scale
            m.pose.position.z  = z[i] * scale_z
            m.pose.orientation.x  = 0
            m.pose.orientation.y  = 0
            m.pose.orientation.z  = 0
            m.pose.orientation.w  = 1
            m.scale.x = scale
            m.scale.y = scale
            m.scale.z = scale
            m.color.r = z[i]/z_range 
            m.color.g = 1-z[i]/z_range
            m.color.b = 0
            m.color.a = 1
            marker_count += 1
            self.publisher.publish(m)
        print("published {} markers".format(marker_count))

if __name__ == "__main__":
    rospy.init_node("heightmap_generator")
    map_publisher = MapPublisher()
    QUIT = False
    while not QUIT:
        x, y, z = create_map(octave=1, persistence=1, lacunarity=2)
        map_publisher.publish(x, y, z)
        #plot(x, y, z)
        ans = raw_input("enter 'q' to quit or enter for new map:\n")
        QUIT = ans == 'q'
```

Add the _/heightmap_ topic in rviz (Add -> By topic -> /heightmap -> Marker)

Increase the Queue size for that topic (e.g. 10000)

Start the script and press enter for a new terrain:

![add robot model](/uploads/new_suspension_algorithm_4.png)
