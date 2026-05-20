# Lezione 12 - System call per i processi

## Obiettivi della lezione
- Capire la gerarchia dei processi.
- Usare system call di creazione/terminazione.
- Gestire `fork`, `exec`, `wait`.
- Gestire ambiente di processo.

## Gerarchia dei processi
- `init` (PID 1) e' il genitore di tutti i processi.
- `fork()` duplica il processo chiamante.
- `pstree` mostra l'albero dei processi.

## Nascita e morte
- Un processo eredita codice e parte dello stato.
- Quando termina, ritorna un exit status al genitore.
- Se il genitore termina prima, il figlio e' adottato da `init`.

### Stato zombie
- Processo terminato, PCB mantenuto fino a `wait`.
- Serve per permettere al genitore di leggere l'exit status.

## System call di base
- `getpid`, `getppid`, `getuid`, `geteuid`.
- `setuid`, `setgid` (richiedono privilegi).

## `fork`
```c
pid_t fork(void);
```
- Ritorna due volte:
  - al genitore: PID del figlio
  - al figlio: 0
- Ritorna `-1` su errore.

### Attributi ereditati e non ereditati
- Ereditati: UID/GID reali, cwd, ambiente, file descriptor aperti, maschera segnali.
- Non ereditati: PID, contatori risorse, timer, lock.

### Attributi ereditati
- UID/GID reali, cwd, ambiente, fd aperti.
- Non ereditati: PID, timers, contatori risorse, lock.

## Terminazione: `_exit` vs `exit`
- `_exit` (syscall): termina subito, non svuota buffer stdio.
- `exit` (libreria): chiama handler `atexit`, svuota buffer.

### Nota su Linux
- La syscall `_exit` termina un singolo thread.
- La syscall `exit_group` termina tutti i thread del processo.
- La wrapper `_exit()` in glibc invoca `exit_group`.

## `abort`
- Invia SIGABRT, termina in modo anomalo.

## `wait` e `waitpid`
```c
pid_t wait(int *status);
pid_t waitpid(pid_t pid, int *status, int options);
```
- Permettono di raccogliere l'exit status dei figli.
- Evitano zombie.

### Opzioni `waitpid`
- `WNOHANG`: ritorna subito se nessun figlio ha cambiato stato.
- `WUNTRACED`: ritorna anche per figli stoppati.
- `WCONTINUED`: ritorna anche per figli ripresi da SIGCONT.

### Macro di stato
- `WIFEXITED`, `WEXITSTATUS`.
- `WIFSIGNALED`, `WTERMSIG`.
- `WIFSTOPPED`, `WSTOPSIG`.
- `WIFCONTINUED`.

## `exec` family
- Sostituisce l'immagine del processo corrente.
- `execve` e' la syscall di base.
- Varianti: `execl`, `execv`, `execvp`, ecc.
- Se successo, non ritorna.

### `execve`
```c
int execve(const char *filename,
           char *const argv[],
           char *const envp[]);
```
- `argv[0]` deve essere il nome del programma.
- `envp` definisce il nuovo ambiente.

### Attributi mantenuti con `exec`
- Mantiene: PID, PPID, cwd, file descriptor (salvo `FD_CLOEXEC`), maschera segnali.
- Non mantiene: memoria del processo, mapping, timer.

## Ambiente di processo
- Array di stringhe `KEY=VALUE` terminato da `NULL`.
- Ereditato dal genitore.
- Accessibile con `environ`.

### Funzioni utili
- `getenv`, `setenv`, `putenv`, `unsetenv`, `clearenv`.

## Cambiare directory
- `chdir` cambia cwd.
- `chroot` cambia root directory del processo.

## Esercizi (da slide)
- Usare `fork` e scrivere su file da genitore/figlio.
- Usare `wait` per evitare zombie.
- Sostituire il processo figlio con un `exec`.