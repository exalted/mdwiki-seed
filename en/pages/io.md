# IO subsystem

## adc
This node do all the IO low level operation for the other system
In the private parameters inside the code you can choose what kind of inputs you want to read, leave the standard one for normal use.
Launch with ```rosrun adc adc```
This node create the service ```/Moving_Status``` that enable the full 6dof motion registration but also more noise and error. And the parameters ```/adc/filtered_imu``` that enable the low pass filter, this may create oscillation in the suspension.

[ADC package](adc_package.md)


## imu_filter_madgwick
Launch with ```rosrun imu_filter_madgwick imu_filter_node```
Is possible to set the gain of the filter with the parameter ```/ImuFilter/gain```, the best is around 0.01

The algorithm used to filter the imu raw data is described [here](http://www.x-io.co.uk/res/doc/madgwick_internal_report.pdf)


Both this node is mandatory to execute the suspension_controller_node and in order to visualize the pose of the rover in rviz.

## [CAN](can.md)

The [CAN](http://en.wikipedia.org/wiki/Controller_area_network) interface controls the motors. 

## dynamixel_driver

### dynamixel_io

(from  [1 - Mattia Marenco Thesis](io.md#Links) )

**methods:**
  - set_angle_limits_cw: 
    sets the limits angle of the actuator (0 ÷ 4095). 
    If min > max, then the positive rotation direction is inverted. 
    if min = max = 0, then the speed mode is activated
  - set_torque_enabled: if set to 0 then the suspension are not activated
    and free to rotate.
  - set_p_gain
  - set_i_gain 
  - set_d_gain 
    respectively set the PID parameters (0 ÷ 255)
  - set_position: 
    works only in position mode. Must be angle between 0 and 2pi
  - set_speed: 
    if in position mode, set the rotation speed (only positive)
    in speed mode, actually sets the speed (positive or negative)
  - set_torque_limit:
    sets the torque limit (0 ÷ 1023 which corresponds to a maximum of 6Nm for the motor)
  - get_position: 
    gets the current position
  - get_speed: 
    gets the current speed
  - get_voltage: 
    gets the current power source voltage in Volt

** [joint_controller](joint_controller.md) and joint_position_controller **

**methods:**
 - process_command: 
  send position in the **unreduced** reference system
 - process_arm_command: 
  send position in the **reduced** reference system


## Links
  1. Definizione dell’elettronica di bordo e del firmware del rover per esplorazione lunare D.I.A.N.A. - Mattia Marenco

