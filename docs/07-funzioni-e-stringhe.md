# Lezione 7 - Funzioni e stringhe

## Obiettivi della lezione
- Definire e usare funzioni in C.
- Passaggio parametri per valore e per riferimento.
- Gestire stringhe come array di char.
- Funzioni standard per stringhe.
- I/O di caratteri e stringhe.

## Funzioni
- Definizione:
  `<tipo> nomefunzione(lista_parametri)`
- La lista parametri puo' essere vuota.
- Il tipo di ritorno puo' essere qualsiasi tipo C.
- Usare `void` per nessun ritorno.

### Esempio: somma quadrata
```c
int somma_quadrata(int a, int b) {
  a *= a;
  b *= b;
  return a + b;
}
```
- I parametri sono variabili locali (passaggio per valore).
- Sono allocati nello stack della funzione chiamata.

### Array come parametri
- Un array non si passa per valore; si passa il suo indirizzo.
```c
void array_quadro(int a[], unsigned int n) {
  for (int i = 0; i < n; i++) {
    a[i] *= a[i];
  }
}
```
- Equivalente con puntatore:
```c
void array_quadro(int *a, unsigned int n) {
  for (int i = 0; i < n; i++) {
    a[i] *= a[i];
  }
}
```

## Stringhe
- Array di caratteri terminati da `\0` (null terminator).
- Esempio: `"Hello"` e' `{H,e,l,l,o,\0}`.

### Inizializzazione
```c
char s[10] = "Lezione 7";
char r[10] = "L7 3Apr";
char r2[10] = {'L','7',' ','3','A','p','r','\0'};
```
- Con stringa letterale, `\0` e' aggiunto automaticamente.
- Con lista di char, `\0` non e' automatico.
- `char r[] = "L9 4apr";` alloca la dimensione minima necessaria.

## Funzioni standard su stringhe
- `strlen(s)` lunghezza.
- `strcpy(s1, s2)` copia.
- `strcmp(s1, s2)` confronto.
- `strcat(s1, s2)` concatenazione.
- Attenzione alla dimensione dei buffer.

### Varianti con limite
- `strncpy(dest, src, n)`
- `strncat(dest, src, n)`
- `strncmp(s1, s2, n)`

## I/O di caratteri e stringhe
- Output:
  - `putchar(int c)`
  - `puts(const char *s)`
  - `fputs(const char *s, FILE *stream)`
- Input:
  - `getchar(void)`
  - `fgets(char *s, int size, FILE *stream)`
  - `gets` e' deprecata.

### Perche' `getchar` ritorna `int`
- Per distinguere un carattere valido da `EOF` (tipicamente -1).

### Buffering
- `getchar` e `putchar` sono bufferizzati.
- Input termina con `CTRL+D` (EOF) in terminale.

## Esercizi (da slide)
- Usare `array_quadro` su un vettore di double.
- Cambiare l'intestazione con puntatore.
- Esercizi su `strncpy`, `strncat`, `strncmp`.
- Implementare versioni custom di `strncpy` e `strncat`.
- Leggere una stringa arbitraria con `getchar`.