# io_dc

The [team-diana/io-adc](https://github.com/team-diana/io-adc) handles both the 
[cPCI-7432 DIO](./cpci-7432.md) and the [cPCI-9116 ADC](./cpci-9116.md) cards.

All the devices connected to the [io-adc PCB](io_adc_pcb.md) are managed by this
package and specifically by the **io_adc** node

## Sensors

This is a list of all the managed sensors:

 * [wheel engine temperature sensors](wheel_engine_temperature_sensor.md)
 * [leg gyroscopes](mma7361lc.md)

## Python API

Both the cards can be used with the python API built using **boost python**

*todo: add some example here*

## Scopes

This package contains two executables: **adc_scope_node**  and  **io_scope_node**.
This nodes can be used respectively as a digital scope and as a digital logic reader.

### adc_scope_node

This node outputs every analog input as a Float64 topic. This allows to plot the 
values using a tool such as **rqt**
The node must be launched with a **.launch** file that allow to pass the configuration
of each port. This is a basic launch file:

```xml
<launch>
  <node name="adc_scope" pkg="io_adc" type="adc_scope" output="screen" cwd="node" args="">
    <param name="pause_micro_seconds" value="1000"/>
    <param name="unipolar" value="true"/>
    <param name="voltage_range_0" type="string" value="2.5"/>
    <param name="voltage_range_1" type="string" value="5"/>
  </node>
</launch>
```

- pause_micro_seconds can be seen as an approximate sample time. 
- unipolar if false, also negative values will be read
- the voltage ranges **must** be strings

It is possible to configure all the 64 inputs 
(from voltage_range_0 to voltage_range_63)

### io_scope_node

This node read all the 32 logical input and output them as an array
of boolean at 

/io_scope/io_scope
