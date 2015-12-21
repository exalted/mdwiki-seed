# ADC [package]

The [ADC](https://github.com/team-diana/IO/tree/master/src/adc) package publishes the data read from the [cPCI-9116](cpci-9116.md) **DAQ** and [cPCI-7432](cpci-7432.md) **DIO** cards

## Related ROS names
---

### published topics

- ADC/IMU
- ADC/IMU2
- ADC/suspension
  gyroscope data from each gyroscope in the suspension hubs

  ```python
  # sosp_Adc.msg
  string message
  int16 x1
  int16 z1
  int16 x2
  int16 z2
  int16 x3
  int16 z3
  int16 x4
  int16 z4
  float64 sosp1
  float64 sosp2
  float64 sosp3
  float64 sosp4
  ```

- ADC/range_front
- ADC/range_front_down
- ADC/range_post
- ADC/range_post_down
- ADC/diag
- imu/data_raw
- imu_2/data_raw

