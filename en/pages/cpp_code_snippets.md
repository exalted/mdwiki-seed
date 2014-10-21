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

## Service

```c++
bool add(beginner_tutorials::AddTwoInts::Request  &req,
         beginner_tutorials::AddTwoInts::Response &res)
{
  res.sum = req.a + req.b;
  return true;
}

int main(int argc, char **argv)
{
  ros::init(argc, argv, "add_two_ints_server");
  ros::NodeHandle n;

  // Service
  ros::ServiceServer service = n.advertiseService("add_two_ints", add);
  ROS_INFO("Ready to add two ints.");
  ros::spin();
  return 0;

  // Client
  ros::ServiceClient client = n.serviceClient<beginner_tutorials::AddTwoInts>("add_two_ints");
  beginner_tutorials::AddTwoInts srv;
  srv.request.a = 2;
  srv.request.b = 2;
  if (client.call(srv))
  {
    ROS_INFO("Sum: %ld", (long int)srv.response.sum);
  }
}
```
