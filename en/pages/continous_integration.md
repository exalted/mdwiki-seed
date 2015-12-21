# Continous Integration 

See also [unit testing](unit_testing.md)

We use [wercker](http://wercker.com/) as our continous integration platform. 
Currently wercker is one of the most flexible platform since it offers the possibility to run the build inside custom **docker** image. This speeds up build times a lot (since it does not have to install new libraries every time the build is run) and allows to choose the exact version of each library used in the build. 

This is also mean that, once wercker finds a build error or a test fails it is possible to run the same docker image on your own computer and find the cause of the error in the **same environment**

For more info about the docker images, see [docker](docker.md)

[team DIANA wercker account](https://app.wercker.com/#teamdiana)

The status of the tested repository can be seen directly from the [github repo list](./git_repos.md) page. 
