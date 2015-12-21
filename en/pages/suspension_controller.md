# Suspension Controller

[gimmick: math]()

[github repository](https://github.com/team-diana/suspension/tree/master/src/suspension_controller)

![suspension_controller graph](/extra/graphs/suspension_controller.svg)

## Algorithm

The minimum height of the *chassis* link is:


$$  h\_{min} = min(chassis\_{i}, range\_{front},  range\_{post})  $$


## Messages and Services

### publish:
  - /motore_1_controller/command
  - /motore_1_controller/arm/command
  - /motore_1_controller/vel_tor/command
  - /motore_2_controller/command
  - /motore_2_controller/arm/command
  - /motore_2_controller/vel_tor/command
  - /motore_3_controller/command
  - /motore_3_controller/arm/command
  - /motore_3_controller/vel_tor/command
  - /motore_4_controller/command
  - /motore_4_controller/arm/command
  - /motore_4_controller/vel_tor/command
  - /joint_states
  - /status_asm

### subscribes:

  - /motore_1_controller/arm/state
  - /motore_2_controller/arm/state
  - /motore_3_controller/arm/state
  - /motore_4_controller/arm/state
  - /ADC/range_front_down
  - /ADC/range_post_down
  - /imu/data_filtered
  - /ADC/suspension

### created services:

  - suspension_controller/set_height
  - suspension_controller/set_mode
  - suspension_controller/stop_all
  - suspension_controller/freeze

### used services:

  - /motore_1_controller/set_torque
  - /motore_2_controller/set_torque
  - /motore_3_controller/set_torque
  - /motore_4_controller/set_torque

## Modes

0. "Simulazione"
1. "Inseguitore"
2. "Osservatore"
3. "Osservatore + antisollevamento"
4. "Osservatore + inseguitore"
5. "Osservatore + inseguitore + antisollevamento"


## TODO:

### Refactoring
<sub>WIP - [Tamer](https://github.com/tamersaadeh) - 2014-10-14</sub>

Instead of using switches for each mode, use the [State](http://python-3-patterns-idioms-test.readthedocs.org/en/latest/Fronting.html#state) pattern. Create a unique interface and implement each mode as an implementation of that interface.

Create a class 'Arm' with methods that replace function such as process_arm_X. 

Replace any hardcoded value with a costant. 

Use [numpy](http://www.numpy.org/) where (and if) arrays/lists are used.

Since ROS (and we) will switch to python3 soon, rewrite the code to be [python3 compatible](http://stackoverflow.com/questions/8498823/how-to-write-python-2-x-as-much-compatible-with-python-3-x-as-possible) (but do not spend too much time making sure the code will work on python3, we will review it when needed)

Optionally, write some unit tests (see [unittesting](./unit_testing.md)).
