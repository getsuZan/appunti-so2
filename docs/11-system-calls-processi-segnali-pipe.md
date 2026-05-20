# Lezione 11 - System call per file I/O

## Obiettivi della lezione
- Usare system call per file I/O.
- Comprendere file descriptor, flag e stati.
- Conoscere `open`, `read`, `write`, `close`.
- Altre syscalls: `stat`, `chmod`, `fcntl`, `select`.

## File descriptor
- Intero piccolo che identifica un file aperto.
- Standard:
  - 0: stdin
  - 1: stdout
  - 2: stderr
- I fd sono riutilizzati quando un file viene chiuso.

## Flag associati
- File status flags: modalita' di accesso, apertura, operazione.
- File descriptor flags: proprieta' del fd, indipendenti dal file.
- Combinazione tramite OR bitwise.

### Categorie principali
- Modalita' accesso: `O_RDONLY`, `O_WRONLY`, `O_RDWR`.
- Apertura: `O_CREAT`, `O_EXCL`, ecc.
- Operative: `O_APPEND`, `O_SYNC`, `O_TRUNC`.

### Note sui flag di `open`
- I flag di accesso non sono modificabili dopo l'apertura.
- `O_CREAT` richiede il parametro `mode` (es. 0644).
- `O_TRUNC` tronca il file a zero se e' apribile in scrittura.

## `open`
```c
int open(const char *pathname, int flags);
int open(const char *pathname, int flags, mode_t mode);
```
- Ritorna fd o `-1`.
- `O_CREAT` richiede `mode` (permessi).

## `read`
```c
ssize_t read(int fd, void *buf, size_t count);
```
- Ritorna bytes letti, 0 a EOF, `-1` su errore.

### `read` vs `fread`
- `read` lavora su byte e non usa buffering.
- `fread` lavora su `FILE *` con buffering e dimensioni di elemento.

## `write`
```c
ssize_t write(int fd, const void *buf, size_t count);
```
- Ritorna bytes scritti o `-1`.
- Può scrivere meno di `count`.

### Nota su scritture parziali
- Se `write` scrive meno di `count`, occorre ripetere la scrittura.

## `close`
```c
int close(int fd);
```
- Ritorna 0 o `-1`.

## `fopen` vs `open`
- `fopen` restituisce `FILE *` con buffering.
- `open` restituisce fd e lavora a livello byte.

## Altre syscall utili
- `dup`: duplica fd.
- `stat`/`fstat`: informazioni su file.
- `chmod`/`fchmod` e `chown`.
- `rename`, `mkdir`, `rmdir`, `chdir`.

### `stat`
- Usa `struct stat`.
- Macro: `S_ISREG`, `S_ISDIR`, `S_ISLNK`, ecc.

### `chmod` e maschere
- I permessi sono maschere ottali (es. 0755).
- Maschere predefinite: `S_IRUSR`, `S_IWUSR`, `S_IXUSR`, `S_IRGRP`, `S_IROTH`, ecc.

### `chmod`
- Permessi con maschere (`S_IRUSR`, `S_IWUSR`, ecc.).

## Directory API (libreria)
- `opendir`, `readdir`, `closedir`.
- `readdir` restituisce `struct dirent` o `NULL` a fine elenco.

## `fcntl`
- Gestione flag e lock su fd.
- `F_GETFL`, `F_SETFL` per flag.
- Lock con `struct flock`:
  - `F_SETLK`, `F_SETLKW`, `F_GETLK`.
- Lock advisory: richiede cooperazione.

### `struct flock`
```c
struct flock {
  short l_type;   /* F_RDLCK, F_WRLCK, F_UNLCK */
  short l_whence; /* SEEK_SET, SEEK_CUR, SEEK_END */
  off_t l_start;
  off_t l_len;
  pid_t l_pid;
};
```

## `select`
```c
int select(int nfds, fd_set *readfds,
           fd_set *writefds, fd_set *exceptfds,
           struct timeval *timeout);
```
- Attende fd pronti per I/O.
- Ritorna numero di fd pronti o `-1`.
- Macro: `FD_ZERO`, `FD_SET`, `FD_CLR`, `FD_ISSET`.

### Timeout in `select`
- `timeout = NULL`: attesa infinita.
- `timeout = {0,0}`: polling non bloccante.

## Esercizi (da slide)
- Copiare file usando `read`/`write`.
- Invertire blocchi di dimensione `n`.
- Esplorare directory e copiare file in base ai permessi.