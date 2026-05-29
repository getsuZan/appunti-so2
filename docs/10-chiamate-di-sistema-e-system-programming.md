# Lezione 10 - System programming e chiamate di sistema

## Obiettivi della lezione
- Capire il ruolo delle system call.
- Differenziare system call e funzioni di libreria.
- Gestire errori con `errno`, `perror`, `strerror`.
- Introduzione alla gestione della memoria a basso livello.

## Programmazione di sistema
- Il kernel gestisce risorse: CPU, RAM, I/O.
- Le system call sono punti di accesso al kernel.
- Numero di system call dipende dalla versione (Linux ne ha centinaia).

## System call vs funzioni di libreria
- Entrambe sono funzioni C.
- System call: interfaccia minimale, non sostituibili.
- Funzioni di libreria: piu' comode, spesso usano system call.
- Esempio: `malloc` usa `sbrk`/`mmap`.
- Esempio pratico: `printf` usa `write` per scrivere su stdout.
- Alcune funzioni di libreria non invocano system call (es. `strcpy`, `atoi`).

## Categorie di system call (panoramica)
- File e directory (creazione, lettura/scrittura, attributi).
- IPC locale: pipe e FIFO.
- Socket e networking.
- Gestione memoria.
- Gestione processi e sincronizzazione.
- Segnali e sezione critica.
- Thread POSIX.

## Documentazione
- System call: `man 2 <nome>`.
- Funzioni di libreria: `man 3 <nome>`.
- `man man` mostra la separazione per sezioni.

## Gestione errori
- Molte system call ritornano `-1` in caso di errore.
- In errore, `errno` viene impostato a un codice specifico.
- Usare `errno` solo dopo aver verificato il valore di ritorno.
- Cause tipiche di errore: privilegi insufficienti, risorse esaurite, argomenti invalidi.

### `perror`
```c
void perror(const char *prefix);
```
- Stampa su `stderr`: `prefix: <messaggio>`.

### `strerror`
```c
char *strerror(int errnum);
```
- Converte `errno` in stringa.

## Debug di system call
- `strace` mostra le system call invocate.
- Esempio:
  - `strace -o strace.txt -s 100 /path/to/prog`
- `-p <pid>` per agganciare un processo esistente.
- `-e trace=...` per filtrare system call specifiche.

## Allocazione memoria
- Funzioni di libreria:
  - `malloc`, `calloc`, `realloc`, `free`
- `alloca` alloca sullo stack (non e' system call).

### System call principali
- `mmap`: mappa file o memoria in spazio di indirizzamento.
- `brk`/`sbrk`: modifica data segment del processo.

### `realloc`
- Può spostare l'area di memoria.
- Se fallisce, l'area originale resta valida.
- La nuova area non e' inizializzata.

## Memory leakage
- Non liberare memoria porta a consumi crescenti e possibili crash.
- Usare sempre `free`.

## `memset` e `memcpy`
- `memset` inizializza `n` bytes.
- `memcpy` copia `n` bytes, aree non sovrapposte.

## `mmap`
```c
void *mmap(void *addr, size_t len, int prot,
           int flags, int fd, off_t off);
```
- `MAP_SHARED`: modifiche visibili nel file.
- `MAP_PRIVATE`: copy-on-write.
- `msync` forza la scrittura su disco.
- `munmap` rilascia la mappatura.

### `msync` e `munmap`
```c
int msync(void *addr, size_t len, int flags);
int munmap(void *addr, size_t len);
```
- `msync` chiede al kernel di sincronizzare i dati modificati con il file.
- `munmap` dealloca l'area mappata.

## Esercizi (da slide)
- Gestire errori con `errno` e `perror`.
- Usare `memcpy` per copiare blocchi.
- Programma con `mmap` per invertire maiuscole/minuscole.