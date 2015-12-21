# GIT - getting started

[Git](https://registry.hub.docker.com/u/teamdiana/diana/) is an extremely powerful tool that should be also known by non-programmers. Make sure you get the basics before writing any code, and **always** create a new git repo even for small project. 

There are a lot of useful tutorial on the internet. 

Read some basic tutorial in order to get acquainted with the terminology, then try this
interactive tutorial:

https://try.github.io/levels/1/challenges/1

or this for a more visual explanation:

http://pcottle.github.io/learnGitBranching/

then also try to setup a your repository on **github**

https://guides.github.com/activities/hello-world/


## short quickstart (italian): 

```bash

**Guide git**\\
guide brevi (meglio leggerle entrambe)\\
https://docs.google.com/document/edit?id=1kiLCEJqYmNTP0WIyHxKZBUefgVnf45L5fQyELX0XuBw&hl=it\\
http://rogerdudler.github.io/git-guide/index.it.html\\

guida completa:\\
http://git-scm.com/book/it\\

**Comandi git di base:**

''git clone https://esempio.com/progetto/''\\
Serve a scaricare il repository (ovvero tutto, ma proprio tutto, cio` che e` contenuto in git)

''git checkout origin/nome_branch''\\
riporta il codice allo stato di un determinato branch o commit. In questo caso il branch  e` origin/gui-develop\\
il nome prima dello '/' (origin) indica il 'remote' ovvero il repository esterno dal quale prendiamo il branch.\\
di solito origin indica il repo principale (nel nostro caso github)\\

''git branch nome_nuovo_branch'' \\
 Crea un nuovo branch a partire dallo stato attuale (usare git status per vedere il branch attuale)\\

''git push origin nome_branch''\\
 Mette il codice che c'è nel branch nome_branch in origin.\\

''git status''\\
 Visualizza lo stato attuale: indica il nome del branch in cui ci troviamo, i file modificati o creati. gli untracked files sono file ignorati da git, che non verranno salvati e non verranno uploadati.\\
I file che verranno inclusi nel commit sono in **verde**.\\

''git add nome_file''\\
Un file modificato o creato non e` subito aggiunto nel repository. questo file deve essere prima aggiunto. con git add nome_file il file viene aggiunto. dopo aver aggiunto un file, questo file  comparira` in verde in git status.\\

''git commit -m "Ho fatto queste modifiche"''\\
i file che in git status compaiono in verde verranno aggiunti ad un commit. A questo commit associamo un messaggio per ricordare quali modifiche abbiamo fatto.\\

**IMPORTANTE:**
Se si lavora sul rover bisogna specificare l'autore del commit, quindi aggiungere sempre il parametro ''--author="email@provider.com"''\\
e.g.\\
''git commit -m "Ho fatto queste modifiche" --author="Nome Cognome" ''

''git pull origin nome_branch''\\
scarica dal repository online le modifiche fatte dagli altri in nome_branch.\\

''git log --graph''\\
visualizza il log dei committ e l'albero (Q per uscire)

''git log origin/develop --graph''\\
visualizza il log dei committ REMOTI e l'albero (Q per uscire)

''git diff origin/develop --name-only''\\
visualizza i file cambiati in remoto

Ci sono alcuni punti dove git si comporta in maniera poco intuitiva ed e facile cancellare qualche file o perdere il proprio lavoro. Quindi, quando si e` in dubbio, copiare tutta la cartella.\\

**GIT HOW TOs**\\
http://stackoverflow.com/questions/315911/git-for-beginners-the-definitive-practical-guide\\


----

**Workflow:**

Di solito il workflow di sviluppo che si ha con git e` questo:

si hanno due branch principali

master - contiene il codice stabile, funzionante, che possono utilizzare tutti. Non useremo quasi mai questo branch

develop - contiene il codice poco stabile, che ha le nuove features.

Ogni tanto, quando siamo soddisfatti, il codice presente in develop si porta in master.

Quando vogliamo implementare qualcosa, creiamo un nuovo branch
per esempio voglio implementare un nuovo nodo\\

mi assicuro di avere l'ultimo codice disponibile sul server\\

''git fetch origin''\\

mi assicuro di essere su la versione di master presente sul server\\
''git checkout origin/master''\\

creo il nuovo branch\\

''git branch nuovo_nodo''

entro nel nuovo branch\\

''git checkout nuovo_nodo''\\

faccio le mie modifiche (per esempio creo un file main.cpp)\\

aggiungo il file\\

''git add main.cpp''

ho finito le modifiche che volevo fare, ora le salvo:\\

''git commit -m "aggiungo menu.cpp" --author="Nome Cognome"''\\

infine metto il nuovo codice sul server\\

''git push origin nuovo_nodo''

quando il codice nel nuovo branch e` ok, si puo` mettere in develop.\\
per farlo:\\
''git checkout develop''\\
''git merge nuovo_nodo''\\
Questi comandi inseriscono il nuovo codice incluso in //nuovo_nodo// nel branch //develop//\\

Il ciclo viene ripetuto all'infinito. **Non si dovrebbe committare dentro //master// o //develop//**, ma soltanto nei branch separati. Questo permette di fare merge puliti quando esistono diverse versioni del codice, inoltre e` piu` facile trovare quale versione ha introdotto nuovi bug. 

```
