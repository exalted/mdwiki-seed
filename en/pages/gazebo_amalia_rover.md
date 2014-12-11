# Amalia Rover Gazebo Model

![Amalia Rover Gazebo Model](/uploads/amalia_rover_gazebo_model.png)

In order to control the vehicle more easily, use the [generic_input_controller](generic_input_controller.md) 

## Components
---
The rover is defined with [xacro](wiki.ros.org/xacro) and [sdf 1.5](http://osrf-distributions.s3.amazonaws.com/sdformat/api/1.5.html).

![Amalia Rover components](/uploads/gazebo-composable-models.png)

## Plugins
---
The enabled plugins are:

- Skid Steer
  virtualizes all the powertrain.
- Multicamera
  virtualizes the stereo cameras.
- Depth Camera
  virtualizes the ToF camera.
- [Joint Commander](joint_commander_plugin.md)
  virtualizes the pan-tilt.
- [Dynamixel Motor Plugin](gazebo_amalia_rover_suspensions.md)
  virtualizes the active suspensions system.

Some plugins are not avilable in the standard packages, and should be manually installed. See [Gazebo - Team Diana Plugins](gazebo.md#Team_Diana_Plugins)

## SDF
---
The sdf file is available [here](https://raw.githubusercontent.com/team-diana/gazebo-models/master/models/rover_amalia/model.sdf) and is ready to be used in Gazebo.

![Amalia Rover gazebo model with joints](/uploads/amalia_rover_gazebo_model_joints.png)

*the sdf model with its joints*


## URDF 
The urdf is available [here](https://raw.githubusercontent.com/team-diana/gazebo-models/master/urdf/rover_amalia/model.urdf)

The urdf is us created using [team-diana/sdf2urdf](https://github.com/team-diana/sdf2urdf)

warning: the converter is not completed yet, and the converted urdf model still needs manual modifications.

In order to use the urdf model, use the [launch files](https://github.com/team-diana/gazebo-models/tree/master/urdf/rover_amalia)

```bash
# Run the robot_state_publisher:
roslaunch robot_state_publisher.launch

# Run rviz with the same urdf model:
roslaunch rviz.launch
```

The **rover amalia** model publishes all the joint_states but **map -> odom** and  **base_footprint -> rover_amalia_chassis**
which can be published with **static_transform_publisher**

```bash
rosrun tf static_transform_publisher 0 0 0 0 0 0 map odom $(( 1000/30)) &
rosrun tf static_transform_publisher 0 0 0 0 0 0 base_footprint base_link $(( 1000/30)) &
python2 odom_publisher.py odom base_footprint /rover_amalia/odom
python2 imu_tf_broadcaster.py base_link rover_amalia_chassis /imu_data
```

## Troubleshooting

### Check that the tree of transform has only one root:

```bash
rosrun tf view_frames
# View the created pdf document:
evince frames.pdf
```
the expected tf tree should look like this:

![gazebo tr tree](/uploads/gazebo_tf_tree.png)

## Videos

[Rover Amalia - Gazebo and Rviz](https://drive.google.com/file/d/0B095UfSp5Q4USUNadGhFNHdpZk0/view?usp=sharing)

