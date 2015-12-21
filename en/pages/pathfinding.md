# Pathfinding

## ROS Navigation
---

<p class='inline-disqus' data-disqus-identifier="pathfinding-1"></p>

ROS provides a [2D navigation stack](http://wiki.ros.org/navigation) with several libraries.
The structure and interfaces of the entire stack are defined in the [nav_core package](http://wiki.ros.org/nav_core). Each interface handles a phase (e.g. global/local planning, localization) of the navigation system:

![Navigation Stack](http://wiki.ros.org/nav_core?action=AttachFile&do=get&target=move_base_interfaces.png)

The **Costmap2D** is a class that manages a 2D costmap with one or more **Layer**. Each **Layer** can write a value on the cells of the costmap using the data received from sensors.
The **Global Planner** is the interface that does the actual pathfinding. It can read the **Costmap2D** and, when requested, it can publish a new path to follow. 

Other classes instead handle the local planning and instruct the actuators. 

## Algorithms
---

hint: basically all algorithms are based on ** A* **. A good explanation to ** A* ** and pathfinding in general can be found [here](http://www.policyalmanac.org/games/aStarTutorial.htm). Further links are listed below 

<p class='inline-disqus' data-disqus-identifier="pathfinding-2"></p>

Ros provides two nodes that implement the **global_planner** interface:

1. ** [navfn](http://wiki.ros.org/navfn) **
  which uses **Dijkstra** or ** A* ** 
2. ** [sbpl](http://wiki.ros.org/sbpl) **
  which implements already several algorithms (but only** ARA* **and** AD* **will work out of the box)

among the above-mentioned algorithms, only ** AD* ** is dynamic. 

See also [sbpl](sbpl.md) and [spbl_lattice_planner](sbpl_lattice_planner.md)

## Slope
---
Currently, no algorithm in the ROS navigation stack considers the slope of the terrain during path planning.
The page [Pathfinding - Planning](pathfinding-planning.md) describes a possible solution for this.

## Links and references
---
[ARA* Paper](http://machinelearning.wustl.edu/mlpapers/paper_files/NIPS2003_CN03.pdf) Beyond explaning how ** ARA* ** is made, it also shows how ** A* ** changes with weighted heuristic

** AD* Paper **  _still not found_. I guess it is just an anytime ** D*  lite **

[PathFinding.js](http://qiao.github.io/PathFinding.js/visual/) show some pathfinding algorithms at work

[Another good introduction to A* and pathfinding](http://theory.stanford.edu/~amitp/GameProgramming/)

## Glossary
---

* Static vs Dynamic
  When dynamic, the algorithm uses past information when the map is updated, in order to reduce the computation time.

* Anytime
  The algorithm can be run within a certain amount of time, but reducing the quality of the solution. 
  The error is however bounded.

## Algorithms summary:
---

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
