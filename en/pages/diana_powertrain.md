# diana_powertrain

This package controls the wheel motors via the CANopen protocol and the [elmo drivers](elmo_solo_whistle.md)

It requires [hlCANopen](hlcanopen.md)

## exports

In order to use the package the following export is necessary in order to find boost and folly:

```bash
export LD_LIBRARY_PATH=/opt/boost/lib/:/usr/local/lib
```


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

See the [command ref](http://www.elmomc.com/support/manuals/MAN-SIMCR.pdf) document for a list of available commands. Some commands returns also a result.
It is possible to run the motor only by using the shell, using these commands for instance:

```bash
MO=1
JV=10000
BG
```

then use 

```bash
MO=0
```

to turn off the motor.

## test

In order to test that the elmo and motors are working, run the **test_motor** node:

```bash
./test_motor -i 11 12 13 14
```

the values following **-i** are the can ID of the motors to test.
this command will ask you question in order to check that everything is ok.

If you want to skip the question use the **-n** flag:

```bash
./test_motor -n -i 11 12 13 14
```

If you encounter an error, try to use the shell in order to get more info. 
Eventually you can also use the elmo [composer](http://www.elmomc.com/products/composer-description-contents-main.htm) tool and a RS-232-usb adapter if you suspect that something is wrong with the CAN interface.

## info dump

You can dump the informations about the motors with:

```bash
./dump_elmo_info -i 11 12 13 14
```


## Control the motors with a joystick

the /set\_velocity command accepts a Twist message type, so it can be used with [generic_input_controller](generic_input_controller.md). Follow the link and see the related section.


