# Amalia Rover Gazebo Model

![Amalia Rover with visible joints](/uploads/amalia_rover_gazebo_model.png)

## Components
---
The rover is defined with [xacro](wiki.ros.org/xacro) and [sdf 1.5](http://osrf-distributions.s3.amazonaws.com/sdformat/api/1.5.html).

![Amalia Rover components](/uploads/gazebo-composable-models.png)

## Plugins
---
The enabled plugins are:

- Skid Steer
- Multicamera
- Depth Camera

## TODO

- [add suspensions](gazebo_amalia_rover_suspensions.md)
- add pantilt

## SDF
---
The sdf file is available [here](https://raw.githubusercontent.com/team-diana/gazebo-models/master/models/rover_amalia/model.sdf) and is ready to be used in Gazebo.

## URDF 
The urdf is available [here](https://raw.githubusercontent.com/team-diana/gazebo-models/master/urdf/rover_amalia/model.xml)

warning: the SDF and URDF model currently are **not** synced.

In order to show the URDF model in **rviz**, download the model.xml file and in the same directory copy this file 

*show.xml*
```xml
<launch>
  <arg name="gui" default="true" />
  <param name="robot_description" command="cat ./model.xml" />
  <param name="use_gui" value="$(arg gui)"/>
  <node name="joint_state_publisher" pkg="joint_state_publisher" type="joint_state_publisher" >
    <rosparam param="source_list">[/ptu/state, joint_states, /motore_1_controller/joint_states, /motore_2_controller/joint_states, /motore_3_controller/joint_states, /motore_4_controller/joint_states]</rosparam>
  </node>
  <node name="robot_state_publisher" pkg="robot_state_publisher" type="robot_state_publisher" >
    <param name="use_gui" value="$(arg gui)"/>
    <remap from="robot_description" to="robot_description" />
  </node>
</launch>
```

Then, launch the file and run **rviz**

```bash
roslaunch ./show.xml
# in an another terminal:
rosrun rviz rviz
```

