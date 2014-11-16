# Status

## TODO:
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
  [DEM](http://en.wikipedia.org/wiki/Digital_elevation_model) can also be used to adjust suspensions stiffness in anticipation of the quality of the terrain of the chosen path. First, the ToF camera provides the height of the terrain in front of the rover with a very high resolution. This data can be used to evaluate how much the terrain is flat (for instance, this can be done using the standard deviation of each point in a small section of the [pointcloud](http://www.amphioxus.org/sites/default/files/images/content/mtrainier/mtRainierMesh-Matlab-500px.jpg)). Then stiffness can be simply changed sending a message to the suspension controller. The process should be repeated every periodically at some travelled distance.
- Stereo and ToF camera fusion
  See [Stereo and ToF camera fusion](tof-stereo-integration.md)
- ToF **only** odometry
  ToF camera can also be an odometry source (using ICP algorithm for instance).
  [depth_camera_only_slam](depth_camera_only_slam.md)
  [LOAM](http://wiki.ros.org/loam_back_and_forth)
  [A Visual Odometry Method Based on the SwissRanger SR4000](http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB8QFjAA&url=http%3A%2F%2Fwww.dtic.mil%2Fcgi-bin%2FGetTRDoc%3FAD%3DADA536272&ei=OJsuVLeVKYv2O8a0gKAN&usg=AFQjCNHqcpQLWMbagIyiyJivyKWYg8NGrg&sig2=RhI6Re3Oa39PMrAs28C0Xg&bvm=bv.76802529,d.ZWU)
- Implement a unique language for SDF and URDF files [python only]
  SDF and URDF file are very similar, but they have different specificatons, so, even if converters exist, the user must maintain two different version for the same model. 
  A good solution would be to write a script in python that generates a model that can be then serialized to an SDF or URDF file. This would also allow conditional expressions, simpler math (cfr. xacro), and fast prototyping.
- Improve [generic_input_controller](https://github.com/team-diana/generic_input_controller) [python only]
  Keyboard, generic joints, limit must be added
- Improve [ros_status_cli](https://github.com/team-diana/ros_status_cli) [python only]
  Add key for cleaning dead nodes, add ERROR logs count
- NEW: do color camera calibration, get left-camera--color-camera transform.
