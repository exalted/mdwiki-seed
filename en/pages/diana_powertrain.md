# diana_powertrain

This package controls the wheel motors via the CANopen protocol and the [elmo drivers](elmo_solo_whistle.md)

It requires [hlCANopen](hlcanopen.md)


## diana\_powertrain\_node

this node handles all the four motors. 

#### topics

  * set\_velocity 
    sets the velocity of all the four motors. x is the linear velocity, z the angular velocity

#### services

  * enable\_motors
    enable or disable the four motors

  * set\_control\_word
    set a new control word for all the four motors. Possible values are

       *  SHUTDOWN
       *  SWITCH_ON
       *  DISABLE_VOLTAGE
       *  QUICK_STOP
       *  DISABLE_OPERATION
       *  ENABLE_OPERATION
       *  FAULT_RESET

  * get\_control\_word
    retrieve the current control word.

  * set\_operation\_mode
    set the operation mode. Possible values are:

      *  NO_MODE 
      *  PROFILE_POSITION
      *  PROFILED_VELOCITY
      *  TORQUE_PROFILED
      *  HOMING 
      *  INTERPOLATION_POSITION 

  * get\_operation\_mode
    retrieve the current operation mode.

## shell

The shell executable open a shell via the CAN interface on the remote elmo.

```bash
# start a shell on elmo with id=14
shell -i 14
```

When a prompt appears, the shell is ready to be used. Otherwise a connection with the elmo cannot be enstablished.

#### Example commands:

```bash
# starts the motor
mo=1 
# set the velocity to 10000 JV value
jv=10000
# start the motor
bg
```

## Control the motors with a joystick

the /set\_velocity command accepts a Twist message type, so it can be used with [generic_input_controller](generic_input_controller.md). Follow the link and see the related section.


