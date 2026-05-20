# Allocazione Dinamica, Strutture e File I/O

## Intuizione Logica
Finora tutto lo spazio mnemonico necessario doveva essere conosciuto prima che il programma partisse ed era stoccato nello `Stack`. E se a runtime ci scontrassimo con una richiesta spropositata e imprevedibile da parte dell'utente? Qui entra in scena lo **Heap**, il magazzino libero gigante della RAM. Col C noi programmatori dobbiamo espliciamente bussare al SO per fittare metri quadri: `malloc(...)`. E' un patto di fiducia: quando finiamo siamo obbligati a ripulire il deposito, dando una `free(...)`. Dimenticarcelo genera il temuto *Memory Leak*.
Mappiamo poi intere entita' di dati diversi per comodita' usando i raggruppatori: le **Strutture (struct)**.
Per non avere memoria volatile (spegni tutto e perdi l'esecuzione), impariamo a scrivere permanentemente sul **Filesystem** (leggendo/scrivendo File).

## Punti Chiave
- **Puntatori**: `&` estrae l'indirizzo da una variabile; `*` entra dentro la cella a quell'indirizzo e manipola il suo valore indiretto.
- **Heap**: Funzioni `malloc()` / `calloc()`. Liberazione con `free()`.
- **Struct / typedef**: Combinare tipi primitivi diversi logicamente coesi (`struct { int x; char y; };`). Accessi ai campi della struct.
- **Input/Output da File**: Utilizzo dei flussi via buffer. Passi essenziali: Dichiarazione (`FILE *`), Apertura (`fopen`), Operazioni I/O (`fscanf`, `fgets`, `fputs`), e chiusura con flush (`fclose`).
