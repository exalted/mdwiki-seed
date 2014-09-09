# Pathfinding

[gimmick: math]()

ROS Navigation
-------

ROS provides a [2D navigation stack](http://wiki.ros.org/navigation) with several libraries.
The structure and interfaces of the entire stack are defined in the [nav_core package](http://wiki.ros.org/nav_core). Each interface handles a phase (e.g. global/local planning, localization) of the navigation system:

![Navigation Stack](http://wiki.ros.org/nav_core?action=AttachFile&do=get&target=move_base_interfaces.png)

We need to customize:

* the **global_planner**
  in order to evaluate the shortest path, while taking in account the slope of the terrain
* the **global_costmap** 
  which will provides the height in each node of the map (2D grid)

Algorithm
-------

hint: basically all algorithms are based on ** A* **. A good explanation to ** A* ** and pathfinding in general can be found [here](http://www.policyalmanac.org/games/aStarTutorial.htm). Further links are listed below 


Ros provides two nodes that implement the **global_planner** interface:

* ** [navfn](http://wiki.ros.org/navfn) **
  which uses **Dijkstra** or** A* **
* ** [sbpl](http://wiki.ros.org/sbpl) **
  which implements several algorithms (but only** ARA* **and** AD* **will work out of the box)

among the above-mentioned algorithms, only ** AD* ** is dynamic. Probably it is best to customize this algorithm.

Slope
------

In order to account the slope during path search, I think we can simply just change the parent-to-child cost function:

$$ G(s) = M(s, e) + k \cdot (h(s) - h(p))  $$

where

$$ M(s, e) $$ is the distance between the current node and the destination node

and 

$$ k \cdot (h(s) - h(p))  $$

is the difference of height between the two current and parent node, multiplied by a costant **k**.

** A* ** and its derivated algorithms are assured to find the optimal solution only if the cost function works properly. I still need to check if this change will break this property. We can naively run the customized ** AD* ** algorithm against the ** dijkstra ** during testing (taking in account the slope for each edge). dijkstra will always work anyway. If ** dijkstra ** gives a different result, we are wrong :)


Height
-----

We need to provide to the algorithm the height for each node. We could write a [costmap_2d](http://wiki.ros.org/costmap_2d) plugin that checks the octree on each update and writes back the height in each node of the costmap. It will work but it does not seem a really clean solution (this way, we do not properly use the costmap). 

Test it
---- 

A first version of the modified algorithm is available [here](/extra/simulation/pathfinding/visual/index.html)

Use the mouse wheel to increase/decrease the height of the node.

Links and references
-----
[ARA* Paper](http://machinelearning.wustl.edu/mlpapers/paper_files/NIPS2003_CN03.pdf) Beyond explaning how ** ARA* ** is made, it also shows how ** A* ** changes with weighted heuristic

** AD* Paper **  _still not found_. I guess it is just an anytime ** D*  lite **

[PathFinding.js](http://qiao.github.io/PathFinding.js/visual/) show some pathfinding algorithms at work

[Another good introduction to A* and pathfinding](http://theory.stanford.edu/~amitp/GameProgramming/)





