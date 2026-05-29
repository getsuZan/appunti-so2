# Lezione 14 - Segnali, pipe, FIFO

## Obiettivi della lezione
- Comprendere i segnali e la loro gestione.
- Usare `signal` e `sigaction`.
- Gestire maschere con `sigprocmask`.
- Introdurre IPC con pipe e FIFO.

## Segnali
- Interruzioni software inviate dal kernel o da altri processi.
- Eventi tipici:
	- CTRL+C -> SIGINT
	- CTRL+Z -> SIGSTOP
	- divisione per zero -> SIGFPE
	- segfault -> SIGSEGV
- Possono anche derivare da eventi non anomali:
	- terminazione di un figlio -> SIGCHLD
	- scadenza di `alarm` -> SIGALRM
	- `kill` tra processi o da terminale
	- dati urgenti su rete -> SIGURG
	- scrittura su pipe senza lettori -> SIGPIPE
- La lista completa dei segnali e' in `<signal.h>`.

### Segnali comuni
- SIGINT, SIGTERM, SIGKILL, SIGSTOP, SIGSEGV, SIGPIPE, SIGALRM.
- SIGKILL e SIGSTOP non sono gestibili o bloccabili.

### Azioni predefinite (esempi)
- SIGSEGV, SIGFPE: terminazione con core dump.
- SIGTERM, SIGINT: terminazione.
- SIGCHLD: ignorato di default.
- SIGSTOP, SIGTSTP: stop del processo.

### Perche' SIGKILL e SIGSTOP non sono gestibili
- Il kernel deve garantire un modo certo per fermare o sospendere un processo.
- Permettere la gestione potrebbe impedire il controllo amministrativo.

## Azioni possibili
- Ignorare (tranne SIGKILL/SIGSTOP).
- Catturare con un handler.
- Azione di default (terminate, core dump, stop, ecc.).

## Maschera dei segnali
- `sigprocmask` modifica la maschera dei segnali bloccati.
- Segnali bloccati diventano pendenti.
- `sigpending` e `sigismember` per ispezionare.

### `sigprocmask`
```c
int sigprocmask(int how, const sigset_t *set, sigset_t *oldset);
```
- `SIG_BLOCK`, `SIG_UNBLOCK`, `SIG_SETMASK`.

## `signal` vs `sigaction`
- `signal` non e' portabile.
- `sigaction` e' la scelta consigliata.

### `sigaction`
```c
int sigaction(int signum, const struct sigaction *act,
							struct sigaction *oldact);
```
- `sa_handler` o `sa_sigaction`.
- `sa_mask` per bloccare segnali durante l'handler.

## Altre system call
- `kill(pid, sig)` invia un segnale.
- `alarm(seconds)` invia SIGALRM.
- `pause()` sospende fino a un segnale.
- `sigsuspend(mask)` sospende con maschera temporanea.

## IPC: Pipe
- Pipe: canale unidirezionale (half-duplex), in memoria.
- `pipe(int pipefd[2])` crea:
	- `pipefd[0]` lettura
	- `pipefd[1]` scrittura
- Lettura da pipe vuota blocca.
- Scrittura su pipe piena blocca.
- Scrittura su pipe senza lettori -> SIGPIPE.

### Semantica di chiusura
- Se il lato di scrittura e' chiuso, `read` ritorna 0 (EOF).
- Se il lato di lettura e' chiuso, `write` fallisce con SIGPIPE.

## IPC: FIFO (named pipe)
- File speciale creato con `mkfifo`.
- Usabile da processi non imparentati.
- Apertura in lettura o scrittura blocca finche' non c'e' l'altro lato.
- Modalita' non bloccante con `O_NONBLOCK`.

## Esercizi (da slide)
- Aggiungere controlli errori in `sigprocmask`.
- Stampare segnali pendenti.
- Gestire SIGINT, SIGTSTP, SIGUSR1 in ciclo.
- Usare pipe in IPC padre/figlio.