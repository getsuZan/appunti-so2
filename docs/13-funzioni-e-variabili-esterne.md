# Lezione 13 - Funzioni e variabili esterne/statiche, gdb
+
+## Obiettivi della lezione
+- Capire visibilita' e scoping in C.
+- Usare variabili esterne e statiche.
+- Funzioni statiche.
+- Ricorsione e puntatori a funzione.
+- Uso base di gdb.
+
+## Visibilita' delle variabili
+- Variabile locale: visibile solo nel blocco in cui e' dichiarata.
+- Variabile globale: visibile dal punto di dichiarazione alla fine del file.
+
+## Variabili esterne (`extern`)
+- Dichiarazione: specifica tipo e dimensione.
+- Definizione: alloca memoria.
+- `extern` permette di dichiarare una variabile definita in un altro file:
+```c
+extern int myvar;
+extern char str[];
+```
+
+### Esempio tipico
+- Una funzione usa `extern` se la variabile non e' ancora definita nel file corrente.
+- La definizione reale sta in un altro file .c.
+
+## Variabili statiche
+- Possono essere locali o globali.
+- Statiche locali:
+  - dichiarate dentro una funzione.
+  - mantengono il valore tra chiamate successive.
+  - inizializzate automaticamente a 0 se non inizializzate esplicitamente.
+
+### Statiche globali
+- Dichiarate fuori da ogni funzione.
+- Visibili solo nel file sorgente corrente (scope di file).
+
+## Funzioni statiche
+- `static` su una funzione ne limita la visibilita' al file corrente.
+- Utile per nascondere implementazioni interne.
+
+## Ricorsione
+- Funzioni che chiamano se stesse.
+- Pro: codice compatto.
+- Contro: overhead e uso stack per variabili locali.
+
+## Puntatori a funzione
+- Dichiarazione:
+```c
+int (*funptr)();
+```
+- Chiamata:
+```c
+int a = (*funptr)();
+```
+- Usati per funzioni generiche (es. `qsort`).
+
+## gdb (debugger)
+- Compilare con simboli di debug:
+  - `gcc -g file.c`
+- gdb consente:
+  - breakpoints
+  - ispezione variabili
+  - stepping
+- `strip` rimuove simboli di debug:
+  - `strip file.o`
+
+## Esercizi (da slide)
+- Spostare definizione di variabile globale in un altro file e usare `extern`.
+- Rendere una funzione `static` e osservare la visibilita'.
+- Implementare fattoriale ricorsivo.
+- Usare puntatori a funzione in esempi generici.
*** End Patch