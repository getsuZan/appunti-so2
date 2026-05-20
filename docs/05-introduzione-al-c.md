# Introduzione al C

## Intuizione Logica
Il **C** e' spesso definito un "Assembly portabile" perche' non ti nasconde nulla: parli quasi direttamente con le aree di memoria viste nel capitolo dei processi. Il compilatore prende passaggi logici testuali (codice sorgente) e li trasforma in istruzioni macchina brute che finiscono nel *Text Segment* del processo. Non c'e' macchina virtuale in mezzo (a differenza di Java).
Si definiscono variabili in memoria in base alla capacita' che ci serve (`char`, `int`, `float`, `double`). Non "esiste" la magia, ogni dichiarazione corrisponde a spazio fisicamente richiesto nella RAM.

## Punti Chiave
- **Compilazione (`gcc`)**: Fasi dal pre-processore (macros/include), compilazione, linking (collegare le librerie).
- **Struttura base**: Funzione `main()`, inclusioni `#include <stdio.h>`.
- **Variabili**: Tipi primitivi in memoria, Scope della variabile (vita e visibilita').
- **I/O base**: `printf` e `scanf` con i segnaposto (`%d`, `%f`, `%s`, etc.).
