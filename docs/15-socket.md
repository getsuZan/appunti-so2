# Lezione 15 - Socket

## Obiettivi della lezione
- Ripasso pipe e comunicazione bidirezionale.
- Introduzione alle socket.
- Architettura client-server.
- System call principali per socket TCP.

## Pipe: riepilogo
- Pipe e' unidirezionale.
- Per comunicazione bidirezionale servono due pipe.
- Dopo `fork`, chiudere i canali non usati.

## Socket
- Permettono comunicazione tra processi su stessa macchina o in rete.
- Paradigma client-server.
- Full-duplex.

### System call principali
- `socket` crea la socket.
- `bind` assegna un nome/indirizzo.
- `listen` mette in ascolto.
- `accept` accetta una connessione.
- `connect` connette il client.

## Tipi di socket
- Domain:
	- `AF_LOCAL` / `AF_UNIX` (locale)
	- `AF_INET` (IPv4)
	- `AF_INET6` (IPv6)
- Type:
	- `SOCK_STREAM` (TCP)
	- `SOCK_DGRAM` (UDP)
	- `SOCK_RAW`
- Protocol: di solito 0.

### Differenze principali
- `AF_LOCAL` usa nomi di file nel filesystem.
- `AF_INET`/`AF_INET6` usano IP e porte.
- `SOCK_STREAM` e' orientato alla connessione (TCP).
- `SOCK_DGRAM` e' a datagrammi (UDP), senza connessione.

## Anatomia server TCP
1. `socket()`
2. `bind()`
3. `listen()`
4. `accept()`
5. gestire client (spesso con `fork`)

## Anatomia client TCP
1. `socket()`
2. preparare `sockaddr_in`
3. `connect()`
4. `read`/`write`
5. `close()`

## `sockaddr_in`
- Campi principali:
	- `sin_family`
	- `sin_port` (network byte order)
	- `sin_addr` (network byte order)
- Macro utili:
	- `INADDR_ANY`
	- `INADDR_LOOPBACK`

### Conversioni di byte order
- `htons` per porte, `htonl` per indirizzi.
- `inet_aton` per convertire stringhe IP.

## Conversioni
- `htonl`, `htons` per host->network.
- `inet_aton` per IP stringa.
- `gethostbyname` per risoluzione hostname.

## Note operative
- Scrittura su socket chiusa -> SIGPIPE.
- `accept` ritorna un nuovo fd per la connessione.

## Esempio minimale server con fork
```c
int sd = socket(AF_INET, SOCK_STREAM, 0);
bind(sd, (struct sockaddr *)&addr, sizeof(addr));
listen(sd, 16);
while (1) {
	int client_sd = accept(sd, NULL, NULL);
	if (client_sd < 0) continue;
	if (fork() == 0) {
		// read/write su client_sd
		close(client_sd);
		_exit(0);
	}
	close(client_sd);
}
```

## Esercizi (da slide)
- Passare porta come parametro client/server.
- Creare un server che fork-a per ogni connessione.