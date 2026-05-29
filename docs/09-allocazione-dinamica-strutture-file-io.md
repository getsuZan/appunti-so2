# Lezione 9 - Allocazione dinamica, strutture, file I/O

## Obiettivi della lezione
- Leggere argomenti da linea di comando.
- Usare puntatori e allocazione dinamica (heap).
- Definire e usare strutture (`struct`).
- Gestire input/output su file con stdio.

## Linea di comando
- `main` puo' ricevere parametri:
  - `int argc`: numero di argomenti.
  - `char *argv[]`: vettore di stringhe degli argomenti.
- Esempio: `cat file.txt`
  - `argc = 2`
  - `argv[0] = "cat"`
  - `argv[1] = "file.txt"`

### Esempio di stampa argomenti
```c
int main(int argc, char *argv[]) {
  while (--argc >= 0)
    printf("argv[%d] = %s\n", argc, argv[argc]);
  return 0;
}
```

## Puntatori
- Un puntatore contiene l'indirizzo di una variabile.
- Dichiarazione: `<tipo> *var;`
  - `int *p;` puntatore a int
  - `char *s;` puntatore a char

### Valore diretto e indiretto
- Valore diretto: l'indirizzo memorizzato (es. `0x4d56`).
- Valore indiretto: il contenuto della cella puntata (`*p`).

### Operatori `&` e `*`
```c
int num = 5;
int *numPtr;
numPtr = &num;   // numPtr punta a num
*numPtr = 10;    // modifica num
```

### Aritmetica dei puntatori
- L'incremento dipende dal tipo:
  - `ptr + 1` avanza di `sizeof(tipo)` bytes.

### Array e puntatori
- Un array e' equivalente a un puntatore al primo elemento:
```c
int vect[10];
int *ptr = vect;      // = &vect[0]
```
- `NULL` indica un puntatore che non punta a nessuna area valida.

## Allocazione dinamica (heap)
- Memoria richiesta a runtime:
  - `malloc`, `calloc`, `free`.
- Lo stack contiene variabili automatiche; l'heap serve per memoria dinamica.

### Funzioni principali
```c
void *malloc(size_t size);
void *calloc(size_t nmemb, size_t size);
void free(void *ptr);
```
- `malloc` non inizializza la memoria.
- `calloc` inizializza a zero.
- `free` libera la memoria.

### `malloc` vs `calloc`
- `malloc(size)` alloca un blocco di `size` byte non inizializzati.
- `calloc(nmemb, size)` alloca `nmemb * size` byte e li inizializza a 0.
- `calloc` rende esplicita la dimensione di un array, mentre `malloc` richiede il calcolo manuale.

### Regole importanti
- `free` solo su puntatori ottenuti da `malloc/calloc/realloc`.
- `free` doppio sullo stesso puntatore = comportamento indefinito.
- Il programmatore gestisce la garbage collection.

### Note su `free`
- Usare un puntatore dopo `free` produce comportamento indefinito (use-after-free).
- Passare a `free` un puntatore non valido produce comportamento indefinito.

## Strutture (`struct`)
- Tipo di dato composto con membri di tipi diversi.

### Variabile struttura
```c
struct {
  double x;
  double y;
} point2D;
```

### Struttura etichettata
```c
struct point3D {
  double x, y, z;
};
struct point3D pointA, pointB;
```

### `typedef struct`
```c
typedef struct {
  char ID[17];
  long int income;
  float taxRate;
} taxpayer_t;
```

### Inizializzazione
```c
struct point3D pointA = {1.1, 1.2, 3.5};
```

### Passaggio a funzione
- Per valore: copia nello stack.
- Per riferimento: passaggio di puntatore (piu' efficiente).

## File I/O con stdio
- File di testo: linee terminate da `\n` e fine file `EOF`.

### Passi standard
1. Dichiarare `FILE *fp`.
2. Aprire con `fopen`.
3. Usare funzioni di I/O.
4. Chiudere con `fclose`.

### Funzioni principali
- `fscanf`, `fprintf`
- `fgets`, `fputs`
- `feof` per verificare EOF

## Funzioni di memoria utili
- `memset` e `memcpy` sono utili per inizializzare o copiare blocchi.
```c
void *memset(void *s, int c, size_t n);
void *memcpy(void *dest, const void *src, size_t n);
```
- `memcpy` richiede che le aree non si sovrappongano.

### Note su `fgets`
- Legge al massimo `size-1` caratteri o fino a `\n`.
- Restituisce `NULL` su errore o EOF.

## Esercizi (da slide)
- Stampare argv.
- Usare `malloc` e `calloc` per allocare e copiare blocchi.
- Modificare strutture e passaggio parametri.
- Leggere/scrivere file con `fscanf`, `fgets`, `fputs`.

## Riferimenti agli esempi (da slide)
- `pointer.c`, `aritmeticaPtr.c`, `arrayPtr.c` per puntatori e aritmetica.
- `heapAlloc.c` per allocazione su heap.
- `taxPayers.c`, `taxPayersAlloc.c`, `taxPayersParams.c` per strutture e parametri.
- `file.c`, `filefsfpf.c`, `filefgets.c`, `filefputs.c` per file I/O.