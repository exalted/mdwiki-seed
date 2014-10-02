# Code Snippets

This page contains a list of most common code, that can be used without to have to look up at the references

# Python 
---

## Publisher, Subscriber, Service, Client

```python
#!/usr/bin/env python
import rospy
from std_msgs.msg import String
from beginner_tutorials.srv import *

def subscriber_callback(data):
    # executed when new data is published
    rospy.loginfo(rospy.get_caller_id()+"I heard %s",data.data)

def handle_multiply_two_floats(req):
    # executed when the servie is called.
    print "Returning [%s * %s = %s]"%(req.a, req.b, (req.a * req.b))
    return MultiplyTwoFloatsResponse(req.a * req.b)
    
if __name__ == '__main__':
    # init
    rospy.init_node('node_name', anonymous=True)
    # subscribe
    rospy.Subscriber("subscribe_topic", String, subscriber_callback)
    # create publisher
    pub = rospy.Publisher('publish_topic', String, queue_size=10)
    # publish
    pub.publish("string message")
    # wait for a service to be available
    rospy.wait_for_service('add_two_ints')
    # get a reference for the service 
    add_two_ints = rospy.ServiceProxy('add_two_ints', AddTwoInts)
    # call the service
    resp1 = add_two_ints(x, y)
    # create a service
    s = rospy.Service('multiply_two_floats', MultiplyTwoFloats, handle_multiply_two_floats)

    rospy.logdebug("log debug")
    rospy.loginfo("log info")
    rospy.logwarn("log warn")
    rospy.logerr("log err")
    rospy.logfatal("log fatal")


    # spin() simply keeps python from exiting until this node is stopped
    rospy.spin()
```

