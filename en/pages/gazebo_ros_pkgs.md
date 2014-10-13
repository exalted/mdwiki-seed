
[github repository](https://github.com/team-diana/gazebo_ros_pkgs)

## gazebo_plugins

### joint_commander

The joint commander plugin allows to command one or more joint via ROS **messages**.

This is the syntax for adding the plugin:

```xml
<model>
  <!-- ... -->
  <plugin filename="libgazebo_ros_joint_commander.so" name="joint_commander">
    <robotNamespace>test</robotNamespace>
    <jointSet1>joint_set_1</jointSet1>
    <jointSet1Joint1>first_revolute_joint_name</jointSet1Joint1>
    <jointSet1Joint1>second_revolute_joint_name</jointSet1Joint1>
    <jointSet2>joint_set_2</jointSet1>
    <jointSet2Joint1>another_joint_name</jointSet1Joint1>
  </plugin> 
</model>
```
The previous definition will create two [**sensor_msgs/JointState**](http://docs.ros.org/api/sensor_msgs/html/msg/JointState.html) topics:
  - joint_set_1
    with two DoF
  - joint_set_2
    with only one DoF

It is possible to add any number of joint. 

Each joint set must follow the *jointSetX* and *jointSetXJointY* sintax.

TODO:
  - Add velocity support

### suspension_actuator

  - not implemented yet

## use gazebo plugins

In order to use the gazebo plugins, you can build a package for your package manager, or changing the **GAZEBO_PLUGIN_PATH** variable:

```bash
export GAZEBO_PLUGIN_PATH=/path/to/plugin/libraries:$GAZEBO_PLUGIN_PATH
```
*/path/to/plugin/libraries* must contain the *.so files for each new plugin.

Hint: You can run gazebo in verbose mode in order to detect problems:

```bash
rosrun gazebo_ros gazebo world.sdf --verbose
```
