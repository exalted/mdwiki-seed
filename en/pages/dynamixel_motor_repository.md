# Dynamixel Motor

Note: old. See [dynamixel_motor](dynamixel_motor.md)

[github repository](https://github.com/team-diana/suspension)

## Notes
---

publishes the arm joint, using both ADC input and sensors of dynamixel

## Related ROS names

### Topics:
- */state 
- */arm/state
- */wrench
- */command
- */arm/command
- /ADC/suspension

### Joints
- hub_p_l
- hub_p_r
- hub_f_l
- hub_f_r

## Drivers

In the *dynamixel_driver* directory. Written in ***python***, using pyserial
