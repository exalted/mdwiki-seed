# Unit Testing

## python
--- 

### ROS package file structure

example file structure:
(taken from [ros_status_cli](https://github.com/team-diana/ros_status_cli))

```bash
src/ros_status_cli
├── CMakeLists.txt
├── package.xml
├── README.md
├── src
│   ├── ros_status
│   │   ├── __init__.py
│   │   ├── ros_status.py
│   └── ros_status_tui
│       ├── __init__.py
│       └── tui.py
└── test
    ├── rostest
    │   ├── test_ros_status.py
    │   └── test_ros_status.test
    └── unit
        └── test_example.py
```

the **test** directory should be have two subdirectories:
- rostest
  contains tests that needs the ros core to be started, so they can actually use rospy 
  for integration testing
- unit
  plain unit test

### CMake

The *CMakeLists.txt* file should have these lines

```cmake
if (CATKIN_ENABLE_TESTING)
  find_package(rostest REQUIRED)
  catkin_add_nosetests(test/unit)
  add_rostest(test/rostest/test_ros_status.test)
endif()
```

the *catkin_add_nosetests(DIR)* commands automatically finds all the unit tests in DIR, so it should point to the *test/unit* directory as above 
the *add_rostest(rostestfile.test)* command add the test file to the list of integration tests that must run with rosunit. 

### Unit Test

example unit test:
```python
#!/usr/bin/env python

# example_unit_test.py

#!/usr/bin/env python

from __future__ import print_function

def test_good():
    assert 1==1

def test_failing():
    assert 1==2

```

!warning the unit test files must **not** be executable! 

### Integration Test

integration test are composed of two file:

- a python script that performs the actual test
- a .test file that acts like a ros .launch file and can be used to launch additional nodes.

!warning the python script **must** be executable

here an example of each file:

```xml
<launch>
  <node pkg="node_package" name="node_name" type="node_script.py" />
  <test test-name="ros_status" pkg="ros_status_cli" type="test_ros_status.py" />
</launch>
```

```python
#!/usr/bin/env python

from __future__ import print_function

import unittest
import rostest
import rospy

TEST_NAME = 'ros_status'


class Test(unittest.TestCase):
    # important:
    # the name must be called test_some_name
    def test_good(self):
        assert 1==1

    def test_failing(self):
        assert 1==2

if __name__ == '__main__':
    rospy.init_node(TEST_NAME, anonymous=True)
    rostest.unitrun('ros_status_test', TEST_NAME, Test)
```

## C++

*TODO: fill me*
