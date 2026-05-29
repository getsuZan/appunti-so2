# Sistemi Operativi - II Modulo: Appunti riformulati

Questo file riorganizza gli appunti in forma discorsiva, mantenendo il lessico tecnico. L'ordine segue la progressione del corso: dalla shell e dal filesystem, alla programmazione in C, fino alle system call, ai meccanismi di concorrenza e alla rete.

---

## 1. Primi passi: Shell, Utenti, Filesystem

Un sistema operativo media tra hardware e programmi. L'interazione diretta avviene attraverso una shell (es. Bash), che interpreta comandi testuali e li passa al kernel o alle utility di sistema. La shell mostra un prompt che identifica utente, host e directory corrente e accetta comandi nella forma generale `comando [opzioni] [argomenti]`.

La gestione degli utenti e dei permessi serve a separare responsabilita e limitare i danni. `root` ha privilegi completi, mentre gli utenti ordinari operano con permessi ridotti. `sudo` permette di eseguire un singolo comando con privilegi elevati, se l'utente e autorizzato. Le informazioni sugli utenti e sui gruppi sono registrate in `/etc/passwd` e `/etc/group`.

---

## 2. Il Filesystem

Il filesystem e organizzato come un albero unico con radice `/`. Percorsi assoluti partono da `/`, mentre quelli relativi partono dalla directory di lavoro corrente. Dischi diversi vengono integrati nell'albero tramite il mounting: un filesystem viene innestato su una directory esistente, diventando parte della gerarchia globale.

Un file, a basso livello, e identificato da un inode. L'inode contiene metadati (permessi, proprietario, dimensione) e i puntatori ai blocchi dati. Le directory sono file speciali che mappano nomi a inode. I permessi si applicano a proprietario, gruppo e altri, con le classiche modalita `r`, `w`, `x`, e includono i bit speciali SetUID, SetGID e Sticky Bit.

---

## 3. Comandi di gestione del filesystem

Le operazioni sui file hanno senso se si tiene a mente la separazione tra nome e inode. `mv` dentro lo stesso filesystem cambia solo il nome associato all'inode, senza spostare dati fisici. Gli hard link (`ln`) associano piu nomi allo stesso inode, mentre i link simbolici (`ln -s`) creano un file che contiene un percorso verso un altro file.

I comandi principali svolgono funzioni precise: `cp` copia file o directory, `mv` sposta o rinomina, `rm` rimuove, `touch` crea un file vuoto o aggiorna i timestamp. `ls -l` elenca con permessi, proprietario e dimensioni, mentre `stat` mostra i metadati dell'inode. `chmod` modifica i permessi e `umask` imposta la maschera di default per i nuovi file. Per lo spazio si usano `du` (stima spazio occupato da file e directory) e `df` (uso complessivo del filesystem). `dd` copia dati a basso livello tra dispositivi o file, e `mkfs` crea un nuovo filesystem su un device.

---

## 4. Processi

Un programma e un file eseguibile su disco; un processo e un'istanza in esecuzione. Ogni processo ha un PID e un PCB (Process Control Block) che descrive stato, priorita e risorse. Lo spazio di indirizzamento e suddiviso in segmenti: Text (codice), Data/BSS (dati statici), Heap (allocazioni dinamiche) e Stack (chiamate di funzione).

L'I/O standard e gestito tramite file descriptor: `stdin` (0), `stdout` (1), `stderr` (2). Le ridirezioni usano `>` per scrivere lo standard output su file, `<` per leggere dallo standard input, e `2>` per separare gli errori; la pipe `|` collega lo stdout di un processo allo stdin del successivo. I processi passano attraverso stati come Running, Sleeping, Stopped e Zombie. La gestione interattiva avviene con `&` per lanciare in background, `bg` e `fg` per spostare un job tra background e foreground, `CTRL+Z` per sospendere e `CTRL+C` per inviare un interrupt. `ps` elenca i processi, `top` mostra l'uso di risorse in tempo reale, `kill` invia un segnale (es. terminazione), e `nice` avvia un processo con priorita piu bassa.

---

## 5. Introduzione al C

