# Lezione 3 - Comandi di gestione del filesystem

## Obiettivi della lezione
- Consolidare i comandi di gestione file/directory.
- Capire umask e creazione di file/directory.
- Comprendere cp, mv, rm, ln, touch, du, df, dd, mkfs.

## Riepilogo (da lezione precedente)
- inode e attributi dei file
- comandi per visualizzare attributi: `ls`, `stat`, `tree`
- creazione file e directory
- filesystem e mounting
- file `/etc/passwd` e `/etc/group`
- permessi di accesso e comandi `chmod`, `chown`, `chgrp`

## `umask` (file mode creation mask)
- Sintassi: `umask [mode]` (descritta nel `man bash`).
- Imposta la maschera applicata ai permessi di default quando si crea un file o una directory.
- Permessi creati:
  - Directory: `0777 AND NOT(umask)`
  - File regolari: `0666 AND NOT(umask)`
- I bit speciali non vengono impostati dalla creazione standard.
- Per i file, il bit di esecuzione non viene impostato di default.

### Esercizio (da slide)
1. Impostare umask in modo che nuovi file e directory abbiano permessi `664`.
2. Modificare umask per ottenere directory `775` e file `664`.

## `cp`
- Sintassi: `cp [-r] [-i] [-a] [-u] {filesorgenti} filedestinazione`
- Opzioni principali:
  - `-r`: copia ricorsiva di directory
  - `-i`: chiede conferma prima di sovrascrivere
  - `-u`: copia solo se il sorgente e' piu' recente della destinazione
  - `-a`: preserva attributi (archiviazione)

### Esercizi (da slide)
- Verificare le opzioni e casi con 2 o piu' sorgenti (file e directory).

## `mv`
- Sintassi: `mv [-i] [-u] [-f] {filesorgenti} filedestinazione`
- Sposta o rinomina file/directory.
- Opzioni `-i` e `-u` analoghe a `cp`.
- `-f` forza la sovrascrittura.

### Esercizio (da slide)
- Ripetere gli esercizi di `cp` usando `mv`.

## `rm`
- Sintassi: `rm [-f] [-i] [-r] {file}`
- Cancella file o directory.
- Non c'e' cestino.
- `-r` necessario per directory.
- `-i` chiede conferma, `-f` forza.

### Esercizio (da slide)
- Creare un file, osservare il suo inode, cancellarlo e ricrearne uno: verificare il possibile riutilizzo dell'inode.

## `ln` (link)
- Sintassi: `ln [-s] sorgente [destinazione]`
- Default: hard link.
- `-s`: crea un link simbolico (soft link).
- Hard link:
  - non esiste concetto di "puntatore" e "puntato"; entrambi i nomi referenziano lo stesso inode.
- Soft link:
  - e' un file che punta al path del file target.
  - puo' essere "spezzato" se il target non esiste.

### Esercizi (da slide)
- Riprodurre lo scenario con `dd` e `ln` per osservare inode e link.
- Ripetere con `ln -s` e osservare le differenze.
- Notare che `ln -s` non verifica l'esistenza del sorgente.

## `touch`
- Sintassi: `touch [-a] [-m] [-t timestamp] {file}`
- Aggiorna i timestamp di un file; se non esiste lo crea.
- Può essere applicato a directory.
- `-t` imposta un timestamp specifico.

### Esercizio (da slide)
- Trovare almeno due casi in cui `touch` non riesce a creare un file.

## `du`
- Sintassi: `du [-c] [-s] [-a] [-h] [--exclude=PATTERN] [files...]`
- Calcola la dimensione occupata da file e directory.
- `-s`: totale sintetico.
- `-a`: include i file.
- `-h`: formato leggibile.

### Esercizio (da slide)
- Provare su directory standard (es. `/etc`).

## `df`
- Sintassi: `df [-h] [-l] [-i] [file]`
- Mostra dimensione e uso dei filesystem.
- `-i` mostra uso degli inode.

### Esercizio (da slide)
- Visualizzare statistiche di tutti i filesystem e del filesystem contenente `/etc/passwd` e `/proc`.

## `dd`
- Sintassi: `dd [opzioni]` con opzioni in forma `variabile=valore`.
- Variabili importanti:
  - `bs`: dimensione blocco in lettura/scrittura
  - `count`: numero blocchi
  - `if`: file input (default: stdin)
  - `of`: file output (default: stdout)
  - `convert`: conversioni (es. maiuscolo/minuscolo)
- Utile per copiare file speciali o parti di file.

### Esercizi (da slide)
- Copiare una porzione di file tra byte 10 e 20, con `bs=1` e `bs=10`.
- Duplicare il contenuto copiato nello stesso file di destinazione.

## `mkfs`
- Sintassi: `mkfs [-t type fsoptions] device`
- Crea un filesystem su un device (formattazione).
- `type` = tipo filesystem (es. ext3, ext4).
- `fsoptions` include `ro` o `rw`.
- `device` puo' essere:
  - un file device in `/dev`
  - un file regolare (es. creato con `dd`)
- Il device non deve essere montato.

### Esempio completo (da slide)
- Creazione file virtuale con `dd`, formattazione con `mkfs`, mount, operazioni su file, umount.

## Note importanti
- Molti esercizi richiedono privilegi di root.
- Leggere sempre `man` per dettagli e opzioni complete.