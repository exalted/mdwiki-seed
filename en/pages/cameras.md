#Cameras

Warning: 
ALWAYS remember to check the CPU temperature while dealing with the cameras. Image processing is intensive and the ventilation is not optimal. 
Open a terminal, and after logging in with ssh, check the temperatures with the ```watch sensors``` command

See also [stereo_vision](stereo_vision.md)

##Camera Node
The camera node is inside */home/diana/catkin_ws/src/vision/src/pgr_camera* and [here](https://github.com/team-diana/ros.pgr_camera) on github.

The parameters are:
```bash
--serials [list of camera serial number separated by space] 
--sync-serials [list of camera serial number separated by space] 
```

## Connection

See [Cameras - Connection](cameras_connection.md)

**Dynamic reconfigure**
```c++
/*
      * If Shutter and Gain are both set to auto, then auto exposure
      * will tune each one to maintain a constant exposure at each pixel.
      *
      * If only one of Shutter/Gain is set to auto, then that value
      * will be tuned to enforce the constant exposure value at each
      * pixel, while the other value is not changed.
      *
      * If both Shutter and Gain are set to manual, then auto exposure
      * has no effect.
      *
      */
```


##Commands

Start the cameras:
First enter in the directory where launch files are contained (or just source the setup.bash file in WORKSPACE/devel):
```bash 
cd ~/catkin_ws/src/vision/src/pgr_camera/launch 
```
Then launch one of the launch files:

```bash
#Launch all the camera, with left and right synchronized
roslaunch all.launch
#Launch all the camera, with left and right not synchronized
roslaunch allWithoutSync.launch
#Launch only the stereo cameras, with left and right synchronized
roslaunch stereoOnly.launch
#Launch only the stereo camera, with left and right not synchronized
roslaunch stereoOnlyWithoutSync.launch
```

```bash
Run the processor for Point Clound and other PCL processing:
ROS_NAMESPACE=stereo rosrun stereo_image_proc stereo_image_proc
```

```bash
Show disparity:
rosrun image_view disparity_view image:=/stereo/disparity
```

Show pointcloud image:
```bash
rosrun pcl_ros convert_pointcloud_to_image input:=/stereo/points2 output:=/stereo/depth/cloud_image
rosrun image_view image_view  image:=/stereo/depth/cloud_image
```

##Intrinsics

Intrinsics file (*.ini) are used by image processors in order to know the camera intrinsics values..
They are obtained via the calibration process.
Currently the ini file are inside the */home/diana/catkin_ws/devel/lib/pgr_camera* directory. 
Each file is named in this format: *intrinsicsCAMERA_SERIAL_NUMBER.ini* e.g. : intrinsics13201007.ini


##Useful links
http://wiki.ros.org/stereo_image_proc

##The dropped packets problem

Shitty flycapture API calls a callback every time a new frame is available, even if the frame has errors (blank lines or bands). Point gray's example app does not show wrong frame since it pools the frame from the camera, and it is able to discard frame with errors.
The solution seems this http://www.ptgrey.com/support/kb/index.asp?a=4&q=354&ST=linux+gige
Load settings with:
```bash
sudo sysctl -p
```
Even if there are less bad frames, problems still appear.

little packet dimension dramatically increase the number of errors. In order to obtail less error
assure that the camera have the maximum packet size (9000). The path must support such a big 
[[http://it.wikipedia.org/wiki/Maximum_Transmission_Unit |mtu]] size.
In order to do this, set the interface mtu to 9000:
```bash 
sudo ifconfig eth1 mtu 9000
```
Camera packet size can be changed using FlyCap2 gui or dynamic reconfigure as soon as it will be ready.

GigE vision protocol is based on UDP packets. Increasing buffer size in /etc/sysctl.conf 
should reduce packet loss  (also remember to reduce the framerate)
Useful links:
http://answers.splunk.com/answers/7001/udp-drops-on-linux
http://fasterdata.es.net/host-tuning/linux/
http://stackoverflow.com/questions/2090850/specifying-udp-receive-buffer-size-at-runtime-in-linux
http://wwwx.cs.unc.edu/~sparkst/howto/network_tuning.php
http://sd.wareonearth.com/~phil/jumbo.html
