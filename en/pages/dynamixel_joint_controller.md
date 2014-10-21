# joint_controller 

[github repository](https://github.com/team-diana/suspension/tree/master/src/dynamixel_motor/dynamixel_controllers/src/dynamixel_controllers)

warning: This node is currently under refactoring, so (as for 15-10-14) some information present in this page can be outdated)

## JointState vs JointStateOut
- JointStateOut 
  plain sensors_msgs/JointState
- JointState 
  edited dynamixel_msgs/JointState

```python
# dynamixel_msgs/JointState
Header header
string name         # joint name
int32[] motor_ids   # motor ids controlling this joint
int32[] motor_temps # motor temperatures, same order as motor_ids

float64 goal_pos    # commanded position (in radians)
float64 current_pos # current joint position (in radians)
float64 error       # error between commanded and current positions (in radians)
float64 velocity    # current joint speed (in radians per second)
float64 load        # current load
bool is_moving      # is joint currently in motion
```

## Services
```python
self.speed_service = rospy.Service(self.controller_namespace + '/set_speed', SetSpeed, self.process_set_speed)
self.torque_service = rospy.Service(self.controller_namespace + '/torque_enable', TorqueEnable, self.process_torque_enable)
self.compliance_slope_service = rospy.Service(self.controller_namespace + '/set_compliance_slope', SetComplianceSlope, self.process_set_compliance_slope)
self.compliance_marigin_service = rospy.Service(self.controller_namespace + '/set_compliance_margin', SetComplianceMargin, self.process_set_compliance_margin)
self.compliance_punch_service = rospy.Service(self.controller_namespace + '/set_compliance_punch', SetCompliancePunch, self.process_set_compliance_punch)
self.torque_limit_service = rospy.Service(self.controller_namespace + '/set_torque_limit', SetTorqueLimit, self.process_set_torque_limit)
self.torque_service = rospy.Service(self.controller_namespace + '/set_torque', SetTorque, self.process_set_torque)
self.torque_service = rospy.Service(self.controller_namespace + '/set_threshold', SetThreshold, self.process_set_threshold)
```

##  Messages

```python
self.joint_state = JoinState # dynamixel_msgs.JointState
self.arm_state = JoinState # dynamixel_msgs.JointState
self.joint_state_out = JointStateOut # sensors_msgs.JoinState
self.wrench_state = WrenchStamped 
```

## self.joint_state

```python
self.joint_state.motor_temps = [state.temperature]
self.joint_state.goal_pos = self.raw_to_rad(state.goal, self.initial_position_raw, self.flipped, self.RADIANS_PER_ENCODER_TICK)
self.joint_state.current_pos = self.raw_to_rad(state.position, self.initial_position_raw, self.flipped, self.RADIANS_PER_ENCODER_TICK)
self.joint_state.error = state.error * self.RADIANS_PER_ENCODER_TICK
self.joint_state.velocity = (state.speed / DXL_MAX_SPEED_TICK) * self.MAX_VELOCITY
self.joint_state.load = state.load
self.joint_state.is_moving = state.moving
self.joint_state.header.stamp = rospy.Time.from_sec(state.timestamp)
```

## self.arm_state

```python
self.arm_state.motor_temps = [state.temperature]
self.arm_state.error = state.error * self.RADIANS_PER_ENCODER_TICK / 6.3
self.arm_state.velocity = (state.speed / DXL_MAX_SPEED_TICK) * self.MAX_VELOCITY / 6.3
self.arm_state.load = state.load * 6.3
self.arm_state.is_moving = state.moving
self.arm_state.header.stamp = rospy.Time.from_sec(state.timestamp)
self.arm_state.goal_pos = self.raw_to_rad(state.goal, self.initial_position_raw, self.flipped, self.RADIANS_PER_ENCODER_TICK) / 6.3 + zero
self.arm_state.current_pos = self.raw_to_rad(state.position, self.initial_position_raw, self.flipped, self.RADIANS_PER_ENCODER_TICK) / 6.3 + zero
self.arm_state.name = "hub_f_l"
```

## self.joint_state_out

```python
self.joint_state_out.name = []
self.joint_state_out.position = []
self.joint_state_out.velocity = []
self.joint_state_out.effort = []
self.joint_state_out.velocity.append(self.arm_state.velocity)
self.joint_state_out.effort.append(self.arm_state.load)
self.joint_state_out.header.stamp = rospy.Time.now()
self.joint_state_out.name.append(self.arm_state.name)
self.joint_state_out.name.append(self.arm_state.name)
```

## Subscribers:

```python
self.command_sub = rospy.Subscriber(self.controller_namespace + '/command', Float64, self.process_command)
self.command_arm_sub = rospy.Subscriber(self.controller_namespace + '/arm/command', Float64, self.process_arm_command)
self.command_step_sub = rospy.Subscriber(self.controller_namespace + '/vel_tor/command', Float64, self.process_step_command)
self.motor_states_sub = rospy.Subscriber('motor_states/%s' % self.port_namespace, MotorStateList, self.process_motor_states)
self.arm_states_sub = rospy.Subscriber('/ADC/suspension', sosp_Adc, self.process_arm_states)
```
