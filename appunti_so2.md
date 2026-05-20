# Sistemi Operativi - II Modulo: Appunti e Concetti Logici

Questo documento riassume i concetti fondamentali trattati nel corso, con un focus sull'intuizione logica dietro ogni argomento per facilitare lo studio e la comprensione a lungo termine. I singoli comandi tecnici e le opzioni specifiche sono presenti in modo organico per mantenere integro il valore tecnico.

---

## 1. Primi passi: Shell, Utenti, Filesystem

### Intuizione Logica
Il **Sistema Operativo (SO)** è l'intermediario tra l'hardware e l'utente/software. Per parlarci direttamente usiamo la **Shell** (es. Bash), un traduttore che prende i nostri comandi testuali e li fa eseguire al SO. 
Il sistema deve sapere "chi" sta parlando: da qui gli **Utenti**. L'utente `root` è l'amministratore supremo che può tutto; gli altri hanno poteri limitati per evitare danni. Il comando `sudo` serve proprio a "prendere in prestito" i poteri di root se ne abbiamo l'autorizzazione.

### Punti Chiave
- **Shell e Prompt**: Il terminale attende comandi attraverso il prompt (che mostra utente, macchina e directory corrente).
- **Comandi**: Strutturati solitamente come `comando [opzioni] [argomenti]`.
- **Utenti e Permessi (`sudo`)**: La gestione multi-utente assicura isolamento e sicurezza (\`/etc/passwd\`, \`/etc/group\`).

---

## 2. Il Filesystem

### Intuizione Logica
Pensa al **Filesystem** come a uno schedario infinito ad albero logico che parte da un'unica radice chiamata `/` (root). Non importa se i file fisici risiedono su un SSD interno o su una chiavetta USB: il sistema del **Mounting** permette di "attaccare" qualsiasi disco a un ramo di questo albero, unificandoli. 
A basso livello, ogni file non è salvato col suo nome, ma è associato a un **inode** (un passaporto numerico univoco) che ne contiene le caratteristiche (dimensioni, permessi, posizioni fisiche), mentre le "directory" sono in realtà solo file speciali che contengono liste di corrispondenze `nome_file -> inode`.

### Punti Chiave
- **Gerarchia**: Percorsi (path) assoluti (da `/`) e relativi (da cwd).
- **Mounting**: Meccanismo per "innestare" un file system su una directory (`mount`).
- **Inode**: Struttura dati vitale che rappresenta un file (metadati e puntatori ai blocchi dati).
- **Permessi**: Suddivisi in Proprietario, Gruppo e Altri per Lettura (r), Scrittura (w), ed Esecuzione (x).
- **Permessi speciali**: SetUID (esegue col privilegio del proprietario), SetGID, Sticky Bit.

---

## 3. Comandi Gestione Filesystem

### Intuizione Logica
Una volta che capisci che un file è in realtà solo l'interfaccia verso un `inode`, i comandi Unix ottengono senso logico. Quando "muovi" (`mv`) un file nella stessa partizione, stai solo cambiando la stringa associata all'inode, i dati non si spostano mai di un millimetro fisicamente. Creare un **Hard Link** (`ln`) significa dare due nomi diversi allo *stesso inode*. Creare un **Soft Link** (`ln -s`) significa creare un nuovo inode il cui contenuto dice al SO: "vai a cercare quell'altro percorso". 

### Punti Chiave
- **Gestione file**: `cp` (copia), `mv` (sposta/rinomina), `rm` (rimuovi), `touch` (cambia timestamp / crea).
- **Link**: Hard link (stesso inode), Soft/Symbolic link (file puntatore testuale).
- **Ispezione e Permessi**: `ls -l`, `stat`, `chmod` (cambia permessi ottali/simbolici), `umask` (maschera permessi default all'atto della creazione).
- **Spazio e Formattazione**: `du`, `df`, `dd`, `mkfs` (per formattare).

---

## 4. I Processi

### Intuizione Logica
Se un programma è un ricettario di cucina (il file eseguibile residente sul disco fisso), il **Processo** è il cuoco che sta attivamente cucinando seguendo quella ricetta. 
Essendo il SO un sistema "multi-tasking" (tanti cuochi in una sola cucina), deve assegnare a ciascun processo una targhetta univoca (**PID**) e una scheda identificativa (**PCB** - Process Control Block) e suddividere a tavolino la memoria in aree specializzate (Codice, Dati, Heap, Stack). I processi comunicano tra loro, e con l'hardware esterno, attraverso tre bocche/orecchie (chiamate **Standard Streams**): Input (dalla tastiera, stdin), Output (a schermo, stdout), ed Error (sempre a schermo, stderr). Possono essere ridiretti (es. far "parlare" un processo direttamente a un file con `>`).

### Punti Chiave
- **Standard streams & Redirection**: `stdin` (0), `stdout` (1), `stderr` (2), ridirezioni e pipe `|`.
- **Aree di memoria**: Text (codice), Data e BSS (statici), Heap (dinamici), Stack (chiamate funzioni).
- **Stati del processo**: Running, Sleeping, Zombie (morto, ma il cui stato di exit non è ancora stato "raccolto" dal padre), Stopped.
- **Background & Foreground**: `&`, `bg`, `fg`, controllo interattivo `CTRL+Z`, `CTRL+C`.
- **Informazioni e Segnali**: `ps`, `top`, `kill` e l'uso dei semafori asincroni (i segnali) per controllare un processo.
- **Priorità**: `nice` (una gentilezza verso gli altri processi = bassa priorità).

---

## 5. Introduzione al C

### Intuizione Logica
Il **C** è spesso definito un "Assembly portabile" perché non ti nasconde nulla: parli quasi direttamente con le aree di memoria viste nel capitolo dei processi. Il compilatore prende passaggi logici testuali (codice sorgente) e li trasforma in istruzioni macchina brute che finiscono nel *Text Segment* del processo. Non c'è macchina virtuale in mezzo (a differenza di Java).
Si definiscono variabili in memoria in base alla capacità che ci serve (`char`, `int`, `float`, `double`). Non "esiste" la magia, ogni dichiarazione corrisponde a spazio fisicamente richiesto nella RAM.

### Punti Chiave
- **Compilazione (`gcc`)**: Fasi dal pre-processore (macros/include), compilazione, linking (collegare le librerie).
- **Struttura base**: Funzione `main()`, inclusioni `#include <stdio.h>`.
- **Variabili**: Tipi primitivi in memoria, Scope della variabile (vita e visibilità).
- **I/O base**: `printf` e `scanf` con i segnaposto (`%d`, `%f`, `%s`, etc.).

---

## 6. Cicli e Array

### Intuizione Logica
Il processore è bravissimo a ripetere le stesse istruzioni molto velocemente; i costrutti **Iterativi** (`while`, `for`, `do-while`) servono proprio a ingabbiarlo e limitare le ripetizioni. 
Un **Array** non è altro che un nastro continuo ("schiera") di celle dello stesso tipo appiccicate in memoria l'una dopo l'altra. Il nome della variabile ("array") punta per comodità all'inizio del nastro. Avendo tipo e grandezza fissa, il compilatore C non ti ferma se calcoli male gli indici andando oltre il confine ("buffer overflow"), perché il C presume che tu programmatore sappia sempre cosa stai facendo.

### Punti Chiave
- **Loop**: Importanza della variabile di controllo (LCV) e della condizione d'uscita. `break` e `continue`.
- **Blocchi (`{ }`)**: Indicano il raggio vitale (scope locale) delle variabili temporanee, l'oscuramento delle variabili (shadowing).
- **Array**: Nastro contiguo in memoria. `tipo nome[N];`. Inizializzazione, potenziale sforamento critico e accesso ad indici.

---

## 7. Funzioni e Stringhe

### Intuizione Logica
Programmare in modo "monolitico" non scala. Dividiamo il programma in **Funzioni**, mini-ricettari isolati. Un concetto radicale del C è il **Passaggio per Valore**: quando passi una variabile a una funzione, il C ne fa una "fotocopia" brutale nello Stack; ogni modifica in funzione impatta la fotocopia, NON l'originale. Per aggirare questo e passare l'originale (come il caso degli Array) bisogna inoltrare "l'indirizzo della sua casa", non la variabile stessa.
Le **Stringhe** in C tecnicamente non esistono: il linguaggio fornisce come "toppa" gli Array di `char`, introducendo il patto di usare sempre il cartello `\0` (NULL) come segno ineluttabile di fine frase.

### Punti Chiave
- **Funzioni d'appoggio**: `tipo Ritorno nome(parametri);`. Ritorno via `return`.
- **Passaggio di Parametri**: Differenza viscerale tra "passaggio per valore" (fotocopia) vs l'uso logico per "indirizzo/riferimento" (che il C risolve usando i puntatori: array passati senza sprecare memoria).
- **Stringhe (`char[]`)**: Stringhe "NULL-terminated". Funzioni di libreria standard (`strlen`, `strcpy`, `strcat`, `strcmp`) per operare aggirando i limiti primitivi.

---

## 8. Progetti Multi-File e Makefile

### Intuizione Logica
Costruire programmi giganti richiede decine di file `.c`. Compilare sempre tutto richiede uno spreco pazzesco di risorse. Il processo andrebbe spezzato: compila solo ciò che modifichi e "cuci" assieme i pezzi precompilati in un solo passaggio finale (`Linker`). Avere queste regole scritte su carta permette l'automazione perfetta: per questo usiamo `Make`. Un `Makefile` è l'albero delle dipendenze di un software: "Per creare C servono A e B; se A è più fresco/modificato rispetto alla volta in cui è stato creato C, ri-esegui il comando che genera C".

### Punti Chiave
- **Compilazione modulare**: File oggetto (`.o`) via `gcc -c`.
- **Linking**: Assemblamento dei file `.o` in un solo eseguibile. Dichiarazione delle firme (headers `.h` vs body `.c`).
- **Make/Makefile**: Regole espresse con *Target*, *Dependencies/Prerequisites*, *Recipe* (comando).
- **Variabili**: Macro, target fasulli (`.PHONY clean`) e regole implicite.

---

## 9. Allocazione Dinamica, Strutture (Struct) e File I/O

### Intuizione Logica
Finora tutto lo spazio mnemonico necessario doveva essere conosciuto prima che il programma partisse ed era stoccato nello `Stack`. E se a runtime ci scontrassimo con una richiesta spropositata e imprevedibile da parte dell'utente? Qui entra in scena lo **Heap**, il magazzino libero gigante della RAM. Col C noi programmatori dobbiamo espliciamente bussare al SO per fittare metri quadri: `malloc(...)`. È un patto di fiducia: quando finiamo siamo obbligati a ripulire il deposito, dando una `free(...)`. Dimenticarcelo genera il temuto *Memory Leak*.
Mappiamo poi intere entità di dati diversi per comodità usando i raggruppatori: le **Strutture (struct)**.
Per non avere memoria volatile (spegni tutto e perdi l'esecuzione), impariamo a scrivere permanentemente sul **Filesystem** (leggendo/scrivendo File).

### Punti Chiave
- **Puntatori**: `&` estrae l'indirizzo da una variabile; `*` entra dentro la cella a quell'indirizzo e manipola il suo valore indiretto.
- **Heap**: Funzioni `malloc()` / `calloc()`. Liberazione con `free()`.
- **Struct / typedef**: Combinare tipi primitivi diversi logicamente coesi (`struct { int x; char y; };`). Accessi ai campi della struct.
- **Input/Output da File**: Utilizzo dei flussi via buffer. I passi essenziali: Dichiarazione (`FILE *`), Apertura (`fopen`), Operazioni I/O (`fscanf`, `fgets`, `fputs`), e chiusura vitale col Flush (`fclose`).

---

## 10. Chiamate di Sistema e System Programming

### Intuizione Logica
Per sicurezza, il Processo (il tuo programma C in *User space*) non può toccare direttamente disco, rete o pixel fisici. Deve sempre chiedere permesso tramite "porte sorvegliate" chiamate **System Calls** (Syscalls). Queste risiedono nel Kernel e scattano interruttori con privilegi elevati (modalità Kernel). Una funzione standard come `printf` o `malloc` non ha i poteri magici, è semplicemente uno strato superficiale (User Space Library, come libc) che per poter stampare invoca internamente la rispettiva Syscall di scrittura come `write(...)`. Capire questo sdoppiamento ci permette la "System Programming" a basso livello.

### Punti Chiave
- **Kernel vs User Space**: Differenza tra le primitive System Calls offerte dall'OS e la libreria wrapper generica di C.
- **Categorizzazione**: Syscalls per file (`open`, `read`, `write`), per processi (`fork`, `exec`), interprocess communication (IPC) e rete (Sockets).
- **Gestione Errori / `errno`**: Quando una chiamata a kernel fallisce (es.: file inesistente, risorse finite), il kernel dirotta il risultato in `-1` e marchia una variabile "termometro" globale che espone la malattia: `errno` e il suo uso tramite `perror()` / `strerror()`.

---

## 11. System Calls Processi, Segnali e Pipe (Sintesizzata da restanti capitoli)

### Intuizione Logica
Una volta arrivati alla parte viscerale dell'OS, gestire tutto equivale non più a programmare semplici loop, ma a domare flussi concorrenti:
- **Gestione Processi**: Il modo di nascita quasi esoterico di Unix prevede la fotocopia, un processo padre "clona sé stesso" via `fork()`. Avremo momentaneamente due cloni, dopodiché il figlio subisce un trapianto di cervello (`exec()`) trasformandosi nel nuovo programma, mentre il padre ne aspetta pietosamente la morte via `wait()`.
- **Comunicazione**: Essendo i processi sigillati ermeticamente per sicurezza, l'OS offre loro "tubi" idraulici interprocesso: le **Pipe** (per flussi di dati lineari padri/figli) e le **Named Pipe/FIFO** (utilizzabili da chiunque nel filesystem).
- **Segnali**: Simili ad avvisi telefonici brutalizzanti ed asincroni che possono svegliare, abbattere o allarmare temporaneamente un processo ignaro. Si intercettano impostando degli "Handler" in modo da reagire con grazia.

### Punti Chiave
- **Fork, Wait, Exec**: Il trittico cardine della genesi e reincarnazione dei Processi Unix.
- **Pipe / FIFO**: Strumenti byte-stream per trasferire I/O fra memorie di processi altrimenti indipendenti senza file su disco reale.
- **Signal Handling**: Cattura, reazione predefinita vs esecuzione di codice reattivo. 

---

## 12. Reti (Socket), Thread e Rust (Appunti Finali)

### Intuizione Logica
**Comunicare via Rete** è semplicemente aver inventato file-che-non-sono-file. I **Socket** astraggono la rete e vi consentono di spedire byte allo stesso modo di una Pipe. Esistono un "ricevitore/servitore in ascolto" (Server) ed un "chiamante" attivo (Client).  
Avere tanti Processi pesanti che servono la rete spreca innumerevoli cloni (`fork`) costose di risorse sovrapposte. Soluzione: i **Thread**. Un approccio super leggero: il vecchio Processo rimane ma genera più "spettri" di sé stesso eseguendo linee diverse nel codice simultaneamente, pur *condividendo lo stesso Heap globale*. Condividere, tuttavia, conduce invariabilmente al sanguinamento caotico **(Race conditions)** quando svoltano ad interagire per sbaglio con le stesse medesime variabili globali allo stesso istante. Servono i guinzagli: lucchetti digitali per l'uso solitario come le `Mutex`.
Infine si menziona il linguaggio **Rust** per eliminare questo problema, garantendo intrinsecamente nel suo compilatore un concetto pazzesco: *l'Esclusività/Possesso della Memoria*, togliendo il programmatore C dall'onere infausto di causare per sfortuna buffer overflows e memory leaks spaventosi.

### Punti Chiave
- **Sockets API**: Il modello `socket()`, `bind()`, `listen()`, `accept()`, `connect()` estendendo la logica OS di file-descriptor.
- **Thread & Concurrency**: Condivisione delle risorse intrinseca in `pthreads`.
- **Mutex**: Prevenzione disastri (`Race condition`), sincronizzando e assicurando "mutua esclusione".
- **Rust paradigme**: Safe concurrency and memory safety (*Ownership*, *Borrowing*).

---
*Questi concetti racchiudono l'organicità del Modulo 2 di Sistemi Operativi. Con lo studio, tenere in mente perché questi pattern sono stati inventati renderà semplice l'assorbimento delle nozioni più basse.*
