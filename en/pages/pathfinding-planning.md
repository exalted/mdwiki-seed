# Pathfinding - Planning

![class diagram](/uploads/pathfinding-planning.png)

[*Google Docs Drawing*](https://docs.google.com/drawings/d/1TQQotWBeh08XAFxGfdvh6Hsj4w8zrYmSb9Oq6xBAsZs/edit) 

## Overview
---
See also [pathfinding](pathfinding.md)

Currently, there is no way to take in account the slope of the terrain during path planning.

In order to do this, we need to:

- Use a **GlobalPlanner** that evaluates path with high slope as more expansive.
- Create a class that builds an heightmap.


** [sbpl](http://wiki.ros.org/sbpl) ** provides the ** AD* ** algorithm which, considering that is the only planner to 
be both dynamic and anytime, is probably the best solution. See [sbpl](sbpl.md) and [sbpl_lattice_planner](sbpl_lattice_planner.md) for 
the implementation details.

**sbpl_lattice_planner**, as every **GlobalPlanner**, receives the Costmap2D as input. We could use the Costmap2D grid in order to pass height data, however this is not possible since the range of the values for each cell is 0-255.
It is however possible to **fork** **sbpl_lattice_planner**, in order to make it instantiate a **Heightmap** class that builds an heightmap and passes the height data to the** AD* Planner **.

The **Heightmap** class, instead of listening to sensor data, can read directly the generated octree from **Octomap**.

### Workflow

The move_base node instantiate the modified **sbpl_lattice_planner** and the Costmap2DROS class. The Costmap2D should be indipendent and 
its behaviour will not be affected by our changes.

The Costmap2D listens to sensors data (configurable) and updates the costmap. A pointer to the Costmap2DROS instance is passed to the **planner**. 

The move_base package will also forward all the path planning requests to the ** GlobalPlanner ** ( *makePlan()* method). The planner, once finished, will publish the new path autonomously. 
The modified **sbpl_lattice_planner** also instantiate the **Heightmap** class, and, when requested to find a new path, it will read the heightmap from **Heightmap** and
update the sbpl environment accordingly.

The **Heightmap** listens to **Octomap** ***octomap_binary*** topic, and builds the internal heightmap.

## Algorithm
---

In order to account the slope during path research, it is possible to change the parent-to-child cost evaluation:

** Plain A* **

<p class='inline-disqus' data-disqus-identifier="pathfinding-3"></p>

```javascript
// get the distance between current node and the neighbor
// and calculate the next g score
ng = heuristic(x - node.x, y - node.y);
```
<p class='inline-disqus' data-disqus-identifier="pathfinding-4"></p>
* from [sebastiano-barrera/PathFinding.js](https://github.com/sebastiano-barrera/PathFinding.js):*
** A* with Slope ** (see **Test it** section)
```javascript
// get the distance between current node and the neighbor
// and calculate the next g score
hypotxy = heuristic(x - node.x, y - node.y);
ng = node.g
+ heuristic(weight * hypotxy, 
    slopeWeight * abs(neighbor.height - node.height));
```

** A* ** and its derivated algorithms are assured to find the optimal solution only if the cost function works properly. I still need to check if this change will break this property. We can naively run the customized ** AD* ** algorithm against the ** dijkstra ** during testing (taking in account the slope for each edge). dijkstra will always work anyway. If ** dijkstra ** gives a different result, we are wrong :)

See [sbpl](sbpl.md) for details on how this can be added to the ** AD* ** algorithm.

## Test it

A first version of the modified algorithm is available at [sebastiano-barrera/PathFinding.js](https://github.com/sebastiano-barrera/PathFinding.js)

![slope-pathfinding](/uploads/slope-pathfinding.png) 

You can [try it online](/extra/simulation/pathfinding/visual/index.html)

**move_base** is the node that runs both the costmap_2d and the global_planner.

## Testing
---
See [Using rviz with the Navigation Stack](http://wiki.ros.org/navigation/Tutorials/Using%20rviz%20with%20the%20Navigation%20Stack)

The **Heightmap** class should be tested individually, first with dataset, the with more noisy material. 

During changes, we could break something in the **sbpl** library. A test suite would be useful.

Finally, the entire system can be tested with **rviz** and **Gazebo**.
