# rosbag

Rosbag is a set of tools for recording from and playing back to ROS topics.

## How to play bag files

```bash
rosbag play bag_file_name.bag
```

## How to play bag files for processing

It is really important to use the simulated time of the bag file. Otherwise you will see a lot of error like

  * old tf
  * dropped old msg

follow this in order to make it work:

  1. start roscore
  2. set use\_sim\_time to **true** 

      ```bash
      rosparam set /use_sim_time true
      ```
  3. play the bag file

      ```bash
      rosbag play bag_file_name.bag --clock
      ```

  4. start rviz (optional) and processing nodes.

If you still see errors, shutdown all the nodes and retry from point **3**

## Links

[rosbag tutorials - ROS Wiki](http://wiki.ros.org/rosbag/Tutorials)
