# Progetti Multi-File e Makefile

## Intuizione Logica
Costruire programmi giganti richiede decine di file `.c`. Compilare sempre tutto richiede uno spreco di risorse. Il processo andrebbe spezzato: compila solo cio' che modifichi e "cuci" assieme i pezzi precompilati in un solo passaggio finale (`Linker`). Avere queste regole scritte su carta permette l'automazione perfetta: per questo usiamo `Make`. Un `Makefile` e' l'albero delle dipendenze di un software: "Per creare C servono A e B; se A e' piu' fresco/modificato rispetto alla volta in cui e' stato creato C, ri-esegui il comando che genera C".

## Punti Chiave
- **Compilazione modulare**: File oggetto (`.o`) via `gcc -c`.
- **Linking**: Assemblamento dei file `.o` in un solo eseguibile. Dichiarazione delle firme (headers `.h` vs body `.c`).
- **Make/Makefile**: Regole espresse con Target, Dependencies/Prerequisites, Recipe (comando).
- **Variabili**: Macro, target fasulli (`.PHONY clean`) e regole implicite.
