# Catkin

[Catkin](http://wiki.ros.org/catkin) is the ROS build system

## How it works
---
```txt
link utili a catkin:
http://wiki.ros.org/catkin/Tutorials
http://wiki.ros.org/catkin/Tutorials/using_a_workspace

Catkin e` buildsystem basato su una serie di script in python e di file CMake.

Gli script in python si trovano in 
/opt/ros/groovy/bin/
/opt/ros/groovy/lib/python2.7/site-packages/catkin/

catkin_init_workspace:
  questo script non fa altro che creare un simlink ad un CMake file:
  "/opt/ros/groovy/share/catkin/cmake/toplevel.cmake"

catkin_make:
  questo script esegue dei controlli prima di partire:
  
  1) Controlla che non ci siano ne' file CMakeLists.txt ne' file package.xml
  Questo significherebbe che ci troviamo in una cartella di un pacchetto da 
  compilare, mentre catkin deve partire nella root del workspace
  2) Crea alcune cartelle, come la build directory, se assenti.
  Le cartelle create automaticamente sono:
    build, devel, src
    Per maggiori informazioni sulle cartelle, vedere
    http://www.ros.org/reps/rep-0128.html
  3) chiama catkin_init_workspace, se il workspace non e` stato creato.
  4) controlla se i parametri da passare a cmake all'interno della cartella src sono stati
  modificati. Vedi builder.py. Se si chiama CMake
  5) Se non rivela alcun makefile, chiama cmake
  6) a cmake vengono passati automaticamente questi parametri:

  -DCATKIN_DEVEL_PREFIX= devel_path ovvero la cartella dove verrano compilati
  gli eseguibili

  -DCMAKE_INSTALL_PREFIX= install_path ovvero la cartella dove verranno
  copiati gli eseguibili quando si da l'install
  7) cmake viene chiamato nella cartella build, ma puntando al CMakeLists.txt 
  presente in src (quello creato da catkin_init_workspace). Vedi
  src/CMakeLists.txt
  9) viene chiamato make, sempre nella cartella di root

src/CMakeLists.txt
  Questo file e` un simlink a
  /opt/ros/groovy/share/catkin/cmake/toplevel.cmake
  Di default questo file cmake carica tutti i files cmake presenti in 
  /opt/ros/groovy/share/catkin/cmake/
  questi files contengono funzioni di cmake.
  Ad esempio, la funzione chiamata da src/CMakeLists.txt che avvia il processo
  di build e` catkin_workspace() e si trova in 
  /opt/ros/groovy/share/catkin/cmake/catkin_workspace.cmake

catkin_workspace.cmake
  Questo file cmake chiama order_packages.cmake per creare l'elenco dei
  pacchetti da compilare.
  Questo elenco viene poi processato uno alla volta per vedere se e` conforme.
  Se il pacchetto e` conforme, viene scritto il messaggio:
  ==> add_subdirectory nome_pacchetto.
  la funzione finisce qui. Ogni pacchetto e` stato aggiunto tramite la
  funzione nativa di cmake add_subdirectory(). Ora per ogni subdirectory
  aggiunta partira` automaticamente cmake, che processa il file CMakeLists.txt
  contenuto nella cartella.

order_packages.cmake
  Questo file e` generato on-the-fly grazie ad EmPy. 
  La creazione dell'elenco dei pacchetti avviene grazie a python.
  Un pacchetto viene aggiunto alla lista quando la cartella del pacchetto
  contiene due files:
    CMakeLists.txt
    package.xml
  vedi http://wiki.ros.org/catkin/Tutorials/CreatingPackage
  Se questi file sono assenti, la cartella viene semplicemente ignorata.

builder.py
  questo e` lo script che realmente chiama cmake e process l'output di questo.

  cmake_input_changed(): confronta i parametri nuovi con quelli vecchi,
    salvati nel file catkin_make.cache

comandi:
  catkin_make install non fa altro che chiamare make install nella cartella
  build:
  cd ~/catkin_ws/build && make instal'

TROUBLESHOOTING:
  manca il file package.xml, c'e` soltanto manisfest.xml:
    http://wiki.ros.org/catkin/migrating_from_rosbuild

NOTE:

Naturalmente per altre versioni del ros i path sono nella forma:
/opt/ros/VERSIONE/
per esempio per l'ultima versione:
/opt/ros/hydro/
```
