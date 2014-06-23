# GUI getting started

``` bash

// written by Vincenzo Giovanni Comito < clynamen@gmail.com > the 12-10-13

#############################################################################
############### Installazione librerie e tools necessari su ubuntu ##########
#############################################################################

sudo apt-get install qt5-qmake qt5-default qtcreator qtcreator-dbg qtcreator-doc git tree ssh

sudo sh -c 'echo "deb http://packages.ros.org/ros/ubuntu raring main" > /etc/apt/sources.list.d/ros-latest.list'
wget http://packages.ros.org/ros.key -O - | sudo apt-key add -
sudo apt-get update
sudo apt-get install ros-hydro-desktop-full
sudo rosdep init
rosdep update
sudo apt-get install python-rosinstall

#############################################################################
################ Scaricare il codice della gui e usare git ##################
#############################################################################

To be write for the new github repo.


#############################################################################
############################## Uso di git ###################################
#############################################################################

- Guide git
guide brevi (meglio leggerle entrambe)
https://docs.google.com/document/edit?id=1kiLCEJqYmNTP0WIyHxKZBUefgVnf45L5fQyELX0XuBw&hl=it
http://rogerdudler.github.io/git-guide/index.it.html

guida completa
http://git-scm.com/book/it

- comandi git di base

    git clone https://code.google.com/p/team-diana/ 

 E` il comando che abbiamo usato prima, serve a scaricare il repository (ovvero tutto, ma proprio tutto, cio` che e` contenuto in git)


    git checkout origin/gui-develop 
Posizionati in un branch o in un commit. In questo caso il branch  e` origin/gui-develop

    git branch nome_nuovo_branch 
 Crea un nuovo branch da dove sei (per vedere in quale branch sei dai git status)

    git push origin nome_branch
 Metti il codice che c'è nel branch nome_branch in origin. 

    git status
 Visualizza lo stato attuale: indica il nome del branch in cui ci troviamo, i file che abbiamo modificato o creato. gli untracked files sono file ignorati da git, che non verranno salvati e non verranno uploadati.

   git add nome_file
Un file modificato o creato non e` subito aggiunto nel repository. questo file deve essere prima aggiunto. con git add nome_file il file viene aggiunto. dopo aver aggiunto un file, questo file  comparira` in verde in git status.

  git commit -m "Ho fatto queste modifiche" 
i file che in git status compaiono in verde verrano aggiunti ad un commit. A questo commit colleghiamo un messaggio per ricordare che modifiche abbiamo fatto.

  git pull origin nome_branch
scarica dal repository online le modifiche fatte dagli altri in nome_branch.

Ci sono alcuni punti dove git si comporta in maniera poco intuitiva ed e facile cancellare qualche file o perdere il proprio lavoro. Quindi, quando si e` in dubbio, copiamo tutta la cartella.

GIT HOW TOs
http://stackoverflow.com/questions/315911/git-for-beginners-the-definitive-practical-guide

#############################################################################
######################### Workflow di sviluppo ##############################
#############################################################################

Di solito il workflow di sviluppo che si ha con git e` questo

si hanno due branch principali

master - contiene il codice stabile, funzionante, che possono utilizzare tutti. Non useremo quasi mai questo branch

gui-develop - contiene il codice poco stabile, che ha le nuove features.

Ogni tanto, quando siamo soddisfatti, il codice presente in gui-develop si porta in master.

Quando vogliamo implementare qualcosa, creiamo un nuovo branch
per esempio voglio implementare un nuovo menu

mi assicuro di avere l'ultimo codice disponibile sul server

git fetch origin

mi assicuro di essere su la versione di gui-develop presente sul server
git checkout origin/gui-develop

creo il nuovo branch

git branch gui-nuovo-menu

entro nel nuovo branch

git checkout gui-nuovo-menu

faccio le mie modifiche (per esempio creo un file menu.cpp)

voglio aggiungere questo file

git add menu.cpp

ho finito le modifiche che volevo fare, ora le salvo

git commit -m "aggiungo menu.cpp"

infine metto il nuovo codice sul server

git push origin gui-nuovo-menu

#############################################################################
######################### Il codice presente ora nel repository ############ 
#############################################################################

gui
├── CHANGELOG.txt #elenco di cambiamenti importanti nel codice
├── gui.pro # file del progetto
├── interface # cartella che contiene soltanto il codice della gui
├── qutty # cartella che contiene una libreria, qutty
├── README.txt # file che contiene le istruzioni per compilare manualmente.
├── Resources.qrc # file che contiene i riferimenti alle immagini


#############################################################################
######################### Le qt e l'ambiente di sviluppo ####################
#############################################################################

Le qt sono le librerie con cui sviluppiamo la gui. Sono librerie potenti, 
che contengono codice per quasi qualunque cosa. Fanno un'uso molto intensivo
di un pattern chiamato observer, implementato in questo modo: 

http://doc.qt.digia.com/4.7/signalsandslots.html

Le qt forniscono un' IDE, qtcreator. Questo IDE puo` aprire dei file di progetto
(.pro).

Una volta aperto il file gui.pro , premendo run il codice dovrebbe essere compilato
e partire

#############################################################################
######################### Comunicare con il ros #############################
#############################################################################

To be written.

#############################################################################
######################### accedere al ros tramite ssh #######################
#############################################################################

To be written

#############################################################################
######################### changelog di questo documento ##################### 
#############################################################################

14-12-13 parti vecchie rimosse
12-10-13 creazione
</file>

```
