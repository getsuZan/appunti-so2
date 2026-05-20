# Lezione 17 - Introduzione a Rust

## Obiettivi della lezione
- Capire il problema degli accessi illegali alla memoria.
- Motivazioni per Rust.
- Principi di ownership e borrowing.
- Caratteristiche base del linguaggio.

## Problema: accessi illegali alla memoria
- Buffer overflow, use-after-free, null dereference, out-of-bounds.
- Gran parte delle vulnerabilita' in C/C++ deriva da questi errori.

### Motivazione recente
- Le vulnerabilita' memory-unsafe sono una quota rilevante dei bug in software di sistema.
- Rust nasce per ridurre questa classe di problemi senza garbage collection.

## Promessa di Rust
- Se il codice compila, non ha comportamento indefinito legato alla memoria.
- Controlli statici del compilatore, senza garbage collection.

## Storia breve
- Iniziato da Graydon Hoare (Mozilla) nel 2006.
- Rust 1.0 nel 2015.
- Open source, usa LLVM.

## Caratteristiche principali
- Linguaggio di sistema, ma memory-safe.
- Stili: imperativo, funzionale, OO.
- Tooling: `cargo`, `rustc`, `rustdoc`.

## Ownership
- Ogni allocazione heap ha un solo proprietario alla volta.
- Quando il proprietario esce di scope, la memoria e' liberata.

## Borrowing
- Accesso alla memoria senza trasferire ownership.
- `&T` riferimento immutabile.
- `&mut T` riferimento mutabile.
- Regola: o molti riferimenti immutabili, o uno mutabile.

### Permessi (intuitivi)
- R: leggere, W: scrivere, O: possedere/deallocare.
- Il borrow checker assicura che i permessi non confliggano.

## Sicurezza statica
- Borrow checker assicura permessi R/W/O.
- Previene use-after-free e data race.

## Esempi
- Funzione per MCD.
- Unit test con `cargo test`.
- Uso di `mut` per variabili modificabili.

## Snippet Rust

### MCD (GCD) di due numeri
```rust
fn gcd(mut a: u64, mut b: u64) -> u64 {
	while b != 0 {
		let r = a % b;
		a = b;
		b = r;
	}
	a
}
```

### Borrowing immutabile e mutabile
```rust
fn sum_slice(v: &[i32]) -> i32 {
	let mut s = 0;
	for x in v {
		s += *x;
	}
	s
}

fn push_value(v: &mut Vec<i32>, x: i32) {
	v.push(x);
}
```

### Ownership e move
```rust
fn take_ownership(s: String) {
	println!("{}", s);
}

fn main() {
	let s = String::from("ciao");
	take_ownership(s);
	// s non e' piu' valido qui
}
```

### Test unitari
```rust
#[cfg(test)]
mod tests {
	use super::gcd;

	#[test]
	fn test_gcd() {
		assert_eq!(gcd(48, 18), 6);
	}
}
```

## Esercizi (da slide)
- Analizzare il programma MCD e il ruolo dei riferimenti.
- Identificare dove Rust impedisce errori di memoria.