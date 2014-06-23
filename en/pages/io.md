# IO subsystem

## Nodes

### adc
This node do all the IO low level operation for the other system
In the private parameters inside the code you can choose what kind of inputs you want to read, leave the standard one for normal use.
Launch with ```rosrun adc adc```
This node create the service ```/Moving_Status``` that enable the full 6dof motion registration but also more noise and error. And the parameters ```/adc/filtered_imu``` that enable the low pass filter, this may create oscillation in the suspension.


### imu_filter_madgwick
Launch with ```rosrun imu_filter_madgwick imu_filter_node```
Is possible to set the gain of the filter with the parameter ```/ImuFilter/gain```, the best is around 0.01

The algorithm used to filter the imu raw data is described [here](http://www.x-io.co.uk/res/doc/madgwick_internal_report.pdf)


Both this node is mandatory to execute the suspension_controller_node and in order to visualize the pose of the rover in rviz.

### CAN
The [CAN](http://en.wikipedia.org/wiki/Controller_area_network) interface controls the motors. 
