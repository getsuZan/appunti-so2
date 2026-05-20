# Il Filesystem

## Intuizione Logica
Pensa al **Filesystem** come a uno schedario infinito ad albero logico che parte da un'unica radice chiamata `/` (root). Non importa se i file fisici risiedono su un SSD interno o su una chiavetta USB: il sistema del **Mounting** permette di "attaccare" qualsiasi disco a un ramo di questo albero, unificandoli.
A basso livello, ogni file non e' salvato col suo nome, ma e' associato a un **inode** (un passaporto numerico univoco) che ne contiene le caratteristiche (dimensioni, permessi, posizioni fisiche), mentre le "directory" sono in realta' solo file speciali che contengono liste di corrispondenze `nome_file -> inode`.

## Punti Chiave
- **Gerarchia**: Percorsi (path) assoluti (da `/`) e relativi (da cwd).
- **Mounting**: Meccanismo per "innestare" un file system su una directory (`mount`).
- **Inode**: Struttura dati vitale che rappresenta un file (metadati e puntatori ai blocchi dati).
- **Permessi**: Suddivisi in Proprietario, Gruppo e Altri per Lettura (r), Scrittura (w), ed Esecuzione (x).
- **Permessi speciali**: SetUID (esegue col privilegio del proprietario), SetGID, Sticky Bit.
