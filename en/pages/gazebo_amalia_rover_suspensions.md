# Gazebo Amalia Rover Suspensions - Planning

Using [ros control](http://gazebosim.org/tutorials/?tut=ros_control) properly, it is possible to fully isolate sensors, actuators and PID controllers.

This allows easier testing, hot code swapping for controllers and virtualization under Gazebo.

![ros control](https://bitbucket.org/osrf/gazebo_tutorials/raw/default/ros_control/Gazebo_ros_transmission.png)

First,  rangefinders and [imu](http://answers.ros.org/question/12430/modelling-sensorsimu-in-gazebo/) must be added in gazebo and made available as ros interfaces for the control manager.
Then a PID controller can be written as a plugin for ControlManager.

## Links
---

[Gazebo - ROS Control](http://gazebosim.org/tutorials/?tut=ros_control)
