# Lezione 2 - Il filesystem

## Obiettivi della lezione
- Definire filesystem, directory, file e struttura ad albero.
- Capire percorsi assoluti/relativi e la directory di lavoro corrente.
- Usare comandi base (`ls`, `cd`, `mkdir`, `touch`, `tree`).
- Comprendere mounting e partizioni.
- Introdurre inode e attributi dei file.
- Capire permessi e attributi speciali.

## Concetti base di filesystem
- Un filesystem organizza la memoria di massa usando:
  - file (sequenze di bit)
  - directory (contenitori di file e altre directory)
- Struttura gerarchica ad albero:
  - solo le directory possono avere figli
  - i file sono foglie
- Esistono file non regolari (es. device file, raw access, ecc.).

## Radice e unicita' dei nomi
- In Unix/Linux esiste un unico filesystem principale con radice `/`.
- Tutto e' contenuto direttamente o indirettamente in `/`.
- In una stessa directory non possono coesistere:
  - due file con lo stesso nome
  - due directory con lo stesso nome
  - un file e una directory con lo stesso nome
- I nomi sono case-sensitive: `Amore.txt` diverso da `amore.txt`.

## Cammini (path)
- Un path assoluto parte da `/`.
  - Esempio: `/home/utente1/dir1/dir11/dir112/file.pdf`
- `~` e' una scorciatoia alla home dell'utente:
  - `~/dir1/dir11/dir112/file.pdf` equivale a `/home/userX/...`

## Directory di lavoro corrente (cwd)
- `pwd` mostra la cwd.
- `cd [path]` cambia directory.
- `cd` senza argomenti torna alla home.
- Nel path:
  - `..` = directory genitore
  - `.` = directory corrente

### Esercizio (da slide)
- Dopo `mkdir ~/Immagini` e `mkdir ~/Immagini/faces`:
  - Cwd dopo `cd Immagini/../Immagini/faces/`?
  - Da quale cwd `cd ../.././Immagini/./faces/` porta a `~/Immagini/faces`?

## Path assoluto vs relativo
- Path assoluto: valido indipendentemente dalla cwd.
- Path relativo: dipende dalla cwd.

## Elenco contenuto: `ls`
- `ls` mostra il contenuto della cwd.
- `ls nomedir` mostra il contenuto di una directory specifica.
- File nascosti iniziano con `.`:
  - `.bash_history` (history)
  - `.bashrc` (configurazione bash)
- `ls -a` / `ls --all` mostra i file nascosti.

### Ricorsione e albero
- `ls -R` mostra ricorsivamente sotto-directory.
- `tree [-a] [-L maxdepth] [-d] [-x] [nomedir]` mostra l'albero.
  - Se non installato: `sudo apt install tree`.

## Creazione di directory e file
- `mkdir [-p] nomedir`
  - crea una directory.
  - `-p` crea l'intero path (se non esistente).
- `touch nomefile`
  - crea un file vuoto se non esiste.
- Per modificare file:
  - editor grafici o terminale: `gedit`, `nano`, `vi`.

### Esercizio (da slide)
1. Creare l'albero `/home/utente1/dir1/dir3/dir7/`.
2. Entrare in `dir7`, poi tornare in `dir1` usando e non usando `..`.
3. Creare un file vuoto in `dir7` e modificarlo con un editor.

## Filesystem root e mounting
- Il filesystem root `/` puo' includere:
  - disco interno
  - filesystem su USB
  - filesystem di rete
  - filesystem virtuali del kernel
  - filesystem in RAM
- Questo e' possibile grazie al mounting: un filesystem viene reso visibile in un punto della gerarchia.

### Montaggio
- Una directory `D` puo' diventare punto di mount per un filesystem `F`.
- Dopo il mount, la root di `F` e' accessibile da `D`.
- Se `D` contiene file prima del mount, quei file non sono persi: riappaiono dopo l'unmount.

### Partizioni
- Un disco puo' avere piu' partizioni.
- Esempio:
  - Partizione A su `/` (sistema operativo)
  - Partizione B su `/home` (dati utenti)
- Vantaggi:
  - reinstallazione OS senza perdere i dati
  - montare la stessa `/home` su un nuovo OS

## Tipi di filesystem
- Caratteristiche visibili all'utente:
  - dimensione massima partizione
  - dimensione massima file
  - lunghezza massima nome file
  - journal (sistema di logging)
