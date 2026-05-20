# Lezione 5 - Introduzione al C

## Obiettivi della lezione
- Capire ambiente di sviluppo/esecuzione in C.
- Compilazione, linking, eseguibili.
- Input/output di base.
- Variabili, costanti, operatori ed espressioni.

## Linguaggio C: contesto e motivazioni
- Sviluppato ai Bell Labs negli anni '70.
- Usato per sviluppare il nucleo di Unix, e poi Linux e altri SO.
- Standardizzato ANSI e ISO.
- Portabile: codice C ricompilabile su diverse architetture.

## Ambiente di sviluppo in C
- `gcc` (GNU Compiler Collection) svolge:
  - preprocessamento
  - compilazione
  - linking
- Produce codice oggetto `.o` e poi un eseguibile.

### Differenze con Java/Python
- Java: `javac` produce bytecode `.class` eseguito dalla JVM.
- C: `gcc` produce un eseguibile nativo, eseguito direttamente dal SO.
- Java necessita sempre della JVM; in C il processo e' indipendente dal compilatore.

## Eseguibili in Linux
- Generati da compilazione C/C++/assembly.
- Possono essere anche script con shebang (vedremo piu' avanti).

## Fasi per creare ed eseguire un programma C
- Edit (vi, gedit, nano, ecc.)
- Preprocess (cpp via gcc)
- Compile (gcc)
- Link (ld via gcc)
- Load (SO)
- Execute (SO)

## Struttura di un programma C
- Funzione `main()` obbligatoria.
- Funzioni possono essere nello stesso file o in file diversi.
- Una funzione ha:
  - intestazione: `<return-type> function-name(parameter-list)`
  - blocco:
    ```c
    {
      dichiarazioni
      istruzioni
    }
    ```
- `;` termina le istruzioni.

## `return`
- `return expression;` imposta il valore di ritorno.
- L'espressione puo' essere costante, variabile, espressione, o chiamata di funzione.

## Primo programma
```c
#include <stdio.h>

int main() {
  printf("Il mio primo programma C: Hello World!\n");
  return 0;
}
```

## Compilazione ed esecuzione
- Compilazione con warning:
  - `gcc -Wall prog-name.c`
- Con libreria matematica:
  - `gcc -Wall prog-name.c -lm`
- Output di default: `a.out`
- Nome eseguibile custom:
  - `gcc -Wall prog-name.c -o executable-name`

## Preprocessamento, compilazione, linking
- Solo preprocessamento:
  - `cpp helloworld.c > precompilato.c`
- Solo compilazione:
  - `gcc -c precompilato.c -o file.o`
- Solo linking:
  - `gcc file.o` (risolve le chiamate a funzioni)
- Più file:
  - `gcc file1.o file2.o`
  - `gcc file1.c file2.c`

## Commenti
- `//` commento a linea singola.
- `/* ... */` commento multi-linea.

## Direttive al preprocessore
- `#include <stdio.h>`: include header standard.
- `#include "miofile.h"`: include header utente.
- `-I` specifica directory addizionali per header.

## Perche' `./a.out`?
- La shell cerca eseguibili nelle directory di `PATH`.
- `./a.out` indica che l'eseguibile e' nella cwd.
- Verificare `PATH` con `env`.

## Input/Output
- `stdio.h` fornisce I/O base.
- `printf("format", value-list)` per output.
- `scanf("format", address-list)` per input.
- `stdin`, `stdout`, `stderr` aperti automaticamente a runtime.

### `printf` e sequenze di escape
- Sequenze: `\n` (newline), `\t` (tab), `\r` (carriage return), ecc.
- I placeholder iniziano con `%` e indicano il tipo.

### Placeholder comuni
- Interi: `%d`/`%i`, `%l` (long), `%o` (ottale), `%x` (hex)
- Floating: `%f`, `%e`, `%g`, `%lf` (double)
- Char: `%c`, stringa: `%s`

### `printf` ritorna
- Numero di caratteri stampati.

## Identificatori
- Non iniziano con cifra.
- Solo lettere, numeri, underscore.
- Case-sensitive.
- Niente spazi o simboli speciali.
- Non usare parole chiave.

## Variabili
- Locazioni di memoria con un valore modificabile.
- Devono essere dichiarate con tipo.
- Tipi comuni: `int`, `double`, `char`.
- Modificatori: `signed`, `unsigned`, `short`, `long`, `const`.

### Tipi numerici (dimensioni tipiche)
- `char`: 1 byte
- `short`: 2 byte
- `int`: 2 o 4 byte
- `long`: 8 byte (dipende dall'architettura)
- `float`: 4 byte
- `double`: 8 byte
- `long double`: 10 byte

### `_Bool` e `bool`
- `_Bool` memorizza 0 o 1.
- `bool` richiede `#include <stdbool.h>`.

## Assegnazione e espressioni
- Variabili non inizializzate: valore indeterminato.
- Operatore `=` e' binario: `l_value = r_value`.
- Assegnamenti concatenati: `a = b = 0`.

### Troncamento e casting
- `int x; x = 3.14;` tronca a 3.
- Casting esplicito per conversione.

## Costanti
- Interi: decimale, ottale (`0`), esadecimale (`0x`).
- Caratteri: `'A'`, `'Z'`.
- Stringhe: `"testo"`.
- Float: `3.14`, `5.5E10`.

## `scanf`
- `scanf(format, address-list)`.
- Usa indirizzi (`&var`) per scrivere nelle variabili.
- Ritorna il numero di valori letti.

## Operatori
- Aritmetici: `+ - * / %`.
- Relazionali: `== != < <= > >=`.
- Logici: `! && ||`.
- Bitwise: `& | ~ ^`.
- Shift: `<< >>`.

### Precedenza
- Parentesi prima.
- `* / %` prima di `+ -`.
- Valutazione da sinistra a destra per operatori con stessa precedenza.

### Divisione e resto
- `11 / 2 / 2.0 / 2` dipende dal tipo intermedio.
- `%` ritorna il resto.

## Abbreviazioni
- `d -= 4`, `a += 3`, `e *= 5`, `f /= 3`, `g %= 9`.
- `x++` post-incremento, `++x` pre-incremento.

## Esercizi (da slide)
- Compilare ed eseguire `hello_world`.
- Includere un file C in un altro e riflettere sulla compilazione separata.
- Esercizi su `printf`, `scanf`, identificatori, formati e casting.