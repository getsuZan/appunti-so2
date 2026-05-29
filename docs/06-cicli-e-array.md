# Lezione 6 - Cicli e array

## Obiettivi della lezione
- Motivare l'uso dei loop.
- Conoscere `while`, `for`, `do-while`.
- Gestire `break` e `continue`.
- Comprendere blocchi e scope.
- Introdurre gli array.

## Perche' i loop
- Usati per eseguire ripetutamente un blocco di codice.
- Il corpo del ciclo puo' dipendere dall'iterazione o meno.

## Ciclo `while`
- Valuta la condizione prima di entrare nel ciclo.
- Se vera, esegue il corpo e poi rivaluta.
- Se falsa, salta il corpo.
- Se la condizione non cambia mai, il ciclo e' infinito.

```c
while (expression) {
  // body
}
```

### Loop Control Variable (LCV)
- Variabile che controlla il ciclo.
- Deve essere:
  - dichiarata e inizializzata prima
  - usata nella condizione
  - aggiornata nel corpo

## Ciclo `for`
- Utile quando il numero di iterazioni e' noto.
- Sintassi:
```c
for (initialization; test; increment) {
  // body
}
```
- Esempio: `for (i = 1; i < 5; i++)`.

## Ciclo `do-while`
- La condizione e' valutata dopo il corpo.
- Il corpo e' eseguito almeno una volta.

```c
do {
  // statements
} while (condition);
```

## `break` e `continue`
- `break` interrompe il ciclo.
- `break` si usa anche per uscire da uno `switch`.
- `continue` salta alla prossima iterazione.

## Blocchi e scope
- Un blocco e' il codice tra `{}`.
- Le variabili dichiarate nel blocco sono locali.
- Una variabile interna puo' oscurare una variabile esterna con lo stesso nome.

### Esempi di shadowing
- Variabile `i` dichiarata nel `for` esiste solo nel blocco del ciclo.

## Condizionale `if`
```c
if (condizione) {
  // vero
} else {
  // falso
}
```
- Supporta catene `else if`.

## Array
- Strutture dati: lista indicizzata di elementi omogenei.
- Memoria contigua.
- Dimensione fissa a compile-time.

### Dichiarazione
```c
unsigned int data[3];
char alfabeto[21];
double temp_max[365];
```

### Costanti per dimensioni
```c
const unsigned int GIORNI = 365;
double temp_max[GIORNI];
// oppure:
#define GIORNI 365
```

### Array e puntatori
- Il nome dell'array e' un puntatore al primo elemento.

### Inizializzazione
- Parziale:
```c
double tmax_week[7] = {-2.3, 0.97};
```
- Tutto a zero:
```c
double tmax_week[7] = {};
```

### Array multidimensionali
```c
#define MESI 12
#define GIORNI_M 31
double temp_max[MESI][GIORNI_M];
```

### Uso e limiti
- Accesso con `array[index]`.
- `sizeof(array)` ritorna la dimensione totale del blocco.
- Il C non fa bounds checking: accesso oltre i limiti puo' corrompere memoria o terminare il processo.

### Array e `for`
- Usati tipicamente con cicli:
```c
for (int i = 0; i < GIORNI; i++) {
  temp_max[i] = 0.0;
}
```

## Esercizi (da slide)
- Implementare ricerca sequenziale con `while` e `for`.
- Media di array di float, definito staticamente o letto da stdin.
- Esercizi su do-while, validazione input, conteggi.