Il C e un linguaggio a basso livello che riflette il modello di memoria dei processi. Il codice sorgente passa attraverso pre-processing, compilazione e linking per generare l'eseguibile. Le variabili corrispondono a porzioni di memoria di dimensione nota (`char`, `int`, `float`, `double`) e hanno uno scope definito. La funzione `main()` e il punto di ingresso, mentre `#include` porta le dichiarazioni necessarie. L'I/O di base usa `printf` e `scanf` con formati come `%d`, `%f`, `%s`.

---

## 6. Cicli e array

I costrutti iterativi (`while`, `for`, `do-while`) implementano ripetizioni controllate tramite una variabile di controllo e una condizione di uscita. `break` e `continue` alterano il flusso. I blocchi `{ }` definiscono scope locali e possono introdurre shadowing.

Gli array in C sono sequenze contigue di celle omogenee in memoria, dichiarate come `tipo nome[N];`. L'accesso e per indice, ma il linguaggio non esegue controlli di bounds: gli errori di indice causano overflow e comportamenti indefiniti.

---

## 7. Funzioni e stringhe

La decomposizione in funzioni riduce la complessita e rende il codice riutilizzabile. In C il passaggio dei parametri e per valore: la funzione riceve una copia. Per modificare i dati originali si passa l'indirizzo tramite puntatori. Gli array, in pratica, decadono a puntatore al primo elemento.

Le stringhe sono array di `char` terminati da `\0`. Le principali funzioni standard sono `strlen`, `strcpy`, `strcat` e `strcmp`. E fondamentale rispettare le dimensioni dei buffer per evitare overflow.

---

## 8. Progetti multi-file e Makefile

Nei progetti reali il codice e distribuito su piu file `.c` e dichiarazioni in `.h`. Si compila in modo modulare generando file oggetto con `gcc -c` e poi si effettua il linking in un eseguibile unico. Il `Makefile` descrive dipendenze e comandi per ricompilare solo cio che e cambiato, mentre il comando `make` legge il file e decide quali target ricostruire in base ai timestamp. Le regole includono target, prerequisiti e recipe; le variabili semplificano la configurazione. I target fittizi si dichiarano con `.PHONY` (es. `clean`).

---

## 9. Allocazione dinamica, struct e file I/O

Lo stack non basta quando la dimensione dei dati e nota solo a runtime. Si usa quindi l'heap con `malloc` o `calloc`, liberando la memoria con `free`. La mancata liberazione produce memory leak. I puntatori permettono di lavorare con indirizzi; `&` ottiene l'indirizzo, `*` dereferenzia.

Le `struct` raggruppano campi eterogenei in un unico tipo; `typedef` ne semplifica l'uso. Per l'I/O su file si lavora con `FILE *`: si apre con `fopen`, si legge e scrive con `fscanf`, `fgets`, `fputs`, e si chiude con `fclose`. Il buffering rende necessario controllare i valori di ritorno e gestire gli errori.

---

## 10. Chiamate di sistema e system programming

Il codice utente non accede direttamente alle risorse hardware: usa system call che entrano nel kernel in modalita privilegiata. Le librerie standard (libc) offrono wrapper come `printf` e `malloc`, che internamente invocano chiamate come `write` o `brk/mmap`.

Le system call si dividono per categoria: file (`open`, `read`, `write`), processi (`fork`, `exec`), IPC e rete (socket). Gli errori sono segnalati con `-1` e dettagliati tramite `errno`, leggibile con `perror` o `strerror`.

---

## 11. System call per file I/O

Le system call di file I/O lavorano su file descriptor, piccoli interi che identificano file aperti (0 stdin, 1 stdout, 2 stderr). L'uso tipico e' `open` per ottenere il fd, `read`/`write` per operare sui byte, e `close` per chiuderlo. `read` ritorna il numero di byte letti (0 a EOF), `write` puo' scrivere meno di `count` se interrotta e va ripetuta.

I flag di `open` si combinano in OR bitwise e si dividono in modalita di accesso (`O_RDONLY`, `O_WRONLY`, `O_RDWR`), flag di apertura (`O_CREAT`, `O_EXCL`, `O_TRUNC`) e flag operativi (`O_APPEND`, `O_SYNC`). I flag di accesso non sono modificabili dopo l'apertura, mentre quelli operativi possono essere gestiti con `fcntl`.

