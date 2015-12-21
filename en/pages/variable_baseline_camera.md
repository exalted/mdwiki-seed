# Variable Baseline Camera

## Theory

See [this notebook](http://nbviewer.ipython.org/github/team-diana/team-diana.github.io/blob/master/extra/notebooks/variable_baseline.ipynb) for error estimation.

### Introductory articles

[Depth Map from Stereo Images](http://opencv-python-tutroals.readthedocs.org/en/latest/py_tutorials/py_calib3d/py_depthmap/py_depthmap.html)
[UniBo - Stefano Mattoccia](http://vision.deis.unibo.it/~smatt/Seminars/StereoVision.pdf) <- really good

For an in-depth discussion of the block matching algorithm, see pages 438-444 of **Learning OpenCV**.

## References

[OpenCV stereoBM algorithm](https://github.com/Itseez/opencv/blob/master/modules/calib3d/src/stereobm.cpp)
[Siddhantahuja - Sum Absolute Differences](https://siddhantahuja.wordpress.com/tag/sum-of-absolute-differences-sad/)
[Wikipedia - Sum Absolute Differences](http://en.wikipedia.org/wiki/Sum_of_absolute_differences)
[Minimum Sum of Absolute Differences implementation on a single FPGA Device](http://www.uco.es/~el1olbuj/papers/Minimum%20Sum%20of%20Absolute%20Differences%20Implementation%20in%20a%20Single%20FPGA%20Device.pdf)
[Sum of Absolute Differences algorithm in stereo correspondence problem for stereo matching in computer vision application - IEEE](http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=5565062&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D5565062)
[Variable baseline/resolution stereo - IEEE](http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=4587671&url=http%3A%2F%2Fieeexplore.ieee.org%2Fxpls%2Fabs_all.jsp%3Farnumber%3D4587671)
[A Multiple Baseline Stereo - pdf](https://www.ri.cmu.edu/pub_files/pub2/okutomi_m_1993_1/okutomi_m_1993_1.pdf)
[Variable Baseline Stereo Tracking Vision System Using High-Speed Linear Slider - IEEE](http://ieeexplore.ieee.org/xpl/login.jsp?tp=&arnumber=1570337&url=http%3A%2F%2Fieeexplore.ieee.org%2Fiel5%2F10495%2F33250%2F01570337.pdf%3Farnumber%3D1570337)
[UniRoma - Iocchi](http://www.dis.uniroma1.it/~iocchi/stereo3d/)
[Experiments in Multiple-Baseline Stereo](http://www.dtic.mil/dtic/tr/fulltext/u2/a261415.pdf)
[FPGA Stereo Vision Core](http://danstrother.com/2011/06/10/fpga-stereo-vision-core-released/)

## Algorithm

Probably OpenCV stereoBM algorithm is far behind to the state of art. For best results, new algorithms should be tried.


![horopter](/uploads/stefano_mattoccia_1.png)

## See also

[baseline_distance](baseline_distance.md)

