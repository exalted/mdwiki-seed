# Catkin Snippets

## Create a new package

```bash
catkin_create_pkg beginner_tutorials std_msgs rospy roscpp
```

## Message

_package.xml_

```xml
  ...
  <build_depend>message_generation</build_depend>
  <run_depend>message_runtime</run_depend>
  ...
```

_CMakeLists.txt_

```cmake

find_package(catkin REQUIRED COMPONENTS
   ...
   message_generation
   ...
)

add_message_files(
  FILES
  Message1.msg
  Message2.msg
)

generate_messages(
  DEPENDENCIES
  std_msgs
)

catkin_package(
  ...
  CATKIN_DEPENDS message_runtime ...
  ...
)

add_dependencies(PROJECT_NAME PROJECT_NAME_msgs_generate_messages_cpp)


```

## Service 

TODO
