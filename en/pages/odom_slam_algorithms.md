# Odometry and SLAM algorithms

This page briefly describes the freely available algorithms and packages for **odometry** and **SLAM**.

Many of these algorithms are published on [openslam.org](http://openslam.org/). Here the main features
of each algorithms are listed and their usefulness in our project is analyzed. 

---

---

## RTAB-Map

**Real-Time Appearance-Based Mapping**

[RTAB-Map](http://introlab.github.io/rtabmap/)

[](https://www.youtube.com/watch?v=_qiLAWp7AqQ)

* RTAB-Map (Real-Time Appearance-Based Mapping) is a RGB-D Graph SLAM approach based on a global Bayesian loop closure detector. The loop closure detector uses a bag-of-words approach to determinate how likely a new image comes from a previous location or a new location. When a loop closure hypothesis is accepted, a new constraint is added to the map's graph, then a graph optimizer minimizes the errors in the map. A memory management approach is used to limit the number of locations used for loop closure detection and graph optimization, so that real-time constraints on large-scale environnements are always respected. RTAB-Map can be used alone with a hand-held Kinect or stereo camera for 6DoF RGB-D mapping, or on a robot equipped with a laser rangefinder for 3DoF mapping. *

### Inputs

- stereo
- laser rangefinder
- rgbd sensor

[M. Labbé and F. Michaud, “Online Global Loop Closure Detection for Large-Scale Multi-Session Graph-Based SLAM,” in Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems, 2014.](https://introlab.3it.usherbrooke.ca/mediawiki-introlab/images/e/eb/Labbe14-IROS.pdf)

### Dependencies

- Vertigo
- GTSAM
- g2o

### See also

[rtbmap_ros](http://wiki.ros.org/rtabmap_ros)

---

---

## stereo_slam 

[](https://www.youtube.com/watch?v=C4U8eaPzrLg)

*stereo_slam is a ROS node to execute Simultaneous Localization And Mapping (SLAM) using only one stereo camera. The algorithm was designed and tested for underwater robotics. This node is based on the G2O library for graph optimization and uses the power of libhaloc to find loop closures between graph nodes. It uses a keyframe to multi-keyframe loop closing mechanism, based on keypoint clustering, to improve the SLAM corrections on feature-poor environments.*

[srv/stereo_slam](https://github.com/srv/stereo_slam)

### Inputs

* stereo
* odometry topic

---

---

## Vertigo

**Versatile Extensions for Robust Inference using Graph Optimization**

[Robust Slam - Vertigo](https://www.tu-chemnitz.de/etit/proaut/forschung/mob/robustSLAM.html.en)

[](https://www.youtube.com/watch?v=A8v70DZxLF8)

*Note: the previous video is rtabmap **using** Vertigo*

*Vertigo is a C++ extension for g2o and gtam. It provides an implementation of switchable constraints and enables g2o and gtsam to solve pose graph SLAM problems despite the presence of false positive loop closure constraints.*

---

---

## ccny_rgbd

[ccny_rgbd](http://wiki.ros.org/ccny_rgbd)

[ccny-ros-pkg/rgbdtools](https://github.com/ccny-ros-pkg/rgbdtools)

Performs visual odometry using **ICP** applied on 3D points matched using 2D features (
*ORB*, *SURF*, *STAR* or *SIFT*)

Also, it uses *g2o* in order to perform graph optimization when requested.

### Inputs

- depth sensor (ToF or rgbd)

### Dependencies

- g2o

Ivan Dryanovski, Roberto G. Valenti, Jizhong Xiao. Fast Visual Odometry and Mapping from RGB-D Data. 2013 International Conference on Robotics and Automation (ICRA2013).

### See also

[ccny_rgbd](ccny_rgbd.md) 

---

---

## Rgbdslam v2

**RGB-D SLAM for ROS Hydro**

[](https://www.youtube.com/watch?v=WWML1TAOll0)

### Inputs

- depth sensor (ToF or rgbd)

---

---

## Omnimapper

[Omnimapper wiki](https://github.com/CognitiveRobotics/omnimapper/wiki)

[](https://www.youtube.com/watch?v=djLKmDMsdxM)


*OmniMapper is an open source SLAM and mapping library and framework developed by Georgia Institute of Technology's Cognitive Robotics Lab. The mapping library aims to support a wide array of mapping tasks, ranging from scan matching based pose graphs to 3D feature-based maps annotated with semantic information. It has been designed with modularity in mind, so as to provide solutions to multi-modal mapping problems with any sensors that may be available. This can range from a single handheld Kinect to a robot that includes odometric information, kinect, and laser range finders.*

### Inputs

- stereo
- depth

It seems that the development was stopped.

---

---

## ORB_SLAM

[ORB-SLAM project page](http://webdiis.unizar.es/~raulmur/orbslam/)
[raulmur/ORB_SLAM](https://github.com/raulmur/ORB_SLAM)

[](https://www.youtube.com/watch?v=8DISRmsO2YQ)

### Inputs

- Stereo

*ORB-SLAM is a versatile and accurate Monocular SLAM solution able to compute in real-time the camera trajectory and a sparse 3D reconstruction of the scene in a wide variety of environments, ranging from small hand-held sequences to a car driven around several city blocks. It is able to close large loops and perform global relocalisation in real-time and from wide baselines.*


---

---

## GTSAM


TODO:

---

---

## g2o

TODO:

--- 

## See also


[Comparison of Optimization Techniques for 3D Graph-basedSLAM](http://www.wseas.us/e-library/conferences/2013/Paris/ECCS/ECCS-31.pdf)

this paper compares the available graph-based optimization methods (**g2o**, **gtsam**, **HOG-Man**)
