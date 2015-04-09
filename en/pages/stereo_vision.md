# Stereo Vision

See also [cameras](cameras.md) and [stereo_vision_slam](stereo_vision_slam.md)

## Run both cameras with calibration files:

In the same directory of the executable, have these files:

```bash
intrinsics13029237.ini  
intrinsics13062807.ini  
stereoOnly.launch
```
Get the content of the intrinsics file from the [cameras](cameras.md) page.

The content of stereo_only.launch is

```xml
<launch>
  <param name="ROS_NAMESPACE" value="stereo" />
  <node name="camera_node" pkg="pgr_camera" type="pgr_camera_node" output="screen" cwd="node" args="--serials 13062807 13029237 -P">
    <remap from="/camera13062807/image_raw" to="/stereo/left/image_raw"/>
    <remap from="/camera13062807/camera_info" to="/stereo/left/camera_info"/>
    <remap from="/camera13062807/set_camera_info" to="/stereo/left/set_camera_info"/>
    <remap from="/camera13029237/image_raw" to="/stereo/right/image_raw"/>
    <remap from="/camera13029237/camera_info" to="/stereo/right/camera_info"/>
    <remap from="/camera13029237/set_camera_info" to="/stereo/right/set_camera_info"/>
  </node>
</launch>
```

and launch the launch file

```bash
roslaunch stereo_only.launch
```

This launch file will run both cameras, remap the topic in a suitable way compatible with stereo_image_proc

Make sure that, during the initialization phase, the intrinsics file are loaded (see the initial output of the previous command)

## stereo_image_proc

Run stereo_image_proc:

```bash
ROS_NAMESPACE=stereo rosrun stereo_image_proc stereo_image_proc
```
This command does not output anything, but new topics (such as /stereo/right/image_rect) are published.

jkkj

## Parameters

[Choosing Good Stereo Parameters](http://wiki.ros.org/stereo_image_proc/Tutorials/ChoosingGoodStereoParameters)


## Calibration

At the top, the unrectified camera stereo image, at the bottom the rectified one:
![unrectified-vs-rectified](/uploads/uncalibrated-vs-calibrated.png)

[calibration procedure tutorial](http://wiki.ros.org/camera_calibration/Tutorials/StereoCalibration)

[camera calibration and 3d reconstruction](http://docs.opencv.org/modules/calib3d/doc/camera_calibration_and_3d_reconstruction.html)

* For an in-depth discussion of the block matching algorithm, see pages 438-444 of Learning OpenCV. *

calibration commands:

```bash
# start the cameras:
roslaunch stereoOnly.launch
# start the calibration node:
rosrun camera_calibration cameracalibrator.py --size 8x6 --square 0.02395 right:=/stereo/right/image_raw left:=/stereo/left/image_raw right_camera:=/stereo/right left_camera:=/stereo/left --approximate=0.01
```

## Baseline distance

See [Willow Garage - Stereo Geometry](http://pub1.willowgarage.com/~konolige/svs/disparity.htm) and the related [notebook](http://nbviewer.ipython.org/github/team-diana/team-diana.github.io/blob/master/extra/notebooks/stereo_geometry.ipynb)

## SLAM

See [stereo_vision_slam](stereo_vision_slam.md)

## Related Papers

[effects of camera alignment errors on stereoscopic depth estimates](http://www.cfar.umd.edu/~wyzhao/JPR_Camera_96.pdf)

