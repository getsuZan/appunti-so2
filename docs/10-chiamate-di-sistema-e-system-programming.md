# Chiamate di Sistema e System Programming

## Intuizione Logica
Per sicurezza, il Processo (il tuo programma C in *User space*) non puo' toccare direttamente disco, rete o pixel fisici. Deve sempre chiedere permesso tramite "porte sorvegliate" chiamate **System Calls** (Syscalls). Queste risiedono nel Kernel e scattano interruttori con privilegi elevati (modalita' Kernel). Una funzione standard come `printf` o `malloc` non ha i poteri magici, e' semplicemente uno strato superficiale (User Space Library, come libc) che per poter stampare invoca internamente la rispettiva Syscall di scrittura come `write(...)`. Capire questo sdoppiamento permette la "System Programming" a basso livello.

## Punti Chiave
- **Kernel vs User Space**: Differenza tra primitive System Calls offerte dall'OS e libreria wrapper di C.
- **Categorizzazione**: Syscalls per file (`open`, `read`, `write`), per processi (`fork`, `exec`), IPC e rete (Sockets).
- **Gestione Errori / `errno`**: Quando una chiamata a kernel fallisce, il kernel ritorna `-1` e imposta `errno`. Uso con `perror()` / `strerror()`.
