# .launch File Snippets

## remap

```bash
<launch>
  <node name="node_name" pkg="pkg_name" type="node_executable_name" output="screen" cwd="node" args="">
    <remap from="/from/topic" to="/to/topic"/>
  </node>
</launch>
```

## param

```bash
<launch>
  <node name="node_name" pkg="pkg_name" type="node_executable_name" output="screen" cwd="node" args="">
    <param name="param/name" value="0"/>
    <param name="param/name_2" type="string" value="hello"/>
  </node>
</launch>
```

### pitfalls:
If a param is not found, remeber also to specify the type
In order to check if the string is right, you may want to edit the source code in order to **set** the parameter, and then see the name of the parameter with rosparam list



