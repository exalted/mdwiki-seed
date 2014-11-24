# generic_input_controller

[github repository](https://github.com/team-diana/generic_input_controller)

This is a configurable python script that can handle multiple topics (such as joint, twist) using multiple sources (such as keyboard, joystick)

## How to start

Run the script providing a config file:

```bash
python2 controller.py --config=keyboard_wasd.yaml
```

a window will open and keyboard commands will be reiceived when the window is focused.

Press **q** or **Exit** to stop the execution.

## Configuration

Configuration is provided by a yaml file, which is parsed by python and directly instaintiate the right classes.

Example yaml configuration file:

**example.yaml**

```yaml
SkidSteer1:
  type: skidsteer
  source:
    Keyboard2Axis1:
      type: keyboard2axis
      x_axis: [d, a]
      y_axis: [s, w]
      x_axis_multiplier: 1
      y_axis_multiplier: 1
  speed: 0.1
  rot_multiplier: -1
  skid_steer_topic: /rover_amalia/cmd_vel
  clamp_below: 0.2
Joint2Dof1:
  type: joint2dof
  source:
    JoyJoystickCommander2:
      type: joyjoystick
      x_axis_index: 2
      y_axis_index: 3
  x_range: [3.14, -3.14] # invert axis
  y_range: [1.8, -1.8] # invert axis
  clamp_below: 0.01
  topic_name: /ptu/cmd
```

In this file two topics will be controlled:

-*/rover_amalia/cmd_vel*
  is a twist topic controlled by the keyboard. the corrisponding key to a virtual joystick axis are defined inside the Keyboard2Axis1 object.

-*/ptu/cmd*
  is a joint with 2 DoF controlled via a joystick. ROS publishes each joystick axis in a vector. The index is used to indicate the corresponding axis.

## How to find the joystick commands
Run the *show_pressed.py* script, which will show the currently pressed buttons and the value of each axis.

## Provided configuration files:

- sixaxis.yaml
  Made for the diana rover gazebo model. Can be used with a ps3 sixaxis controller
- keyboard_wasd.yaml
  Made for the diana rover gazebo model. Can be used with the keyboard. 


