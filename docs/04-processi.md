# Lezione 4 - Processi

## Obiettivi della lezione
- Definire cosa e' un processo in Unix/Linux.
- Capire stdin/stdout/stderr e la ridirezione.
- Conoscere PID, PCB e aree di memoria.
- Gestire processi in foreground/background.
- Usare comandi: `ps`, `top`, `kill`, `nice`, `renice`, `strace`.

## Processo
- Entita' fondamentali di Unix/Linux:
  - File: rappresentano risorse e dati
  - Processi: eseguono programmi e usano risorse
- Un processo e' un file eseguibile in esecuzione.
- Un file eseguibile puo' essere lanciato piu' volte: ogni lancio crea un nuovo processo.
- Il sistema e' multiprocesso (multitasking).

### Comandi che NON creano processi
- Alcuni comandi sono built-in della shell:
  - `cd`, `echo`, ecc.
- Vengono eseguiti dentro il processo della shell (bash).

## Canali standard
- Ogni processo ha tre canali:
  - `stdin` (0): input, default tastiera
  - `stdout` (1): output, default schermo
  - `stderr` (2): errori/diagnostica, default schermo
- I tre canali possono essere ridirezionati indipendentemente.

### Ridirezione
- `>` e `<` ridirezionano output e input.
- Esempi:
  - `ls > dirlist` (stdout su file)
  - `ls > dirlist 2>&1` (stdout e stderr su file)
  - `ls 2>&1 > dirlist` (stderr su stdout, poi stdout su file: l'ordine conta)
- Nota: la ridirezione non e' transitiva; l'ordine e' cruciale.

### Esempi con `cat`
- `cat` senza argomenti copia stdin su stdout.
- `cat > fileditesto` scrive su file.
- `cat < fileditesto` legge da file.

## Identificatori e strutture dei processi

### PID
- PID = Process IDentifier, univoco in un dato istante.
- Quando un processo termina, il PID puo' essere riutilizzato.
- In Linux, i PID possono essere assegnati in modo pseudo-casuale per aumentare la sicurezza.

### PCB (Process Control Block)
- Contiene informazioni del processo:
  - PID, PPID
  - Real UID/GID
  - Effective UID/GID
  - Saved UID/GID
  - cwd, umask
  - nice (priorita' statica)

#### Saved UID
- Permette a un processo con privilegi elevati (es. setuid root) di:
  - eseguire parti con privilegi ridotti
  - poi recuperare i privilegi originari
- Buona pratica: usare privilegi elevati solo quando necessario.

## Aree di memoria del processo
- Text segment: istruzioni eseguibili.
- Data segment: dati statici inizializzati.
- BSS: dati statici non inizializzati.
- Heap: memoria dinamica (`malloc`, ecc.).
- Stack: chiamate di funzione e variabili locali.
- Memory Mapping Segment: librerie dinamiche e mappature.

### Condivisione
- Il text segment puo' essere condiviso tra istanze.
- BSS, Data segment e Memory Mapping Segment possono essere condivisi in casi specifici.
- Stack non e' condivisibile.

## Stati dei processi
- Running (R): in esecuzione.
- Runnable (R): pronto per essere eseguito.
- Interruptible Sleep (S): in attesa di un evento.
- Uninterruptible Sleep (D): I/O non interrompibile.
- Zombie (Z): terminato, PCB ancora presente (padre non ha letto exit status).
- Stopped (T): stoppato da segnale STOP.
- Traced (t): in debug o in attesa di segnali.

## Foreground e background
- Foreground:
  - comando legge da tastiera e scrive su schermo
  - finche' non termina, il prompt non torna
- Background:
  - comando non legge da tastiera
  - prompt torna subito
- Lanciare in background con `&`.

### Job control
- `jobs [-l] [-p]` mostra la lista dei job.
- `bg` manda un job in background.
- `fg %n` porta un job in foreground.
- Identificatori job:
  - `%n` numero job
  - `%%` o `%+` ultimo job
  - `%-` penultimo job
  - `%prefix` per match sul comando

## Pipeline
- Sintassi: `comando1 | comando2 | ... | comandoN`
- Stdout di `i` diventa stdin di `i+1`.
- `|&` collega stderr al stdin del comando successivo.

## `ps`
- Mostra informazioni sui processi in esecuzione.
- Legge informazioni da `/proc`.
- `ps` senza argomenti mostra i processi dell'utente in quella shell.

### Opzioni principali
- `-e`: tutti i processi.
- `-u {utente, }`: processi di utenti specifici.
- `-p {pid, }`: processi con PID specifici.
- `-o {field, }`: scelta dei campi.
- `-f`, `-l`: output esteso.

### Campi importanti
- `PPID`: PID del processo padre.
- `C`: percentuale CPU (parte intera).
- `STIME`/`START`: ora o data di avvio.
- `TIME`: CPU usata.
- `CMD`: comando.
- `F`: flag (fork, superuser, ecc.).
- `S`: stato (R, S, Z, T, D, t).
- `UID`: utente reale.
- `PRI`, `NI`: priorita' e niceness.
- `RSS`: memoria residente (con `-y -l`).
- `SZ`: dimensione totale in pagine.
- `WCHAN`: funzione kernel in cui il processo e' in attesa.

## `top`
- `top` e' un `ps` interattivo.
- `-b`: batch (non interattivo).
- `-n num`: numero aggiornamenti.
- `-p {pid, }`: filtra per PID.

## `kill`
- Invia segnali ai processi.
- `kill -l` mostra lista segnali.
- Un segnale puo' essere indicato con numero o nome:
  - `kill -9 pid` = `kill -s SIGKILL pid`.
- Il segnale e' accettato se il real user coincide o se l'utente e' root.

### Segnali comuni
- `SIGSTOP`, `SIGSTP`: sospensione.
- `SIGCONT`: ripresa.
- `SIGKILL`, `SIGINT`: terminazione.
- `CTRL+z` invia `SIGSTOP`.
- `CTRL+c` invia `SIGINT`.

### SIGUSR1 e SIGUSR2
- Segnali per uso applicativo.
- Si possono gestire con signal handler per comunicazione tra processi.

## Priorita' dei processi
- `nice [-n num] comando` lancia un processo con niceness.
- Niceness da `-19` (massima priorita') a `+20` (minima priorita').
- `renice priority {pid}` modifica processi gia' in esecuzione.

## Tracing
- `strace [-p pid] [comando]` mostra le system call.
- `-o filename` salva su file.
- Utile per debugging di programmi con chiamate di sistema.

## Esercizi (da slide)
- Provare job control con `sleep` e `ls -R`.
- Usare `ps` per replicare l'output di `top -b -n1`.
- Eseguire `kill` con segnali diversi.
- Testare l'effetto di `SIGUSR1` su processi come `dd` o `sleep`.