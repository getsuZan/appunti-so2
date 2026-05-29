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

## 11. Processi, segnali e pipe

### Flag di open e file descriptor

Nel file I/O a basso livello, `open` riceve un insieme di flag combinati con OR bitwise. I flag si dividono in file status flags (associati all'open file description, quindi condivisi da fd duplicati con `dup` e che condividono anche l'offset) e file descriptor flags (associati al singolo fd). Il flag di descriptor piu comune e `FD_CLOEXEC`, che chiude il fd in caso di `exec` riuscita; lo stesso effetto si ottiene con `O_CLOEXEC` in `open`. Con `fcntl(F_SETFL)` si possono modificare solo alcuni flag operativi (tipicamente `O_APPEND` e `O_NONBLOCK`), non la modalita di accesso.

Le modalita di accesso sono mutualmente esclusive e mascherate da `O_ACCMODE`: `O_RDONLY` apre in sola lettura, `O_WRONLY` in sola scrittura, `O_RDWR` in lettura e scrittura. Questa scelta non puo essere cambiata dopo l'apertura.

I flag di apertura includono: `O_CREAT`, che crea il file se non esiste e richiede il parametro `mode` (permessi) che viene mascherato dalla `umask`; `O_EXCL`, che usato con `O_CREAT` fa fallire l'apertura se il file esiste gia (utile per evitare race di creazione); `O_TRUNC`, che se il file esiste, e un file regolare, e la modalita di accesso consente la scrittura, tronca il file dalla posizione 0 portandone la dimensione a zero; `O_DIRECTORY`, che fallisce se il path non e una directory; `O_NOFOLLOW`, che fallisce se il path finale e un symlink; `O_NOCTTY`, che evita che un terminale diventi controlling terminal del processo; `O_TMPFILE`, che crea un file temporaneo senza nome nella directory, visibile solo tramite il fd finche rimane aperto.

I flag operativi includono: `O_APPEND`, che forza ogni `write` ad avvenire in coda (il kernel imposta l'offset alla fine in modo atomico prima della scrittura, anche se si e fatto `lseek`); `O_NONBLOCK`, che rende non bloccanti apertura e I/O su FIFO, pipe, socket e dispositivi (su file regolari in genere non ha effetto), con possibili errori `EAGAIN`/`EWOULDBLOCK`; `O_SYNC`, che richiede il completamento su storage di dati e metadati prima del ritorno di `write`; `O_DSYNC`, che sincronizza i dati e solo i metadati necessari per recuperarli; `O_RSYNC`, che estende la semantica sincrona anche alle letture secondo quanto previsto dallo standard.

La creazione dei processi in Unix avviene con `fork`, che duplica il processo corrente. Il figlio puo poi sostituire il proprio codice con `exec`, mentre il padre attende la terminazione con `wait` per evitare zombie. Le pipe forniscono un canale unidirezionale tra processi correlati, mentre le FIFO estendono il meccanismo a processi non imparentati tramite il filesystem.

I segnali sono interruzioni software inviate dal kernel a un processo o da un processo a un altro processo. Rappresentano eventi asincroni che possono arrivare in qualunque momento: condizioni anomale (CTRL+Z -> `SIGSTOP`, CTRL+C -> `SIGINT`, eccezioni hardware come divisione per zero o segfault) ma anche eventi normali come la terminazione di un figlio (`SIGCHLD`), la scadenza di `alarm` (`SIGALRM`), un `kill` da processo o terminale, dati urgenti in rete (`SIGURG`) o scritture su pipe senza lettori (`SIGPIPE`). La lista dei segnali e in `<signal.h>` e a ogni evento e associato un segnale; il processo comunica al kernel l'azione da eseguire quando il segnale arriva: ignorare, usare l'azione di default, oppure catturare con un handler (tipicamente con `signal` o `sigaction`). `SIGKILL` e `SIGSTOP` non possono essere catturati o bloccati, cosi il sistema mantiene sempre il controllo. Quando un segnale viene consegnato, il processo interrompe il proprio flusso, esegue l'handler e poi riprende; se il segnale e bloccato con la maschera (`sigprocmask`) resta pendente finche non viene sbloccato.

---

## 12. Rete, thread e Rust

La programmazione di rete usa i socket come file descriptor. Il modello tipico prevede `socket`, `bind`, `listen`, `accept` lato server e `connect` lato client. I socket permettono di inviare e ricevere stream di byte come in un normale I/O.

I thread (pthreads) consentono concorrenza nello stesso processo condividendo lo stesso spazio di indirizzamento. Questa condivisione introduce race condition e richiede sincronizzazione tramite mutex e, quando necessario, condition variable. Rust affronta questi problemi con un sistema di ownership e borrowing che impedisce, a compile time, molte forme di accesso concorrente non sicuro.

---

Questa riformulazione mantiene il filo logico del corso: dal modello di esecuzione e del filesystem, alla programmazione in C, fino alle astrazioni di kernel, concorrenza e rete.
