# ccny_rgbd

[ccny_rgbd](http://wiki.ros.org/ccny_rgbd) is a ROS node for SLAM and VO using RGBD cameras (like the kinect). It was released with the paper [Fast visual odometry and mapping from RGB-D data](http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=6630889&url=http%3A%2F%2Fieeexplore.ieee.org%2Fiel7%2F6615630%2F6630547%2F06630889.pdf%3Farnumber%3D6630889)

## How it works

Both the SLAM and VO nodes listen to 

```bash
/rgbd/rgb
/rgbd/depth
/rgbd/info
```

for getting the RGB image, the depth information (expressed in mm or m when the datatype is a float32) and the camera instrinsics (only the camera matrix is used, that is fx, fy, cx, cy)

The node detects the features in the RGB image using one of these algorithms

* SURF
* ORB
* STAR
* GFT (shi-tomasi good features to track)

(Note: currently SURF was removed. Maybe due to patent?)

Then good features are tracked with the ORB descriptor

Motion estimation is done via ICP or pairwise ransac (using FLANN knn matcher)

the **trainSURFMatcher** is also available, but is not used.

## Bad values

For the mesa SR4500 we have to better define which value is not good. Review this, see also rgbd_frame.cpp:212


## Variance of Z

NOTE: this is important!
the variance of Z is evaluated on a model based on the kinect1 sensor. This is not suitable for the SR4500!
there are also hardcoded values in ccny_rgbd (e.g. Z_STDEV_CONSTANT)

Moreover the SR4500 already provides the distance variance!


## Changes to make

1. fix how Z variance is evaluate
2. ignore non valid points in the amplitude and depth image

## TODO:

1. find best detector for SR4500 
2. try other descriptors, currently there is only ORB 
3. compare different detector and descriptors combinations with a standard dataset (lab dataset)
