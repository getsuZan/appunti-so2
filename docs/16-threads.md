# Lezione 16 - Thread (I)
+
+## Obiettivi della lezione
+- Definire thread e differenze con processi.
+- Modelli di implementazione.
+- Libreria pthread e funzioni principali.
+- Esercizi di base.
+
+## Concetto di thread
+- Un thread e' un flusso di esecuzione all'interno di un processo.
+- In un'app multithread piu' flussi condividono memoria e risorse.
+- L'app termina quando tutti i thread sono terminati.
+
+## Vantaggi
+- Miglior tempo di risposta.
+- Condivisione risorse immediata.
+- Maggiore efficienza rispetto a processi separati.
+- Scalabilita' con multicore.
+
+## Processi vs thread
+- Processi: memoria isolata, context switch costoso.
+- Thread: memoria condivisa, context switch leggero.
+- Comunicazione tra thread piu' veloce, ma rischi di concorrenza.
+
+## Modelli di implementazione
+- Many-to-one (user-level): un thread kernel per tanti thread utente.
+- One-to-one (kernel-level): ogni thread utente ha thread kernel.
+- Many-to-many: mappatura flessibile.
+
+## Libreria pthread
+- Standard POSIX.
+- In Linux: NPTL (one-to-one).
+
+### Creazione thread
+```c
+int pthread_create(pthread_t *tid, pthread_attr_t *attr,
+                   void *(*start)(void *), void *arg);
+```
+
+### Terminazione thread
+```c
+void pthread_exit(void *value_ptr);
+```
+
+### Join
+```c
+int pthread_join(pthread_t tid, void **retval);
+```
+
+## Attributi thread
+- `pthread_attr_t` controlla stack, detach, scheduling.
+- Funzioni: `pthread_attr_init`, `pthread_attr_setstacksize`, ecc.
+
+## Terminazione processo multithread
+- `exit()` termina l'intero processo.
+- `pthread_exit()` termina il thread chiamante.
+
+## Implementazione Linux
+- Basata su `clone()` con flag `CLONE_XXX`.
+- `fork()` = `clone()` senza condivisioni.
+- `pthread_create()` = `clone()` con condivisione completa.
+
+## Esercizi (da slide)
+- Thread che stampa numeri con sleep.
+- Creare 5 thread con messaggi.
+- Condivisione variabile globale senza sincronizzazione.
*** End Patch