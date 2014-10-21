# Joint Commander Plugin

[team-diana/gazebo_ros_pkgs  gazebo_ros_joint_commander.cpp](https://github.com/team-diana/gazebo_ros_pkgs/blob/develop/gazebo_plugins/src/gazebo_ros_joint_commander.cpp)

![amalia rover turret](/uploads/amalia_rover_turret.png)

This is a configurable plugin that creates topic for joint control.

For instance, this plugin controls the pantilt in the [rover model](gazebo_amalia_rover.md).

## Example Configuration
---

```xml
 <plugin filename="libgazebo_ros_joint_commander.so" name="joint_commander">
    <robotNamespace>robot_name</robotNamespace>
    <jointSet1>/ptu/cmd</jointSet1>
    <jointSet1Joint1>pan</jointSet1Joint1>
    <jointSet1Joint2>tilt</jointSet1Joint2>
    <jointSet2>/arm</jointSet2>
    <jointSet2Joint1>first</jointSet2Joint1>
    <jointSet2Joint2>second</jointSet2Joint2>
    <jointSet2Joint3>third</jointSet2Joint3>
 </plugin> 
```

where jointSetXJointY refers to a *revolute joint* controlled via the topic specified by jointSetX
The X, Y values must be in *order*.

With this configuration, 2 topics will be created

- /robot_name/ptu/cmd
  a [**sensor_msgs/JointState**](http://docs.ros.org/api/sensor_msgs/html/msg/JointState.html) topic that accepts **2** position values

- /robot_name/arm
  a [**sensor_msgs/JointState**](http://docs.ros.org/api/sensor_msgs/html/msg/JointState.html) topic that accept **3** position values

Any number of set and joints per set can be specified.

