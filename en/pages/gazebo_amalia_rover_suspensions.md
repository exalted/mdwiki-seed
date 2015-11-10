# gazebo_ros_dynamixel_motor_plugin [package]

[team-diana/gazebo_ros_dynamixel_motor_plugin](https://github.com/team-diana/gazebo_ros_dynamixel_motor_plugin)

![virtual test bench](/uploads/amalia_rover_leg_test_bench.png)

*a single leg, controlled by the plugin*

This Gazebo plugins virtualizes a [dynamixel motor](dynamixel_mx-64.md).

## Messages and Services

### Subscribes:
```bash
/suspension1/command  # Float64 - target value of the angle of the suspension
```

### Publishes:
```bash
*/suspension1/state # Float64 - this topic outputs the current value of the angle of the suspension
 ```

### Provides services:
```bash
*/set_speed
*/set_torque_limit
*/torque_enable
```

## Example configuration

```xml
<plugin filename="libgazebo_ros_dynamixel_motor.so" name="dynamixel_motor">
  <joint>test_bench_leg</joint>
  <robotNamespace>robot_name</robotNamespace>
  <base_topic_name>my_leg</base_topic_name>
  <default_pos>1.2</default_pos>
  <default_torque_limit>100</default_torque_limit>
</plugin>
```

This will make both topics and services to have a **/robot_name/my_leg/** prefix.

The starting position will be at 1.2 radians.

---

## TODO:
Evaluate if all /arm/ related topic should be removed.
