# sbpl_lattice_planner

This page contains some details about the [sbpl_lattice_planner](https://github.com/ros-planning/navigation_experimental/tree/hydro-devel/sbpl_lattice_planner) ros package.

The package is not a node, it is used as a plugin.

This package implements the [BaseGlobalPlanner](http://docs.ros.org/diamondback/api/nav_core/html/classnav__core_1_1BaseGlobalPlanner.html) 
interface using the [sbpl](https://github.com/sbpl/sbpl) library, and is thus suitable to be used with the [nav_core](http://wiki.ros.org/nav_core) stack.

Being a [BaseGlobalPlanner](http://docs.ros.org/diamondback/api/nav_core/html/classnav__core_1_1BaseGlobalPlanner.html) is initialized 
with a pointer to a Costmap2DROS (which is subscribed at sensor updates and is always up-to-date). When the method makePlan 

```c++
bool SBPLLatticePlanner::makePlan(const geometry_msgs::PoseStamped& start,
                               const geometry_msgs::PoseStamped& goal,
                               std::vector<geometry_msgs::PoseStamped>& plan)
```
is called the class will update the sbpl environment comparing the previous costmap (still stored in the sbpl enviroment) and the new costmap (in the Costmap2DROS instance) for each node at position (x,y).
Then the sbpl planner is run and the result is published as a [nav_msgs::Path](http://docs.ros.org/api/nav_msgs/html/msg/Path.html)
