# Future Projects

## Better build system, CI, updated repository, wiki, docker support

During the latest week we had many problems due to missing, outdated or not working packages. 
It's a common problem in open source software, but there are a lot of new tools available that we can use to solve this.


### What we have right now

We already have a basic support for CI and a repository, but they still need a lot of improvements.

#### CI and automated builds

We are currently using wercker for just one package (See [wercker - hlcanopen](https://app.wercker.com/#applications/55bbc646603eb27f5305156c)).  
It seems to work just fine. It allows to use docker images instead of fixed ubuntu environments, so we can replicate our system (with updated libraries) and it's
way faster than anything else since the system images are cached. 

Currently, there are two things that we must do in order to fully use wercker:

- Add all the missing packages (starting from the ones that we modify often)
- Make wercker to push new ubuntu packages to our repository

The second task seems hard, yet not impossible, due to the crazy complicated debian package creation process. 
We will also have to create a simple webserver that accept new debian packages and put them in the ubuntu repository. It should be possible to add a pre-shared key
in wercker in order to identify the source.

#### Repository 

The repository hosts some of our packages (gazebo-plugins, teamdiana-lib, hlCANopen and something else). However these packages are manually built and uploaded to the server. 
This also mean that the debian package is way older than the latest source code in the respective repository. 

The server is currently hosted on **digitalocean**. However it will not last forever (the credit is going to end soon) so we will use instead a **raspberry pi 2** and a external hd 
for the server, using the ip address that we have available at politecnico. 

#### Docker

Docker allows to have the same exact configuration everywhere at minimal cost. See [teamdiana/docker-distribution](https://github.com/team-diana/docker-distribution)

## OpenCV Graph Editor

While we all love to write code, sometime when you are doing visual stuff you need a visual editor. 
We often need to test new idea and reproduce algorithms on a set of images or video and see what actually happens at each step of an opencv pipeline. 
Of course, it is now easy to bring up some windows with few code in python, but the graph editor will allow to easily change, analyse and improve a long and complex pipeline.

There were already some attempts:

[](https://www.youtube.com/watch?v=1aAh1Cmlguc&feature=youtu.be)

yet, nobody created something actually useful or usable. 

The previous video only uses static images, while we are interested in image streams (video), with multiple sources. The graph editor should 
allow live editing (it should always possible to change parameters or edit the graph) and possibly **pause**, **slow down** and **step back** functionalities

![OpenCV Graph Editor mockup](/uploads/opencv_grapheditor_mockup.png)

The image stream is directly rendered on the graph editor. It should also be possible to zoom in and out. Also, statistics about each node should be printed (general such as cpu time and specific such as number of features recognized)

Libraries that could be used for this:

- Qt (C++)
- Imgui (C++)
- Kivy (python)

Of course performance are important here. 

### Requirements and notes:

Before starting to code, it is necessary to think about on:

- how each process:
  - exposes data input and output (image stream)
  - passes the actual data (serialization, shared memory or something else)  
  - exposes parameters
  * exposes statistics
  * manages error
* where each node live (process, thread?)
* how discrete and continuous 'time' is managed
* if the system could be written in the most generic way, so it could also be extended to libraries such as **pcl**, **g2o**, **gtsam**
 
## Generic SLAM Pipeline 

There are a lot of **odometry** and **SLAM** algorithms available online (see [Odometry and SLAM algorithms](odom_slam_algorithms.md). 
Unfortunately, while these algorithms share a lot of processing phases, they are coded differently and each time a new library is released 
(such as **ccny_rgbd** or **rtabmap**) the authors write boilerplate code in order to join the different components of the SLAM pipeline.

### Example: **ccny_rgbd**

1. Adapt image from raw sensor
2. Detect features
3. Add features to a data structure for fast access during search
4. Track features between frames 
5. Compute features position in 3D
6. Build keyframes
7. Add keyframes to a graph
8. Compute visual odometry using ICP on the recognized features
9. When requested, perform least-square on the graph using **g2o**

Every phase can be split from the others to a certain extent. This way, it would be possible to easily switch each components, 
or build multiple pipeline in order to compare results. 

For instance, the **feature detector** can be chosen among the ones available in opencv, the graph solver can be changed between **g2o** and **gtsam**.

### Implementation

All the libraries are written in C++. Since we have a lot of component that do similar things, 
it would be proper to use template (and maybe some **concepts** implementation) in order to have compile time checks 
and also propagate the type of data that each component exchanges. For instance, a **SIFT** feature detector can work with a 
**SIFT** feature tracker.

Also the use of other sensor and SLAM algorithms (such as kalman filters instead of graph-slam type algorithms) should be considered. 

It is necessary to have a basic knowledge on how **g2o** and **gtsam** work.
