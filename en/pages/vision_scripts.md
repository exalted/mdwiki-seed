# Vision scripts

The scripts can be found inside the ~/Scripts directory:
```enableCameras.sh```  -  Enable the cameras if they are disabled by the node.
```disableCameras.sh```  -  Disable the cameras if they are disabled by the node.
```setCamerasFrameRate.bash {framerate}```  - Set the framerate of the cameras to __framerate__
```setCamerasPacketSize.bash {packetsize}``` - Set the camera packet size to __packetsize__
```setCamerasMTU.bash {mtu}```  - Set the MTU of the cameras ethernet interface to __mtu__
```startCameraAroundSequence.bash```  - Start the [camera_around](camera_around.md) node and call its service. This scripts should run with rviz started and with the pointcloud enabled. Once the sequence end, the cameras will __not__ be enabled. 
```startStereoCameraView``` -- Only start the two camera view for the stereo vision
