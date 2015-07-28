# Wheel Engine Temperature Sensor

The [MK-IN 120-007-AC](wheel_engine.md) has two temperature sensor: a PTC and a KTY 84-130

Both sensor are included in the engine.

## PTC

The PTC sensor is the sensor that will prevent damage. It is directly connected to the [elmo solo whistle](elmo_solo_whistle.md).

## KTY 84-130

The KTY 84-130 can be used to know the average temperature of the engine. It is not made to prevent damage, however we also
stop the engines when the measured temperature is too high for extra safety.

It is connected to the [IO-ADC](./io_adb_pcb.md) and the resistence is measured using a voltage divider.

The value is measured using the [team-diana/io-adc](https://github.com/team-diana/io-adc) node.

### Calibration

The obtained measure is influenced by the +5V and by the resistence of the KTY 84-130 at ambient temperature.
The calibration parameters are read by the [team-diana/io-adc](https://github.com/team-diana/io-adc) node and can be obtained using the *calibrate_motor_temperature_sensor.py* script inside the same package. The script wil start a wizard and generate a **yaml** file with the calibration parameters.
