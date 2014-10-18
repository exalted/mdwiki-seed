# C++ Code Snippets

## Publisher and Subscriber

```c++
#include "ros/ros.h"
#include "std_msgs/String.h"
#include <sstream>

void chatterCallback(const std_msgs::String::ConstPtr& msg)
{
    ROS_INFO("I heard: [%s]", msg->data.c_str());
}

int main(int argc, char** argv) {
  ros::init(argc, argv, "talker");
  ros::NodeHandle n;

  // Create publisher
  ros::Publisher chatter_pub = n.advertise<std_msgs::String>("chatter", 1000);

  // publish
  std::stringstream ss;
  ss << "hello world " << count;
  msg.data = ss.str();
  chatter_pub.publish(msg);

  // Create subscriber
  ros::Subscriber sub = n.subscribe("chatter", 1000, chatterCallback);  

  // spin, run until exit
  ros::spin();
}
```
