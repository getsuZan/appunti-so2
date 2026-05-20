# Domande aperte

## Istruzioni
- Inserisci qui eventuali dubbi o risposte ai dubbi elencati.
- Aggiungi nuove domande per le prossime lezioni se necessario.

## Domande
- (Nessun dubbio emerso dalle lezioni 01-04.)

## Dettagli mancanti da integrare (da aggiungere alle lezioni)
- Lezione 09: differenze operative tra `malloc` e `calloc` (inizializzazione, parametri), note su `free` (double free/undefined behavior), dettagli su `memcpy`/`memset`, esercizi su `taxPayers.c` (modifiche richieste) e esempi dai file indicati (pointer.c, arrayPtr.c, heapAlloc.c).
- Lezione 10: distinzione completa syscall vs librerie con esempi (es. `printf`/`write`), sezione man 2 vs man 3, dettagli su `mmap`/`msync`/`munmap` e su `brk`/`sbrk`, note su `realloc` (nuova area non inizializzata), e richiamo a `strace` con parametri mostrati nelle slide.
- Lezione 11: elenco e spiegazione dei flag `open` (accesso, apertura, operativi), differenze `read` vs `fread`, `write` vs buffering, dettagli su `stat` e macro `S_IS*`, `chmod` con maschere (ottali) e `fcntl` lock con `struct flock`, semantica di `select` e macro `FD_*`.
- Lezione 12: tabella attributi ereditati/non ereditati con `fork` ed `exec`, differenze `_exit` vs `exit` e `exit_group`, opzioni `waitpid` (WNOHANG, WUNTRACED, WCONTINUED), uso delle macro `WIF*`.
- Lezione 13: esempi completi di `extern`/`static` su piu' file, differenze visibilita' di funzioni statiche, dettaglio sui puntatori a funzione e riferimenti ai file di esempio (`funptr.c`, `qsort-generic.c`, `oo.*`), comandi base di `gdb` e breakpoint.
- Lezione 14: lista segnali principali con numero/azione predefinita, motivazione del perche' SIGKILL/SIGSTOP non sono gestibili, dettagli su `sigprocmask`/`sigpending`/`sigsuspend`, semantica di pipe (blocco su pipe vuota/piena) e FIFO (blocco in open).
- Lezione 15: differenze tra socket AF_LOCAL/AF_INET/AF_INET6 e tipi `SOCK_STREAM`/`SOCK_DGRAM`, struttura `sockaddr_in` con `sin_port`/`sin_addr`, conversioni `htonl`/`htons`/`inet_aton`, sequenza completa server/client con `fork`.
- Lezione 16: tabella processi vs thread, modelli many-to-one/one-to-one/many-to-many con pro/contro, note su `pthread_attr_*`, semantica `exit`/`_exit`/`pthread_exit` in multithread, cenni su `clone`.
- Lezione 17: riferimenti ai motivi di sicurezza (percentuali vulnerabilita'), dettagli su ownership/borrowing (permessi R/W/O), e note su unit test con `cargo test`.