---

## 12. System call per i processi

I processi in Unix formano una gerarchia con `init` come radice. `fork()` duplica il processo chiamante e crea un figlio, che eredita ambiente, cwd e file descriptor; quando il figlio termina, il padre usa `wait`/`waitpid` per leggere l'exit status ed evitare zombie.

La terminazione puo' avvenire con `_exit` (syscall, termina subito) o `exit` (libreria, svuota gli stream stdio e chiama gli handler). `exec` sostituisce l'immagine del processo mantenendo PID, cwd e fd (salvo `FD_CLOEXEC`). Le funzioni `getpid`, `getppid`, `getuid` e `geteuid` leggono gli identificatori, mentre `setuid`/`setgid` richiedono privilegi.

---

## 13. Funzioni e variabili esterne/statiche, gdb

Le variabili globali sono visibili dal punto di dichiarazione alla fine del file; con `extern` si dichiara una variabile definita in un altro file. Le variabili `static` locali mantengono il valore tra chiamate, mentre le `static` globali e le funzioni `static` sono visibili solo nel file corrente.

La ricorsione permette funzioni che richiamano se stesse, mentre i puntatori a funzione consentono di passare funzioni come argomenti (es. `qsort`). Per il debug, `gdb` usa simboli generati con `-g`; comandi base: `break`, `run`, `next`, `step`, `print`, `backtrace`.

---

## 14. Segnali, pipe, FIFO

I segnali sono interruzioni software asincrone inviate dal kernel o da altri processi: possono derivare da eventi anomali (divisione per zero, segfault, CTRL+C/CTRL+Z) o da eventi normali (terminazione di un figlio, `alarm`, `kill`, `SIGPIPE`). Ogni segnale ha un'azione di default, ma puo' essere ignorato o gestito con un handler; `SIGKILL` e `SIGSTOP` non sono gestibili o bloccabili. La maschera dei segnali (`sigprocmask`) permette di bloccarli, rendendoli pendenti finche non vengono sbloccati.

Le pipe sono canali unidirezionali in memoria creati con `pipe`: leggere da pipe vuota blocca, scrivere su pipe piena blocca, e scrivere senza lettori genera `SIGPIPE`. Le FIFO (`mkfifo`) sono pipe con nome nel filesystem e permettono comunicazione tra processi non imparentati.

---

## 15. Socket

Le socket forniscono comunicazione full-duplex tra processi locali o remoti secondo il modello client-server. Le system call principali sono `socket`, `bind`, `listen`, `accept` lato server e `connect` lato client. I domini piu comuni sono `AF_LOCAL`/`AF_UNIX` (locale) e `AF_INET`/`AF_INET6` (rete); i tipi `SOCK_STREAM` (TCP) e `SOCK_DGRAM` (UDP). In `sockaddr_in` porte e indirizzi devono essere in network byte order (`htons`, `htonl`).

---

## 16. Thread

Un thread e' un flusso di esecuzione dentro un processo: piu thread condividono memoria e risorse, con overhead minore rispetto ai processi ma con rischi di race condition. I modelli principali sono many-to-one, one-to-one e many-to-many; in Linux la libreria pthread implementa il modello one-to-one.

Le funzioni fondamentali sono `pthread_create`, `pthread_join` e `pthread_exit`. `exit()` termina l'intero processo, mentre `pthread_exit()` termina solo il thread chiamante.

---

## 17. Introduzione a Rust

Rust nasce per ridurre gli errori di memoria tipici di C/C++ (buffer overflow, use-after-free) senza garbage collection. Il modello di ownership assegna un unico proprietario a ogni allocazione; il borrowing usa riferimenti `&T` o `&mut T` con la regola "molti immutabili o uno mutabile". Il borrow checker applica queste regole a compile time, prevenendo use-after-free e data race.

---

Questa riformulazione mantiene il filo logico del corso: dal modello di esecuzione e del filesystem, alla programmazione in C, fino alle astrazioni di kernel, concorrenza e rete.
