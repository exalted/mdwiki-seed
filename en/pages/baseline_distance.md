# Baseline Distance

Also see [Willow Garage - Stereo Geometry](http://pub1.willowgarage.com/~konolige/svs/disparity.htm) and the related [notebook](http://nbviewer.ipython.org/github/team-diana/team-diana.github.io/blob/master/extra/notebooks/stereo_geometry.ipynb)

## Examples:

These examples are made with the [two blackfly cameras](blackfly_bw_poe_gige_hardware.md). 

|||
|---|---|
|product name | BFLY-PGE-13E4M-CS|
|resolution| 1280x1024|
|Pixel Size| 5.3 µm|
|Focal Length |  6mm |

All the examples are made using a disparit range of **128** pixels

---

### 80 mm

[rosbag files](ftp://178.62.194.236/stereo_calibration_day2/80mm/)

![left](/uploads/baseline_distance/80mm/left.png)
![disparity](/uploads/baseline_distance/80mm/disparity.png)
![pcl](/uploads/baseline_distance/80mm/pcl.png)

_Notes:_ * Near objects (< 0.5m) are visible. From the pointcloud we can see there is a lot of uncertanity beyond 4m *

###  100mm

[rosbag files](ftp://178.62.194.236/stereo_calibration_day2/100mm/)

![left](/uploads/baseline_distance/100mm/left.png)
![disparity](/uploads/baseline_distance/100mm/disparity.png)
![pcl](/uploads/baseline_distance/100mm/pcl.png)

_Notes:_ * Near objects (< 0.5m) start to disappear. Some objects are occluded in one of the two cameras *

### 200 mm

[rosbag files](ftp://178.62.194.236/stereo_calibration_day2/200mm/)

![left](/uploads/baseline_distance/200mm/left.png)
![disparity](/uploads/baseline_distance/200mm/disparity.png)
![pcl](/uploads/baseline_distance/200mm/pcl.png)

_Notes:_ * Near objets (< 0.5m) are not more visible. At 2.5 we still get the same disparity map (slightly less affected by error than with the 100mm baseline). At 5m the depth accuracy is significantly improved, compare the point clouds with rviz. *
