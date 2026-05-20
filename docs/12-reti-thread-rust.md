# Reti, Thread e Rust

## Intuizione Logica
**Comunicare via Rete** significa usare file che non sono file: i **Socket** astraggono la rete e consentono di spedire byte allo stesso modo di una Pipe. Esistono un "ricevitore in ascolto" (Server) ed un "chiamante" attivo (Client).
Avere tanti processi separati e' costoso. I **Thread** sono processi leggeri che condividono lo stesso spazio di memoria. Questa condivisione porta pero' al rischio di **Race condition** quando piu' thread modificano la stessa variabile nello stesso istante. Servono meccanismi di **mutua esclusione** (mutex).
Infine, **Rust** affronta il problema alla radice imponendo regole di ownership e borrowing, prevenendo molte classi di errori di memoria a compile-time.

## Punti Chiave
- **Sockets API**: Modello `socket()`, `bind()`, `listen()`, `accept()`, `connect()`.
- **Thread & Concurrency**: Condivisione risorse in `pthreads`.
- **Mutex**: Sincronizzazione e protezione delle sezioni critiche.
- **Rust paradigme**: Memory safety con ownership e borrowing.