- Per il programmatore, il tipo di filesystem determina la codifica dei dati su disco.
- Esempi non Linux: NTFS, FAT16/32/64.
- `mount` gestisce i filesystem montati; consultare `man mount`.

## Comandi `mount` e file di configurazione
- `mount` mostra i filesystem montati.
- `cat /etc/mtab` mostra i mount correnti.
- `cat /etc/fstab` mostra i mount al bootstrap.
- `cat` concatena e stampa il contenuto di file.

## File di sistema utenti e gruppi
- `/etc/passwd` contiene gli utenti.
- `/etc/group` contiene i gruppi.
- Sono file di testo con struttura definita.
- Struttura di `/etc/passwd`:
  `username:password:uid:gid:gecos:homedir:shell`
  - spesso la password e' `x` (hash in file separato).
- Struttura di `/etc/group`:
  `groupname:password:groupID:lista utenti`
  - lista utenti separata da `,`.
- Linee che iniziano con `#` sono commenti.

### Esercizio (da slide)
- Verificare che `utente3` non sia in `/etc/passwd`, crearlo, poi ricontrollare.
- Verificare che `utente3` non sia nel gruppo `sudo`, aggiungerlo e ricontrollare.

## Inode e attributi
- Ogni file e' rappresentato da una struttura dati inode, identificata da un inode number univoco.
- Alla cancellazione, l'inode number viene liberato e potra' essere riusato.

### Attributi principali dell'inode
- Tipo del file (regular, block, fifo, ecc.).
- User ID e Group ID proprietari.
- Permessi (read/write/execute) per owner, group, others.
- Dimensione in byte.
- Timestamps:
  - `ctime`: cambio attributi inode
  - `mtime`: modifica contenuto
  - `atime`: accesso in lettura
- `link count`: numero di hard link.
- `data pointers`: puntatori ai blocchi del file.
- Per directory: contenuto su disco = tabella `(nome, inode number)`.

### Visualizzazione attributi
- `ls` con opzioni:
  - `-i` mostra inode number
  - `-l` mostra permessi, user, group, date, size
  - `-n` mostra UID/GID numerici
  - `-c` con `-l`: mostra `ctime`
  - `-u` con `-l`: mostra `atime`
- `stat` mostra informazioni dettagliate:
  - `stat filename`
  - `stat -c %B filename` dimensione del blocco su disco

## Dimensioni directory e `ls`
- La dimensione di una directory e' la dimensione del file speciale che contiene le coppie `(nome, inode)`.
- Il numero dopo i permessi in `ls -l` indica quanti link (per directory include `.` e `..`).
- `ls -l` mostra anche `total`: dimensione in blocchi della directory corrente.

## Permessi di accesso
- Permessi definiti su tre categorie: owner, group, others.
- Per file:
  - `r` = lettura
  - `w` = scrittura (sovrascrivere/append)
  - `x` = esecuzione
- Per directory:
  - `r` = elencare contenuto
  - `x` = attraversare/impostare come cwd
  - `w` = creare/cancellare voci nella directory

### Permessi speciali
- Sticky bit (`t`):
  - utile sulle directory
  - impedisce la cancellazione di file se non si e' proprietari del file
- Setuid (`s`):
  - solo su eseguibili
  - il processo gira con i privilegi del proprietario del file
- Setgid (`s`):
  - analogo del setuid per i gruppi
  - su directory impone che i file creati ereditino il gruppo della directory

### Visualizzazione permessi speciali
- `ls` e `stat` mostrano `s` o `t` al posto del bit di esecuzione.
- Minuscolo se il bit di esecuzione e' presente, maiuscolo se assente.
- Esempio da provare: `stat /tmp /usr/bin/passwd`.

## Modifica permessi e proprieta'
- `chmod mode[, mode...] filename`
  - modalita' ottale: 4 cifre (speciali + owner/group/others)
  - oppure modalita' simbolica: `[ugoa][+-=][perms...]`
- `chown [-R] proprietario file`
- `chgrp [-R] gruppo file`
  - richiedono privilegi di root

### Esercizi (da slide)
- Impostare permessi con ottale e simbolico (inclusi setuid/setgid/sticky).
- Verificare effetti di `ctime` dopo `chmod`.
- Esercitarsi con `chown` e `chgrp` su directory e file.
- Provare casi pratici di sticky bit e setuid.