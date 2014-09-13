# Pathfinding

[gimmick: math]()

ROS Navigation
-------

<p class='inline-disqus' data-disqus-identifier="pathfinding-1"></p>

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


<p class='inline-disqus' data-disqus-identifier="pathfinding-2"></p>

Ros provides two nodes that implement the **global_planner** interface:

1. ** [navfn](http://wiki.ros.org/navfn) **
  which uses **Dijkstra** or ** A* ** 
2. ** [sbpl](http://wiki.ros.org/sbpl) **
  which implements several algorithms (but only** ARA* **and** AD* **will work out of the box)

among the above-mentioned algorithms, only ** AD* ** is dynamic. Probably it is best to customize this algorithm.

See also [sbpl](sbpl.md) and [spbl_lattice_planner](sbpl_lattice_planner.md)

## Slope
---


In order to account the slope during path search, the parent-to-child cost can be changed.

** Plain A* **

<p class='inline-disqus' data-disqus-identifier="pathfinding-3"></p>

```javascript
// get the distance between current node and the neighbor
// and calculate the next g score
ng = heuristic(x - node.x, y - node.y);
```
<p class='inline-disqus' data-disqus-identifier="pathfinding-4"></p>

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


Height
-----

We need to provide to the algorithm the height for each node. We could write a [costmap_2d](http://wiki.ros.org/costmap_2d) plugin that checks the octree on each update and writes back the height in each node of the costmap. It will work but it does not seem a really clean solution (this way, we do not properly use the costmap). 

Test it
---- 

A first version of the modified algorithm is available at [sebastiano-barrera/PathFinding.js](https://github.com/sebastiano-barrera/PathFinding.js)

![slope-pathfinding](/uploads/slope-pathfinding.png) 

You can [try it online](/extra/simulation/pathfinding/visual/index.html)

Links and references
-----
[ARA* Paper](http://machinelearning.wustl.edu/mlpapers/paper_files/NIPS2003_CN03.pdf) Beyond explaning how ** ARA* ** is made, it also shows how ** A* ** changes with weighted heuristic

** AD* Paper **  _still not found_. I guess it is just an anytime ** D*  lite **

[PathFinding.js](http://qiao.github.io/PathFinding.js/visual/) show some pathfinding algorithms at work

[Another good introduction to A* and pathfinding](http://theory.stanford.edu/~amitp/GameProgramming/)

## Glossary

* Static vs Dynamic
  When dynamic, the algorithm uses past information when the map is updated, in order to reduce the computation time.

* Anytime
  The algorithm can be run within a certain amount of time, but reducing the quality of the solution. 
  The error is however bounded.

## Algorithms summary:


* ** A* **: 
  - Simple
  - Static
  - Optimal

* ** ARA* ** :  Anytime: Repairing A*
  - Anytime

[pdf](http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB8QFjAA&url=http%3A%2F%2Fmachinelearning.wustl.edu%2Fmlpapers%2Fpaper_files%2FNIPS2003_CN03.pdf&ei=nTYTVKvZJZOh7AbV1YHYCQ&usg=AFQjCNFg_a4-XvVZUGtilbBRjXogugFzeA&sig2=xXOyV_kmanVIx0z9aKqJ9g&bvm=bv.75097201,d.ZGU)
```bibtex
@inproceedings{likhachev2003ara,
  title={ARA*: Anytime A* with provable bounds on sub-optimality},
  author={Likhachev, Maxim and Gordon, Geoffrey J and Thrun, Sebastian},
  booktitle={Advances in Neural Information Processing Systems},
  pages={None},
  year={2003}
}
```
* ** AD* **: Anytime Dynamic A*
  - Anytime
  - Dynamic

[pdf](http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB0QFjAA&url=http%3A%2F%2Fwww.cs.cmu.edu%2F~ggordon%2Flikhachev-etal.anytime-dstar.pdf&ei=tzYTVOqqDumw7AaWq4HQDw&usg=AFQjCNEV_e2Ro8OIGatgB_oY9GefwOfhXw&sig2=W8R0MYGAUd4hCrTscGjSZQ&bvm=bv.75097201,d.ZGU)
```bibtex
@inproceedings{likhachev2005anytime,
  title={Anytime Dynamic A*: An Anytime, Replanning Algorithm.},
  author={Likhachev, Maxim and Ferguson, David I and Gordon, Geoffrey J and Stentz, Anthony and Thrun, Sebastian},
  booktitle={ICAPS},
  pages={262--271},
  year={2005}
}
```
