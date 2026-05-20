# I Processi

## Intuizione Logica
Se un programma e' un ricettario di cucina (il file eseguibile residente sul disco fisso), il **Processo** e' il cuoco che sta attivamente cucinando seguendo quella ricetta.
Essendo il SO un sistema "multi-tasking" (tanti cuochi in una sola cucina), deve assegnare a ciascun processo una targhetta univoca (**PID**) e una scheda identificativa (**PCB** - Process Control Block) e suddividere a tavolino la memoria in aree specializzate (Codice, Dati, Heap, Stack). I processi comunicano tra loro, e con l'hardware esterno, attraverso tre bocche/orecchie (chiamate **Standard Streams**): Input (dalla tastiera, stdin), Output (a schermo, stdout), ed Error (sempre a schermo, stderr). Possono essere ridiretti (es. far "parlare" un processo direttamente a un file con `>`).

## Punti Chiave
- **Standard streams & Redirection**: `stdin` (0), `stdout` (1), `stderr` (2), ridirezioni e pipe `|`.
- **Aree di memoria**: Text (codice), Data e BSS (statici), Heap (dinamici), Stack (chiamate funzioni).
- **Stati del processo**: Running, Sleeping, Zombie (morto, ma il cui stato di exit non e' ancora stato "raccolto" dal padre), Stopped.
- **Background & Foreground**: `&`, `bg`, `fg`, controllo interattivo `CTRL+Z`, `CTRL+C`.
- **Informazioni e Segnali**: `ps`, `top`, `kill` e l'uso dei semafori asincroni (i segnali) per controllare un processo.
- **Priorita'**: `nice` (una gentilezza verso gli altri processi = bassa priorita').
