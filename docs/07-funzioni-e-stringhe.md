# Funzioni e Stringhe

## Intuizione Logica
Programmare in modo "monolitico" non scala. Dividiamo il programma in **Funzioni**, mini-ricettari isolati. Un concetto radicale del C e' il **Passaggio per Valore**: quando passi una variabile a una funzione, il C ne fa una "fotocopia" brutale nello Stack; ogni modifica in funzione impatta la fotocopia, NON l'originale. Per aggirare questo e passare l'originale (come il caso degli Array) bisogna inoltrare "l'indirizzo della sua casa", non la variabile stessa.
Le **Stringhe** in C tecnicamente non esistono: il linguaggio fornisce come "toppa" gli Array di `char`, introducendo il patto di usare sempre il cartello `\0` (NULL) come segno ineluttabile di fine frase.

## Punti Chiave
- **Funzioni d'appoggio**: `tipo Ritorno nome(parametri);`. Ritorno via `return`.
- **Passaggio di Parametri**: Differenza tra "passaggio per valore" (fotocopia) vs uso per "indirizzo/riferimento" (risolto usando i puntatori: array passati senza sprecare memoria).
- **Stringhe (`char[]`)**: Stringhe "NULL-terminated". Funzioni di libreria standard (`strlen`, `strcpy`, `strcat`, `strcmp`) per operare aggirando i limiti primitivi.
