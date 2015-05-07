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
  </node>
</launch>
```
