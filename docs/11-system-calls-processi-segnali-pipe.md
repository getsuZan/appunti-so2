# System Calls Processi, Segnali e Pipe

## Intuizione Logica
Una volta arrivati alla parte viscerale dell'OS, gestire tutto equivale non piu' a programmare semplici loop, ma a domare flussi concorrenti:
- **Gestione Processi**: Un processo padre "clona" se stesso via `fork()`. Il figlio poi si trasforma nel nuovo programma con `exec()`, mentre il padre attende l'esito con `wait()`.
- **Comunicazione**: I processi sono isolati, quindi l'OS offre "tubi" interprocesso: **Pipe** (tra processi correlati) e **Named Pipe/FIFO** (visibili nel filesystem).
- **Segnali**: Avvisi asincroni che possono sospendere, terminare o risvegliare un processo. Si gestiscono tramite signal handler.

## Punti Chiave
- **Fork, Wait, Exec**: Ciclo di vita dei processi Unix.
- **Pipe / FIFO**: Byte-stream per trasferire I/O fra processi.
- **Signal Handling**: Cattura, reazione predefinita vs esecuzione di codice reattivo.
