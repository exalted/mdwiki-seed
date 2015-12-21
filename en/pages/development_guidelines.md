#Development guidelines 

## Unit Testing
Each node should have unit tests in order to validate main functionalities. 
ROS uses the module [rostest](http://wiki.ros.org/rostest) along with google [gtest](http://wiki.ros.org/gtest). Follow the tutorials in order to see how these two libraries can be used. Also, checkout the [diana messenger](https://github.com/team-diana/diana-messenger) for a real example.

Unit test are also a way to speed-up the edit-compile-test cycle, so everyone is encouraged to write them as soon as the [interface](http://en.wikipedia.org/wiki/Interface_%28computing%29#Software_interfaces_in_object-oriented_languages) of the new code is established.

Also, prefer to split up the node interfaces from the real implementation, and put implementation in a separate library, in order to reduce inter-dependencies. It is easier to test a single library function than setup multiple nodes and manually run test using command line. 
