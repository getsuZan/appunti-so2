# Cicli e Array

## Intuizione Logica
Il processore e' bravissimo a ripetere le stesse istruzioni molto velocemente; i costrutti **Iterativi** (`while`, `for`, `do-while`) servono proprio a ingabbiarlo e limitare le ripetizioni.
Un **Array** non e' altro che un nastro continuo ("schiera") di celle dello stesso tipo appiccicate in memoria l'una dopo l'altra. Il nome della variabile ("array") punta per comodita' all'inizio del nastro. Avendo tipo e grandezza fissa, il compilatore C non ti ferma se calcoli male gli indici andando oltre il confine ("buffer overflow"), perche' il C presume che tu programmatore sappia sempre cosa stai facendo.

## Punti Chiave
- **Loop**: Importanza della variabile di controllo (LCV) e della condizione d'uscita. `break` e `continue`.
- **Blocchi (`{ }`)**: Indicano il raggio vitale (scope locale) delle variabili temporanee, l'oscuramento delle variabili (shadowing).
- **Array**: Nastro contiguo in memoria. `tipo nome[N];`. Inizializzazione, potenziale sforamento critico e accesso ad indici.
