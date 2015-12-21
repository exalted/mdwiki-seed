
[github repository](https://github.com/team-diana/gazebo_ros_pkgs)

## gazebo_plugins

- [Joint Commander](joint_commander_plugin.md)
  Configurable plugin that allow to control one or more joint via ros messages.
- [Dynamixel Motor Plugin](gazebo_amalia_rover_suspensions.md)
  Virtualize a dynamixel motor, such as [Dynamixel MX-64](dynamixel_mx-64.md)

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
