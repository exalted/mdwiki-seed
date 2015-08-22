# Gazebo Models

The Gazebo models are hosted on [github](https://github.com/team-diana/gazebo-models).

In order to make changes more easily the contents of this repository are splitted in two directories:

- **definitions** contains the xacro files of the models
- **models** contains the built sdf models that can be used under gazebo.

The files under the **models** directory can be used inside Gazebo.

## Xacro files
---
The models are split in modules and added under the **definitions** directory. Each directory contains a **.xacro** file that can be used by other modules or models since they contain [xacro macros](http://wiki.ros.org/urdf/Tutorials/Using%20Xacro%20to%20Clean%20Up%20a%20URDF%20File#Macros).

Use the **.xacro** format when there is duplicated code or costant values are used multiple times.

## Build and Install
---
The included **build.py** script automatically runs xacro on the files inside **definitions** and writes the sdf models in the **models** directory.

The script has some dependencies:

```bash
sudo pip install docopt plumbum logging coloredlogs
```

When definitions files changes, run the script to update the models: 

```bash
python build.py
```

In order to be used under Gazebo, the models file must be put inside the * ~/.gazebo/models * directory. You can copy the files manually. However the **build.py** script can also create symbolic links to the models:

```bash
python build.py --symlink='~/.gazebo/models'
```

## Available Models

### Rover Amalia

See [Rover Amalia Gazebo Model](gazebo_amalia_rover.md)

## Using SolidWorks 

In order to use solidworks models in gazebo you have to convert them using blender.

1. Export the model as VRML format (97 seems to work fine)
2. Import them in blender
3. Inside blender, export the model to .stl
4. Open a new file, and import the just exported model (this assures that extra informations are deleted, otherwise gazebo will have strange artifacts)
5. (optional) Reduce the number of triangles using the [decimate](http://wiki.blender.org/index.php/Doc:2.6/Manual/Modifiers/Generate/Decimate) modifier.
6. Export the model as .dae (Collada)

