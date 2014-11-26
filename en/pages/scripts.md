# Scripts 

See also
  * [Camera around](pages/camera_around.md)
  * [vision](pages/vision_scripts.md)

---

Some scripts in the ~/scripts directory are used to execute common routine quickly and to setup some nodes via CLI wizards.

The scripts in ~/scripts/utils/ contains some functions suck as //info() ask() ok()// that should be always  used in order to make them easier to use and edit.\\

For camera related scripts see [[vision|vision]].\\


~/scripts/fastSetup has some wizard scripts.

Scripts will run commands in a Konsole (KDE terminal emulator) tab.

##How to start in new tab

Command in new tabs can be started like this:

```bash
konsole --new-tab -p LocalTabTitleFormat="$tabName" -e 'execute' $@
```

The 'execute' command is a bash script in /usr/bin/execute :

```bash
# This script allows to run command in terminals and the to start a bash shell at the end

$@

bash
```

see http://www.hilltopyodeler.com/blog/?p=382 for more details.

