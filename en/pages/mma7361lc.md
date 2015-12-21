# MMA7361LC

![MMA7361LC](https://a.pololu-files.com/picture/0J2546.1200.jpg?0605bfd009b17d81f444f8cb1d8c7b46) 
![pinout](https://a.pololu-files.com/picture/0J2548.1200.jpg?aaf369301dcd8bd8d0f10b6c16165b1a)

[link](https://www.pololu.com/product/1246)
[datasheet](https://www.pololu.com/file/0J472/MMA7361LC.pdf)


Polulu 3-axis accelerometer

**from polulu.com:**

**This tiny triple-axis accelerometer is a basic carrier board for the Freescale MMA7361LC XYZ-axis accelerometer, a great low-g sensor with analog voltage outputs, adjustable sensitivity (±1.5 g or ±6 g), and a 0g-detect digital output that signals when the board is in free-fall. Our breakout board has the form factor of a 10-pin DIP package, which makes it easy to use with standard solderless breadboards and 0.1″ perfboards, and the unit is smaller than competing products, all at a lower price. The board operates from 2.2 to 3.6 V.**


## Test the MMA7361LC

If you want to test the accelerometer using the [cPCI-9116](cpci-9116.md) card, connect the x,y,z outputs to the card, provide a separate 3.3V Vdd, and also set the SLEEP pin to **HIGH** in order to enable the MMA7361LC.

You can use the adc_scope executable in [io-adc](https://github.com/team-diana/io-adc) in order to use the [cPCI-9116](cpci-9116.md) as an oscilloscope

Launch the executable with this launch file:

```xml
<launch>
  <node name="adc_scope" pkg="io_adc" type="adc_scope" output="screen" cwd="node" args="">
    <param name="pause_micro_seconds" value="1000"/>
    <param name="unipolar" value="true"/>
    <param name="voltage_range_0" type="string" value="2.5"/>
    <param name="voltage_range_1" type="string" value="2.5"/>
    <param name="voltage_range_2" type="string" value="2.5"/>
    <param name="voltage_range_3" type="string" value="2.5"/>
    <param name="voltage_range_4" type="string" value="2.5"/>
    <param name="voltage_range_5" type="string" value="2.5"/>
    <param name="voltage_range_6" type="string" value="2.5"/>
    <param name="voltage_range_7" type="string" value="2.5"/>
  </node>
</launch>
```

adc_scope will publish a topic for each channel as a Float32

You can plot these topic in rqt:

![unfiltered output](/uploads/unfiltered_accelerometer_mma7361lc.png)

The output of the MMA7361LC is noisy, but you can take the mean (e.g. of the last 60 samples) in order to get a good result.

In order to filter the output you can use a node like this:

```python
#!/usr/bin/env python
import rospy
from std_msgs.msg import Float32
import numpy as np
import sys

last_update_index = 0
values=np.array([])
values.resize(80)
pub = None

def subscriber_callback(data):
    global last_update_index
    last_update_index = (last_update_index + 1) % values.size
    values[last_update_index] = data.data
    pub.publish(np.mean(values))

if __name__ == '__main__':
    topic_name = sys.argv[1]
    rospy.init_node('node_name', anonymous=True)
    rospy.Subscriber(topic_name, Float32, subscriber_callback)
    pub = rospy.Publisher(topic_name+"_mean", Float32, queue_size=10)
    rospy.spin()
```
run this node for every channel you want.

Then you can plot the output of the mean of each channel:

![filtered output](/uploads/filtered_accelerometer_mma7361lc.png)

of course in your code evaluate the mean inside the same node.

**test results**:

The x, y values vary from 0.5V to 1.5V. In order to capture high input values, use a 0-5V unipolar configuration for the [cPCI-9116](cpci-9116.md). 
Use a sampling period of 1ms and the mean of the latest 80 values.
