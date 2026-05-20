# Comandi Gestione Filesystem

## Intuizione Logica
Una volta che capisci che un file e' in realta' solo l'interfaccia verso un `inode`, i comandi Unix ottengono senso logico. Quando "muovi" (`mv`) un file nella stessa partizione, stai solo cambiando la stringa associata all'inode, i dati non si spostano mai di un millimetro fisicamente. Creare un **Hard Link** (`ln`) significa dare due nomi diversi allo stesso inode. Creare un **Soft Link** (`ln -s`) significa creare un nuovo inode il cui contenuto dice al SO: "vai a cercare quell'altro percorso".

## Punti Chiave
- **Gestione file**: `cp` (copia), `mv` (sposta/rinomina), `rm` (rimuovi), `touch` (cambia timestamp / crea).
- **Link**: Hard link (stesso inode), Soft/Symbolic link (file puntatore testuale).
- **Ispezione e Permessi**: `ls -l`, `stat`, `chmod` (cambia permessi ottali/simbolici), `umask` (maschera permessi default all'atto della creazione).
- **Spazio e Formattazione**: `du`, `df`, `dd`, `mkfs` (per formattare).
