# Remote development

## Unison

unison is a tool that allows to sync two directory, one on your local computer, one on the remote computer (rover), updating their content in both direction.

In order to use it, create a profile inside the *~/.unison* directory.
The profile could be named like the directory you want to sync, diana_powertrain in this example:

*diana_powertrain.prf*:

```
root = .
root = ssh://diana@192.168.1.2///home/diana/software/diana_powertrain_ws/src/diana_powertrain
ignore = Name build
ignore = Name .git
ignore = Path {build2}
ignore = Path {build_gcc}
ignore = Path {build_pkg}
ignore = Path {diana_powertrain.kdev4}
```

Then, inside the directory you want to sync:

```
unison diana_powertrain 
#         this ^ is name of the profile file, without .prf
```

it may ask additional instruction on which directory to sync.

then use -batch every time you want to use it in a script in order to skip question:

```
unison diana_powertrain -batch
```
You should ignore permanentely the *.git*, *build* folders.

See also **ssh-agent** in order to **not** type the password everytime

Once you setup unison, you can write a script like this

```bash
while true; do
  unison diana_powertrain -batch
  sleep 5
done
```

In order to automatically sync your updates, in both directions

## ssh-agent

ssh-agent allows to insert the private key password only once. Then every ssh session (and also other tools such as scp, unison)
will not ask any password when started.

More info:
http://superuser.com/questions/8077/how-do-i-set-up-ssh-so-i-dont-have-to-type-my-password

In order to use ssh-agent, run it in a console:

```bash
ssh-agent
```

It will output some lines like this:

```bash
SSH_AUTH_SOCK=/tmp/ssh-lxIG8YxYx1za/agent.7645; export SSH_AUTH_SOCK;
SSH_AGENT_PID=7646; export SSH_AGENT_PID;
echo Agent pid 7646;
```

now insert your private key password:

```bash
ssh-add
```

then copy-paste the previous lines (the output of the ssh-agent command) in **every** terminal where you intend to use 
ssh.

