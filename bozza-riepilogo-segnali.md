# Bozza - Riepilogo segnali comuni e azioni di default

Riepilogo rapido dei segnali piu comuni e dell'azione di default (man 7 signal), con esempi di evento tipico.

Azioni di default possibili:
- Terminare il processo con core dump.
- Terminare il processo senza core dump.
- Ignorare il segnale.
- Sospendere (stop) il processo.
- Riesumare (resume) il processo.

| Segnale | Evento tipico | Azione di default (esempi) |
| --- | --- | --- |
| SIGINT | CTRL+C da tastiera | Terminazione |
| SIGQUIT | Uscita da tastiera | Core dump |
| SIGILL | Istruzione illegale | Core dump |
| SIGABR | Abort | Core dump |
| SIGFPE | Eccezione aritmetica | Core dump |
| SIGSEGV | Segmentation fault | Core dump |
| SIGKILL | Kill (non gestibile) | Terminazione |
| SIGTERM | Terminazione software | Terminazione |
| SIGALRM | Scadenza alarm | Terminazione |
| SIGCHLD | Stato del figlio cambiato | Ignorato di default |
| SIGSTOP | Stop (non gestibile) | Stop |
| SIGTSTP | Stop da tastiera | Stop |
| SIGPIPE | Scrittura senza lettori su pipe/socket | Terminazione |
| SIGUSR1 | Definito dall'utente | Terminazione |
| SIGUSR2 | Definito dall'utente | Terminazione |
| SIGTTIN | Lettura su tty in background | Stop |
| SIGTTOU | Scrittura su tty in background | Stop |
