# Remote development

## Unison

unison is a tool that allows to sync two directory, one on your local computer, one on the remote computer (rover), updating their content in both direction.

You can start unison like this

```
# inside the directory you want to sync:
unison . ssh://diana@192.168.1.2//home/diana/software/io-adc/ -batch
```

the **-batch** flag makes unison to not ask question. The first time you run this command unison will ask which file to sync with a wizard. You should ignore permanentely the *.git* folder.

See also ssh-agent in order to **not** type the password everytime

Once you setup unison, you can write a script like this

```bash
while true; do
  unison . ssh://diana@192.168.1.2//home/diana/software/io-adc/ -batch
  sleep 5
done
```

In order to automatically sync your updates, in both directions

## ssh-agent

http://superuser.com/questions/8077/how-do-i-set-up-ssh-so-i-dont-have-to-type-my-password

```bash
# before using ssh
ssh-agent bash
ssh-add
# no more password requested from now on
```
