# Lezione 1 - Primi passi: shell, utenti, filesystem

## Obiettivi della lezione
- Comprendere cos'e' la shell e come interagire con il sistema.
- Leggere e interpretare prompt e sintassi dei comandi.
- Capire il modello utenti/gruppi, privilegi e sudo.
- Introdurre il filesystem e i concetti di base necessari per i comandi successivi.

## La shell
- La shell e' un interprete di comandi: un programma che legge comandi dell'utente, li interpreta e avvia altri programmi.
- Spesso si usa il termine "terminale" per indicare l'applicazione che ospita la shell, ma la shell e' il programma che esegue i comandi.
- Esempi di shell:
  - sh (Thompson/Bourne shell)
  - bash (Bourne Again Shell)
  - ksh (KornShell)
  - fish (Friendly Interactive Shell)

### Verifica della shell in uso
- E' possibile verificare la shell corrente con comandi specifici (vedere `man` della shell o variabili d'ambiente).

### History della bash
- Con le frecce su/giu si scorrono i comandi precedenti.
- Un comando selezionato puo' essere modificato prima dell'esecuzione.
- Ricerca nella history: `CTRL+r`, digitare una keyword per cercare.

## Il prompt
- La shell mostra un prompt e attende un comando.
- Un prompt tipico in bash:
  `nomeutente@nomemacchina:~cammino$`
  - `nomeutente`: utente corrente.
  - `nomemacchina`: hostname.
  - `~cammino`: percorso dalla home alla directory corrente.
- Se si e' nella home, il cammino e' solo `~`.
- Se la directory corrente non e' sotto la home, il cammino e' assoluto.

## Sintassi dei comandi
- Forma generale:
  `comando [opzioni] argomenti_obbligatori`
- Gli argomenti obbligatori sono tra `{}`; possono essere uno o piu'.
- Le opzioni facoltative sono tra `[]`; possono essere zero o piu'.
- Alcuni comandi accettano liste di argomenti separati da un carattere specifico.

### Opzioni: formato e combinazioni
- Formati comuni:
  - `-c` (breve)
  - `--parola` (lunga)
- Esempio: per `cp` sono equivalenti `-i` e `--interactive`.
- Alcune opzioni richiedono argomenti:
  - `-k1`, `-k 1`, `--key=1`
- Opzioni senza argomento possono essere raggruppate:
  - `-b -r -c` equivale a `-brc`
- Esistono anche opzioni in stile BSD, senza trattino:
  - `tar xfz nomefile.tgz`

## Il comando `man`
- Mostra il manuale di un comando.
- Sintassi:
  `man [sezione] comando`
- Esempio: `man man` per il manuale di `man`.

### Esercizi suggeriti (da slide)
1. Provare opzioni diverse di `man`.
2. Ricavare la sinossi completa di `cp`, `ps`, `ls` e il loro scopo.
3. Capire, da `man ps`, perche' `ps -p $$ -ocmd -h` restituisce `bash`.
4. Trovare un invocazione di `ps` che mostri solo il PID della shell.

## Utenti e gruppi
- Durante l'installazione si crea almeno un utente principale.
- `root` e' il superutente con tutti i privilegi.
- Non tutti gli utenti possono fare login (dipende dalla configurazione).
- In molti sistemi `root` non fa login da terminale remoto, ma si acquisiscono privilegi con `su` o `sudo`.
- Ogni utente appartiene almeno a un gruppo primario (spesso con lo stesso nome dell'utente).
- Esistono gruppi amministrativi.
- Comando per vedere i gruppi:
  `groups [nome_utente]`

## `sudo`
- In molte distribuzioni Debian-based l'utente principale e' nel gruppo `sudo`.
- Gli utenti del gruppo `sudo` possono eseguire comandi con privilegi elevati.
- Sintassi:
  `sudo comando`
- `sudo` e' un comando che esegue un altro comando con privilegi di root.

## Creazione di utenti
- Creazione utente:
  `adduser nuovo_utente`
- Per default, l'utente creato non e' nel gruppo `sudo`.
- Aggiunta a un gruppo:
  `adduser nuovo_utente gruppo`

### Esercizi suggeriti (da slide)
1. Studiare la sinossi di `adduser`.
2. Creare `utente1` e `utente2`.
3. Da utente sudoer eseguire `apt-get update`.
4. Eseguire lo stesso con `sudo apt-get update`.

## Cambiare utente
- Comando `su`:
  `su [- | -l | --login] nome_utente`
- Per diventare root tipicamente:
  `su -`, `su - root`, oppure `su -l root`

### Esercizi suggeriti (da slide)
1. Con `utente1` eseguire `apt-get update`.
2. Con `utente1` eseguire `sudo apt-get update`.
3. Rendere `utente1` sudoer.
4. Ripetere i passi 1 e 2.

## Note operative
- Le esercitazioni richiedono un sistema Linux reale (Ubuntu, Fedora, Rocky, ecc.).
- Consultare la pagina del corso per le indicazioni software aggiornate.