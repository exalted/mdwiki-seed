# Docker

[Docker](https://www.docker.com/) is an open platform for distributed applications for developers and sysadmins.

We use docker and [wercker](./continous_integration.md) in order to build and test our repositories.

[docker/teamdiana](https://registry.hub.docker.com/repos/teamdiana/) account.

## Images

  * [teamdiana/diana](https://registry.hub.docker.com/u/teamdiana/diana/) image is the most similar to the rover environment. Is has the latest compilers, ROS libraries and tools.
It is the image used for continous integration and your packages should be targeted to this environment.

