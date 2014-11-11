# Gazebo 

[Gazebo](http://gazebosim.org/) is a robot simulation software, built upon [ogre](http://www.ogre3d.org/) and integrated with [ROS](ROS.md).

## How To

All Team DIANA resources for Gazebo are available on [team-diana/gazebo-assets](https://github.com/team-diana/gazebo-assets)

This repository has two submodules:

- [models](https://github.com/team-diana/gazebo-models)
  Contains both the definitions (.xacro files) and the actual gazebo models (.sdf files).
  See also [gazebo models](./gazebo_models.md).
- [worlds](https://github.com/team-diana/gazebo-worlds)
  Contains the worlds files used during testing.

The models can be used creating a symlink inside the ~/.gazebo directory. This is automatically done using a script, see [gazebo models](./gazebo_models.md) for details.

The worlds submodule should also be linked inside the ~/.gazebo directory:

```bash
ln -s  ~//path/to/git/repository/worlds ~/.gazebo/worlds
```

## Team Diana Plugins
New plugins were added to the standard ros-gazebo plugins. These plugins are available in these repository:

 - [team-diana/gazebo_ros_dynamixel_motor_plugin](https://github.com/team-diana/gazebo_ros_dynamixel_motor_plugin)
 - [team-diana/gazebo_ros_pkgs](https://github.com/team-diana/gazebo_ros_pkgs)

tip: the libraries of the repositories listed above should be installed and available in the same plugin directory used by gazebo.

## Textures

Currently, it seems that gazebo cannot load texture outside of the resource directory. This can cause some texture to not appear, even without error message.
Until this problem will be solved, all the used textures must be copied inside the resource directory. A script inside the 
[team-diana/gazebo-assets](https://github.com/team-diana/gazebo-assets) repository will do this:

```bash
cd textures
bash install.sh
```

## Tips

- Use always the **ODE** physics engine. 
  Currently this is the only engine that supports force and torque feedback for joints.

- Use the **--verbose** switch. 
  Most warnings are hidden by default. Use the **--verbose** switch when you cannot find an error or something unexpected happens.

- For visualization problems, check also *~/.gazebo/ogre.log*

## Links

- [Official Gazebo Website](http://gazebosim.org/)

- [SDF file specification](http://sdformat.org/spec)

- [Gazebo Answers](http://answers.gazebosim.org)
