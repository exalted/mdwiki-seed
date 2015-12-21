# dynamixel_motor

[team-diana/dynamixel_motor](https://github.com/team-diana/dynamixel_motor)

## Description

This node handle the four [dynamixel MX-64T](dynamixel_mx-64.md) servomotors. 
It is a ros node that sends message on the serial port in order to activate the motor and make them to turn to the desired position.

A motor is often controlled by a single **joint_controller**. It is a python interface with different implementations (e.g. *joint_position_controller* or *joint_torque_controller*)
The configuration of each controller is written in a **.yaml** file that is read in a roslaunch file

*example .yaml file*

```yaml
motore_1_controller:
    controller:
        package: dynamixel_controllers
        module: joint_position_controller
        type: JointPositionController
    joint_name: motore_1_joint
    joint_speed: 0.5
    motor:
        id: 1
        init: 0
        min: 0
        max: 4095

motore_2_controller:
    controller:
        package: dynamixel_controllers
        module: joint_position_controller
        type: JointPositionController
    joint_name: motore_2_joint
    joint_speed: 0.5
    motor:
        id: 2
        init: 0
        min: 4095
        max: 0
```

the parameters listed in the .yaml file are then accessed using rospy methods (rospy.get_param)

The package has a modular design. It has two principal nodes:

- **controller_manager** 
  This node opens the serial port, and instantiates one or more **joint_controller**. It exposes tree services (**start**, **stop**, **restart**) so that it is possible
  to manually activate/deactivate a single **joint_controller** via the ROS **service** interface.
* **controller_spawner**
  A command line utility that uses ROS **service** interface in order to spawn controllers. It calls the services exposed by **controller_manager**.
  It just need the name of the controller. It then uses the configuration (provided by **rosparam**) in order to know the module and script of the controller.

## Motor configuration

Some configuration is stored in the **ROM** (writable, actually) of the motor and can be changed using the **set_servo_config.py** script.

## multi-turn mode

This is a feature in the updated MX-64T firmware that allow to perform multiple rotation (previously only one rotation was possible)

In order to use multi-turn mode the cw and ccw limits must be set to **4095** (See the [MX-64T documentation](http://support.robotis.com/en/product/dynamixel/mx_series/mx-64.htm) )
