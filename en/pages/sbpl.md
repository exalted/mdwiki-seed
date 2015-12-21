# SBPL

[SBPL](https://github.com/sbpl/sbpl) is a standalone pathfinding library that implements several algorithms and fully abstracts the graph search from the actual map.
It thus can be applied to simple 2D map as well environment with more DOF.
[sbpl_lattice_planner](sbpl_lattice_planner.md) however use a map with 3 DOF: x, y and theta (yaw). The map implementation can be found in environment_navxythetalat.cpp

---

## Implementation Details

### Heuritics

Usually all the heuristic are pre-computed.

### State
A state (a node in the graph) has a unique id, and has this base class:

```c++
// mdp.h
class CMDPSTATE
{
public:
    //data
    int StateID;
    std::vector<CMDPACTION*> Actions;
    std::vector<int> PredsID;
    void* PlannerSpecificData;

// ...
};
```
Where a **CMDPACTION** is basically a possible path (with cost and probability data) that starts from the state.
The path is composed by a list of State

However this is not actually a real base class. In order to avoid performance loss due to virtual calls, 
implementations are manually casted (See the original paper for details).

### NAVXYTHETALAT

ActionsV is a 2D vector char[theta][actionId]

Actions are evaluated from motion primitives. If no motion primites file is provided, then **  EnvironmentNAVXYTHETALATTICE::DeprecatedPrecomputeActions() ** 
will be called, which will assure the creation of some default actions (depracted, probably not working).

---

## Algorithms

### AD*

```bash
adplanner.h
adplanner.cpp
```

The ** AD* ** algorithm implementation uses a ADState class with these values:

```c++
// ...
// called g in the original paper
unsigned int v;
// called rhs in the original paper
unsigned int g;
// ...
```

This is the ComputeKey method:

```c++
CKey ADPlanner::ComputeKey(ADState* state)
{
    CKey key;

    if (state->v >= state->g) {
        key.key[0] = state->g + (int)(pSearchStateSpace_->eps * state->h);
        key.key[1] = 1;
    }
    else {
        key.key[0] = state->v + state->h;
        key.key[1] = 0;
    }

    return key;
}
```

The cost from state A to state B is not simply the action cost. The action cost is multiplied by a cost factor **currentmaxcost** 
which is the cost of the cell with higher cost in the path from A to B (including begin and end).
See ** EnvironmentNAVXYTHETALATTICE::GetActionCost() ** . In this function there are also other checks such as comparision
with robot footprint polygon.

See these methods 

```c++
void ADPlanner::UpdateSuccsofOverconsState(ADState* state, ADSearchStateSpace_t* pSearchStateSpace)
void EnvironmentNAVXYTHETALAT::GetPreds(int TargetStateID, vector<int>* PredIDV, vector<int>* CostV)
void EnvironmentNAVXYTHETALAT::GetSuccs(int SourceStateID, vector<int>* SuccIDV, vector<int>* CostV, vector<
    EnvNAVXYTHETALATAction_t*>* actionV /*=NULL*/)
```

Both GetPreds and GetSuccs returns a CostV array, which contains the cost of the path from the current node to the Pred/Succ node.

UpdateSuccofOverconsState is called when a node has a new cost lower than before (due to underlaying map changes).

## Slope
---

The modified algorithm must also consider height data. This can be stored inside the ** EnvNAVXYTHETALATConfig_t ** class,
just like the internal 2D costmap.

<p class='inline-disqus' data-disqus-identifier="sbpl-slope"></p>

---
*** I think that the EnvironmentNAVXYTHETALATTICE::GetActionCost can be modified in order to take the slope into account. ***
*** For starter, we can just consider the height of the current node against the height of the highest node in the path. *** 

[!githubuser:clynamen]

---

## Related links:
---

** DA* algorithm: ** 
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
