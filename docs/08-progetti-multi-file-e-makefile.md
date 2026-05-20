# Lezione 8 - Progetti multi-file e makefile

## Obiettivi della lezione
- Organizzare progetti C su piu' file.
- Capire dichiarazioni e header.
- Usare `make` e scrivere Makefile.
- Regole, target, prerequisiti e variabili.

## Progetti C su piu' file
- Un programma puo' essere suddiviso in piu' file sorgenti:
  - riduce tempi di compilazione
  - facilita riuso del codice
  - facilita lavoro in gruppo

### Compilazione separata
- Ogni file `.c` genera un `.o`:
  - `gcc -c myapp_main.c`
  - `gcc -c mylib.c`
- Linking:
  - `gcc myapp_main.o mylib.o`

## Dichiarazioni e header
- Prima di usare una funzione, la sua dichiarazione deve essere visibile.
- Esempio:
  - `printf` richiede `#include <stdio.h>`.
- Per funzioni proprie:
  - dichiarazione in header o direttamente nel file che usa la funzione.

## `make` e Makefile
- `make` automatizza compilazione e linking.
- Cerca un file:
  - `GNUmakefile`, `makefile`, `Makefile`.

### Regola base
```
target: prerequisiti
<TAB>recipe
```
- Il TAB e' obbligatorio.
- La recipe e' eseguita se:
  - il target non esiste e ci sono prerequisiti, oppure
  - un prerequisito e' piu' recente del target.

### Target multipli
- Se si esegue `make` senza argomenti, viene usato il primo target.
- Si puo' specificare il target: `make nome_target`.

## Target phony
- Target senza prerequisiti = azione.
- Va dichiarato con `.PHONY`.
```make
.PHONY: clean
clean:
	rm -f *.o prog
```

## Esempi di Makefile
### Esempio semplice
```make
merge_sorted_lists: merge_sorted_lists.c
	gcc -Wall -Wextra -O3 merge_sorted_lists.c -o merge_sorted_lists
```

### Target multipli e `all`
```make
all: merge_sorted_lists sort_file_int

merge_sorted_lists: merge_sorted_lists.c
	gcc -Wall -Wextra -O3 merge_sorted_lists.c -o merge_sorted_lists

sort_file_int: sort_file_int.c
	gcc -Wall -Wextra -O3 sort_file_int.c -o sort_file_int

.PHONY: all clean
clean:
	rm -f *.o merge_sorted_lists sort_file_int
```

## Variabili in make
- Assegnazione base: `VAR := val`
- Accesso: `$(VAR)`
- Tipi di assegnazione:
  - `:=` espansione immediata
  - `=` espansione differita
  - `?=` condizionale
  - `+=` concatenazione

### Variabili automatiche
- `$@`: target
- `$^`: tutti i prerequisiti
- `$<`: primo prerequisito

## Regole implicite
- `make` ha regole implicite per casi comuni.
- Variabili implicite:
  - `CC`, `CFLAGS`, `LDFLAGS`, `LDLIBS`
- Esempio di regola implicita per eseguibile `x` da `x.c`:
  `$(CC) $(CFLAGS) $(LDFLAGS) x.c $(LDLIBS) -o x`

## Esercizio (da slide)
- Progetto su piu' file per verificare se una stringa e' palindroma.
- Scrivere prima il Makefile.
- Target `clean` per rimuovere `.o`.