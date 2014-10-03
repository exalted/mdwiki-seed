# Status

## TODO:
- Add new ToF camera
  The [SR4500](sr4500.md) Tof Camera must be tested with the existing [ros swissranger_camera driver](http://wiki.ros.org/swissranger_camera) built upon [libmesasr](http://www.mesa-imaging.ch/support/driver-downloads/). If the camera does not work out of the box, or there are some missing features, fork the existing package. 
- Add new IMU 
  The [MTi-300](mti-300.md) AHRS must be tested with the existing [ros xsens_driver](http://wiki.ros.org/xsens_driver).
- Add suspensions to the Gazebo rover model
  Virtualize the suspension system under Gazebo, adding a JointPositionController in ros_control. See [gazebo amalia rover - suspensions](gazebo_amalia_rover_suspensions.md).
- Add pantilt to Gazebo model
  Virtualize the pantilt unit, using two revolute joints for pan and tilt. Add a ros service for command and a topic for status (just like the [flir_pantilt_D46 node](https://github.com/team-diana/vision/tree/master/src/flir_pantilt_d46))
- Improve physics and aspect of Gazebo model
  Set the right inertials for each body that composes the rover, possibly improve the graphical aspect of the rover model
- Add CAN support for engines
  Implement a ROS node that controls the [Solo Whistle](solo-whistle.md) via the [cPCI-7841.md](cpci-7841.md) card.  
- Add slope-cost to path planning
  Modify the sbpl library in order to include slope as a parameter of the cost function. See [pathfinding](pathfinding.md) and [pathfinding-planning](pathfinding-planning.md).
- Improve the suspension node
  Test it on the rover once the new chassis will be ready, write unit tests, update matlab model
- Add Wheel Odometry
  Write a node that provides odometry data from the wheel. This is not straightforward since the wheel relative position is not fixed, so distance travelled by each wheel is completly different.
  This is needed for [EKF](http://wiki.ros.org/robot_pose_ekf?distro=indigo)
- Add Obstacle detection
  Obstacle can now be overtaken manually, controlling active suspensions and powertrain. Once an obstacle has been detected, the operator must change the angle of each suspension arm in order overtake the obstacle while maintining the rover stable. At the sametime the powertrain must be activated. This process can be done autonomously by the rover using the [DEM](http://en.wikipedia.org/wiki/Digital_elevation_model) provided by the ToF camera. 
- Add support for suspension stiffness
  [DEM](http://en.wikipedia.org/wiki/Digital_elevation_model) can also be used to adjust suspensions stiffness in anticipation of the quality of the terrain of the chosen path. First, the ToF camera provides the height of the terrain in front of the rover with a very high resolution. This data can be used to evaluate how much the terrain is flat (for instance, this can be done using the standard deviation of each point in a small section of the [pointcloud](http://www.amphioxus.org/sites/default/files/images/content/mtrainier/mtRainierMesh-Matlab-500px.jpg)). Then stiffness can be simply changed sending a message to the suspension controller. The process should be repeated every periodically at some travlled distance.
- Stereo and ToF camera fusion
  See [Stereo and ToF camera fusion](tof-stereo-integration.md)
- ToF **only** odometry
  ToF camera can also be an odometry source using ICP algorithm.
  [LOAM](http://wiki.ros.org/loam_back_and_forth)
  [A Visual Odometry Method Based on the SwissRanger SR4000](http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB8QFjAA&url=http%3A%2F%2Fwww.dtic.mil%2Fcgi-bin%2FGetTRDoc%3FAD%3DADA536272&ei=OJsuVLeVKYv2O8a0gKAN&usg=AFQjCNHqcpQLWMbagIyiyJivyKWYg8NGrg&sig2=RhI6Re3Oa39PMrAs28C0Xg&bvm=bv.76802529,d.ZWU)
