# Depth Camera Only SLAM

See also: [ICP](icp.md)

[PCL - Registration API](http://pointclouds.org/documentation/tutorials/registration_api.php#registration-api)

## Links

[point cloud slam without rgb information - ROS Answers](http://answers.ros.org/question/36795/point-cloud-slam-without-rgb-information/)

## Papers

** 3D pose estimation and mapping with time-of-flight cameras **

[pdf](http://www.researchgate.net/publication/228662715_3D_pose_estimation_and_mapping_with_time-of-flight_cameras/file/79e4150580485b8a2b.pdf)

This papers list some methods on how to perform SLAM using only depth and intensity data coming from a Mesa SR3000 ToF.

**Notes:**
The referred **KLT** method is both [KLT tracking](http://en.wikipedia.org/wiki/Kanade%E2%80%93Lucas%E2%80%93Tomasi_feature_tracker) itself, and the feature 
detection algorithm technique described in [*Shi and C. Tomasi. Good Features to Track*](ovement.nyu.edu/mocap11f/papers/lec03_OpenCV_FeaturesFinding.pdf) 
and available in OpenCV as [goodFeaturesToTrack](http://docs.opencv.org/modules/imgproc/doc/feature_detection.html#goodfeaturestotrack).

```bibtex
@inproceedings{may20083d,
  title={3D pose estimation and mapping with time-of-flight cameras},
  author={May, Stefan and Droeschel, David and Holz, Dirk and Wiesen, Christoph and Fuchs, Stefan and others},
  booktitle={International Conference on Intelligent Robots and Systems (IROS), 3D Mapping workshop, Nice, France},
  year={2008}
}
```

---

** Robust 3D-mapping with time-of-flight cameras **


[pdf](http://elib.dlr.de/62654/1/FuchsM-Iros09_3dcam.pdf)
[video](https://www.youtube.com/watch?v=CIZCya7KBUQ)


```bibtex
@inproceedings{may2009robust,
  title={Robust 3D-mapping with time-of-flight cameras},
  author={May, Stefan and Dr{\"o}schel, David and Fuchs, Stefan and Holz, Dirk and Nuchter, Andreas},
  booktitle={Intelligent Robots and Systems, 2009. IROS 2009. IEEE/RSJ International Conference on},
  pages={1673--1678},
  year={2009},
  organization={IEEE}
}
```
---

**A visual odometry method based on the SwissRanger SR4000**

Uses **SIFT**, **SVD** and **RANSAC**.

[pdf](http://www.dtic.mil/dtic/tr/fulltext/u2/a536272.pdf)

@inproceedings{ye2010visual,
  title={A visual odometry method based on the SwissRanger SR4000},
  author={Ye, Cang and Bruch, Michael},
  booktitle={SPIE Defense, Security, and Sensing},
  pages={76921I--76921I},
  year={2010},
  organization={International Society for Optics and Photonics}
}

---

** Selecting good corners for structure and motion recovery using a time-of-flight camera **

[ieee](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?tp=&arnumber=5354395&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D5354395)

```bibtex
@inproceedings{gemeiner2009selecting,
  title={Selecting good corners for structure and motion recovery using a time-of-flight camera},
  author={Gemeiner, Peter and Jojic, Peter and Vincze, Markus},
  booktitle={Intelligent Robots and Systems, 2009. IROS 2009. IEEE/RSJ International Conference on},
  pages={5711--5716},
  year={2009},
  organization={IEEE}
}
```

---

** Exposure Fusion for Time‐Of‐Flight Imaging **

*This work deals with the problem of automatically choosing the correct exposure (or integration) time for time-of-flight depth image capturing. *

[pdf](http://cybertron.cg.tu-berlin.de/hahne/files/berlin/depth/pg2011.pdf)

```bibtex
@inproceedings{hahne2011exposure,
  title={Exposure Fusion for Time-Of-Flight Imaging},
  author={Hahne, Uwe and Alexa, Marc},
  booktitle={Computer Graphics Forum},
  volume={30},
  number={7},
  pages={1887--1894},
  year={2011},
  organization={Wiley Online Library}
}
```

---

** Real-Time Robot Trajectory Estimation and 3D Map Construction using 3D Camera **

Use of ICP for 3D map construction

[ieee](http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=4059264&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D4059264)

```bibtex
@inproceedings{ohno2006real,
  title={Real-time robot trajectory estimation and 3d map construction using 3d camera},
  author={Ohno, Kazunori and Nomura, Takafumi and Tadokoro, Satoshi},
  booktitle={Intelligent Robots and Systems, 2006 IEEE/RSJ International Conference on},
  pages={5279--5285},
  year={2006},
  organization={IEEE}
}
```

