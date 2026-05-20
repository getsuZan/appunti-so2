# Primi passi: Shell, Utenti, Filesystem

## Intuizione Logica
Il **Sistema Operativo (SO)** e' l'intermediario tra l'hardware e l'utente/software. Per parlarci direttamente usiamo la **Shell** (es. Bash), un traduttore che prende i nostri comandi testuali e li fa eseguire al SO.
Il sistema deve sapere "chi" sta parlando: da qui gli **Utenti**. L'utente `root` e' l'amministratore supremo che puo' tutto; gli altri hanno poteri limitati per evitare danni. Il comando `sudo` serve proprio a "prendere in prestito" i poteri di root se ne abbiamo l'autorizzazione.

## Punti Chiave
- **Shell e Prompt**: Il terminale attende comandi attraverso il prompt (che mostra utente, macchina e directory corrente).
- **Comandi**: Strutturati solitamente come `comando [opzioni] [argomenti]`.
- **Utenti e Permessi (`sudo`)**: La gestione multi-utente assicura isolamento e sicurezza (`/etc/passwd`, `/etc/group`).
