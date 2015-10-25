# OpenCV tutorial 02 - Harris corner and SIFT

In this tutorial you will see two basic instruments in computer vision: corner detection and a famous feature detection and matching algorithm, **SIFT**.

After playing a little bit with the source code read a bit about these algorithms and how they works. Full knowledge of them is not required, but a rough understanding of their parameters will be useful later.

The **SIFT** algorithm is also used in the navigation and mapping system of the Amalia rover.

## Harris corner

Read these two guides in the OpenCV tutorials documentation.

[OpenCV - feature meaning](http://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_feature2d/py_features_meaning/py_features_meaning.html#features-meaning_)

[OpenCV - harris corner](http://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_feature2d/py_features_harris/py_features_harris.html#harris-corners)

Now we will apply the **Harris Corner** detector on a checkboard image

Download the source code from [here](https://gist.github.com/clynamen/9a265111a87807cd0b74)

and this image

![checkboard.png](/uploads/chessboard.png)

```bash
wget https://gist.githubusercontent.com/clynamen/9a265111a87807cd0b74/raw/02b1a75eb0ddc8801c86ca612b251eb1187dcd49/main.cpp
wget http://wiki.teamdiana.org/uploads/chessboard.png
```

then, write a **make** *Makefile* in order to compile everything

*Makefile*
```make
CC=clang++
CFLAGS="-Wall"
LIBS=$(shell pkg-config opencv --cflags --libs)

debug:clean
	$(CC) $(CFLAGS) -g -o main main.cpp $(LIBS)

clean:
	rm -vfr *~ main
```

run make and execute the executable

```bash
make
./main
```

The image corners will be detected, now check out the source code.

Then, let's try with your camera.

### Harris Corner using camera

Use this [source](https://gist.github.com/clynamen/09d885ab70e70783c8c8)

```bash
wget 'https://gist.githubusercontent.com/clynamen/09d885ab70e70783c8c8/raw/3a175184407e53e008a7938f3064219b16c0e24c/main.cpp'
make
./main
```

Re-read what those parameters mean, then try to change them and study how they affect the results.

### SIFT

![sift example](http://opencv-python-tutroals.readthedocs.org/en/latest/_images/homography_findobj.jpg)

SIFT (Scale Invariant Feature Transform) is one of the first and most known detection and matching algorithm. A good and plain simple tutorial can be found here:

[aishack.in - SIFT tutorial](http://aishack.in/tutorials/sift-scale-invariant-feature-transform-introduction/)

also the [original paper is easy to read](http://www.cs.ubc.ca/~lowe/papers/iccv99.pdf)

The algorithm, while superseded by new ones in some cases, is still in use nowadays and in Team DIANA software.

We will now use SIFT for tracking an arbitrary object.

[source](https://gist.github.com/clynamen/8a079d93bc68abd6ce21)

compile the code and run

```bash
wget 'https://gist.githubusercontent.com/clynamen/8a079d93bc68abd6ce21/raw/2198cdba39876d9e218161e1dbf3a6303173c9da/main.cpp'
make
./main
```

select a subset of the image by drawing a square with the mouse. The subset will become our Region Of Interest (**ROI**). 
The image in the ROI will be matched in the following frames, making it possible to create a tracking system.

Read the source code in order to get how it works.

### Acknowledgments

##### Original sources
https://jayrambhia.wordpress.com/2012/09/24/sift-based-tracker/
http://www.jayrambhia.com/blog/selecting-roibb-in-opencvmat/


