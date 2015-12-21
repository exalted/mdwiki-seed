#RVIZ


Note:
Before running rviz remember to start the [pantilt](pages/pantilt.md) node in order to load the robot state trasformer.


Run rviz with
```bash
rosrun rviz rviz
```

or set the fixed frame before with\\
```bash
rosrun rviz rviz -f 'name_of_the_frame'
```

Warning:
Sometimes it segfault, try sto stop the ptu node, start rviz and then restart ptu (problem due to the robot state pubblisher node that is launched in the launch file of the ptu)\\
**TODO:** Find out the cause of the segfault
