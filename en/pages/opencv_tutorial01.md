# OpenCV tutorial 01 - Colored object tracking]

## Introduction

**The original tutorial is from [opencv-srf.blogspoit.it](http://opencv-srf.blogspot.it/2010/09/object-detection-using-color-seperation.html)**

In this tutorial you are going to use OpenCV for detecting a unique object in the image and track it in the 2D image.

The approach used here is based on **color segmentation**, where a patch in the image is detected because its color its different from background color:

We don't use often color segmentation, since it is not robust for object tracking, but this is a good example of c++ and OpenCV programming.

[](https://www.youtube.com/watch?v=CigGvt3DXIw)

In the above video the ball can be easily tracked since it is a red patch between dark colors different from red.

In OpenCV videos are sequences of frame, each frame can be seen as a composition of three matrices:

<br/>

![color matrices](http://2.bp.blogspot.com/-iJxH73dO1Kw/UDDaYQbEmgI/AAAAAAAAAN0/TtDz-y4AuTA/s1600/ColorSpace.png)

<br/>

each cell of the matrix corresponds to a pixel. Often we have three matrices, one for each color: (R)ed, (G)reen, (B)lue. 

Many time in computer vision we use three different values, (H)ue, (S)aturation, (V)alue. This is called the **HSV** space.
The **HSV** turns out to be useful in many applications, see the related [wikipedia article](https://en.wikipedia.org/wiki/HSL_and_HSV)
We are going to describe the color of the object using the HSV space. We set an interval for each value. If the three values of a pixel 
falls between those intervals, then we assume that the pixel belongs to the object we are tracking. We do this check for **every** pixel in the image.

<br/>

![red](http://4.bp.blogspot.com/-KLTuICK0LqA/UDIDgsEN_3I/AAAAAAAAAOU/vOmY0AWT91s/s640/ObjectTracking.png)

<br/>

If the Hue, Saturation and Value interval are correctly set, then we get the result in the previous image. The black and white (binary) image has the 
same dimension of the camera image. For each red pixel in the left (camera) image we draw a white pixel in the right image, otherwise we draw a black pixel.

A filter is applied in order to remove some exception (for instance, really small red patches), but we can ignore this filter currently.

Once we get the binary image, we take the center (or better: the centroid) of the white pixels patch, and we draw a line from the previous center to the current
(red, transparent line in the above image)

## Compile and Run the program

First install opencv and clang on ubuntu.

```bash
sudo apt-get update
sudo apt-get install  libopencv-dev python-opencv clang
```

Now download the [source code](https://gist.github.com/clynamen/9c3eefe38897b8ff785a)

```bash
wget https://gist.githubusercontent.com/clynamen/9c3eefe38897b8ff785a/raw/48b022486a25e402172e8e51cba0fb7df791643b/main.cpp
```
Compile and run it

```bash
clang++ main.cpp $(pkg-config opencv --cflags --libs)
./a.out
```

You should see the window now. Try to see both image at the same time and adjust the Hue, Saturation and Value values in order to track a red object.

## The Code.

Open the file with a good editor, like kate

```bash
sudo apt-get install kate
kate main.cpp
```

Read the source code and the comments.


## Exercises:

1) See the [putText](http://docs.opencv.org/modules/core/doc/drawing_functions.html#void%20putText%28Mat&%20img,%20const%20string&%20text,%20Point%20org,%20int%20fontFace,%20double%20fontScale,%20Scalar%20color,%20int%20thickness,%20int%20lineType,%20bool%20bottomLeftOrigin%29) function. With it, you can draw text over the image and then display it in the gui.
Try to write some text over the image.

2) Using putText, write the **x** and **y** position of the object, in pixel. 

3) Using putText, write the **x** and **y** speed components of the object that you are tracking. Don't worry for the unit, just show a value that is proportional to the speed.

4) This program cannot track two object. Edit it in order to track two or multiple object. (This exercise is harder, just consider the simple case where the object do not overlap in the image)

