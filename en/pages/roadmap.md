# Roadmap

-   Simulation (Gazebo) [ completion expected on 15/11 ]
    -   Real physical data from CAD (mass, moment of inertia,  ecc&#x2026;)
    -   Procedural terrain generation
    -   IMU
    -   ToF (parameters)
    -   Stereo (parameters)
    -   Suspensions (arm frame vs motor frame fix)
-   Vision [ completion expected on 30/11 ]
    -   Setup stereo-cameras and do calibration
-   Mapping
    -   Form pipeline: sensors, tf, octomap, path finding, motion planning
    -   Evaluate all available ToF only SLAM packages + 
        easy to implement algorithms
-   Odometry
    -   Test stereo-cameras visual odometry
-   Motori
    -   Driver update (for kernels >=3.13, current is for 2.6.x)
        -   Testing
    -   Test CAN interface
-   System
    -   Update to latest Ubuntu

