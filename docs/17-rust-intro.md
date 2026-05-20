# Lezione 17 - Introduzione a Rust
+
+## Obiettivi della lezione
+- Capire il problema degli accessi illegali alla memoria.
+- Motivazioni per Rust.
+- Principi di ownership e borrowing.
+- Caratteristiche base del linguaggio.
+
+## Problema: accessi illegali alla memoria
+- Buffer overflow, use-after-free, null dereference, out-of-bounds.
+- Gran parte delle vulnerabilita' in C/C++ deriva da questi errori.
+
+## Promessa di Rust
+- Se il codice compila, non ha comportamento indefinito legato alla memoria.
+- Controlli statici del compilatore, senza garbage collection.
+
+## Storia breve
+- Iniziato da Graydon Hoare (Mozilla) nel 2006.
+- Rust 1.0 nel 2015.
+- Open source, usa LLVM.
+
+## Caratteristiche principali
+- Linguaggio di sistema, ma memory-safe.
+- Stili: imperativo, funzionale, OO.
+- Tooling: `cargo`, `rustc`, `rustdoc`.
+
+## Ownership
+- Ogni allocazione heap ha un solo proprietario alla volta.
+- Quando il proprietario esce di scope, la memoria e' liberata.
+
+## Borrowing
+- Accesso alla memoria senza trasferire ownership.
+- `&T` riferimento immutabile.
+- `&mut T` riferimento mutabile.
+- Regola: o molti riferimenti immutabili, o uno mutabile.
+
+## Sicurezza statica
+- Borrow checker assicura permessi R/W/O.
+- Previene use-after-free e data race.
+
+## Esempi
+- Funzione per MCD.
+- Unit test con `cargo test`.
+- Uso di `mut` per variabili modificabili.
+
+## Esercizi (da slide)
+- Analizzare il programma MCD e il ruolo dei riferimenti.
+- Identificare dove Rust impedisce errori di memoria.
*** End Patch