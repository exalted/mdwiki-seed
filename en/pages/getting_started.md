# Getting Started

This is the first page you should read if you want to work with ROS and our software.

At the end of the guide, you should have a working ROS environment ready to be used along with the Team Diana rover.

## Install Ubuntu

We currently use Ubuntu **14.04**. You can install ubuntu on you pc creating a separate partition, or
use a virtual machine instead.

See [ubuntu](ubuntu.md) for more details.

You can download ubuntu **14.04** [here](http://www.ubuntu.com/download/desktop)

## Install ROS

You can follow the [official ROS guide](http://wiki.ros.org/indigo/Installation/Ubuntu)

## Install Extra packages

Install some of the tools that you will use:

```bash
sudo apt-get install git python-pip
```

## Follow the ROS tutorials

Now you should start the ROS tutorials. These are simple tutorials that explain you how ROS works and the tool you will use from now on.
You can skip the programming tutorial if you want (the one marked with C++, python) but **make sure you undertand how message and topic work**. 
You don't have to learn everything at once, just make some mental notes on the tools.

[ROS Tutorial](http://wiki.ros.org/ROS/Tutorials)


## Install Gazebo

Gazebo is a robot simulator. After installing it, we are going to simulate the rover (with the same commands that you would use on the actual rover)

We use Gazebo **6**. Install followin the official [step by step guide](http://www.gazebosim.org/tutorials?tut=install_ubuntu&cat=install#Step-by-stepInstall)

Make sure you also install *libgazebo6-dev*

## Install Team Diana Packages

In order to setup the repository, see [Team Diana Ubuntu Repository - Add_the_repository](team_diana_ubuntu_repo.md#Add_the_repository)

Then, install all the necessary packages.

```bash
sudo apt-get install boost-all boost-all-dev ros-indigo-dynamixel-controllers-td ros-indigo-dynamixel-driver-td ros-indigo-dynamixel-msgs-td ros-indigo-gazebo-msgs-td ros-indigo-gazebo-plugins-td ros-indigo-gazebo-ros-control-td ros-indigo-gazebo-ros-dynamixel-motor-plugin ros-indigo-gazebo-ros-td ros-indigo-pgr-camera ros-indigo-team-diana-lib 
```

## Customize the environment

echo 'export LD_LIBRARY_PATH=/opt/boost/lib:$LD_LIBRARY_PATH' >> ~/.bashrc
echo 'source /opt/ros/indigo/setup.sh' >> ~/.bashrc


## Download and install the Rover model

```bash
git clone https://github.com/team-diana/gazebo-models
cd gazebo-models
git submodule init
git submodule update
```

Then follow [Gazebo Models - Build and install](gazebo_models.md#Build_and_Install) for installing the model

If everything is ok, you should have a *rover_amalia* directory inside *~/.gazebo/models*:

```bash
ls ~/.gazebo/models/rover_amalia
```

## Run Gazebo

You can now start gazebo

```bash
rosrun gazebo_ros gazebo
```

![gazebo - window](/uploads/gazebo_getting_started01.png)

Then add the **rover_amalia** model from the left menu:

![gazebo - rover](/uploads/gazebo_getting_started02.png)
 
The model should be almost motionless like in the image. If it falls down, then probably there is something wrong with the gazebo plugins (You can get more info by starting gazebo with the --verbose flag).

Many sensor and actuators available on the real rover are present on the virtual rover in gazebo under the same topic. Use rostopic to get a list:

```bash
rostopic list
```

Let's try to move a suspension:

```bash
rostopic pub /motore_2_controller/command std_msgs/Float64 "data: -5.0"
```

![gazebo - rover](/uploads/gazebo_getting_started03.png)

Now try to visualize the output of the stereo and ToF cameras.
