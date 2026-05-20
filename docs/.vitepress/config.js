import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/appunti-so2/',
  title: 'Sistemi Operativi 2',
  description: 'Appunti e concetti logici del corso di Sistemi Operativi 2',
  appearance: 'dark',
  themeConfig: {
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'Lezioni',
        items: [
          { text: '1. Primi passi: Shell, Utenti, Filesystem', link: '/01-primi-passi-shell-utenti-filesystem' },
          { text: '2. Il Filesystem', link: '/02-filesystem' },
          { text: '3. Comandi Gestione Filesystem', link: '/03-comandi-gestione-filesystem' },
          { text: '4. I Processi', link: '/04-processi' },
          { text: '5. Introduzione al C', link: '/05-introduzione-al-c' },
          { text: '6. Cicli e Array', link: '/06-cicli-e-array' },
          { text: '7. Funzioni e Stringhe', link: '/07-funzioni-e-stringhe' },
          { text: '8. Progetti Multi-File e Makefile', link: '/08-progetti-multi-file-e-makefile' },
          { text: '9. Allocazione Dinamica, Strutture e File I/O', link: '/09-allocazione-dinamica-strutture-file-io' },
          { text: '10. Chiamate di Sistema e System Programming', link: '/10-chiamate-di-sistema-e-system-programming' },
          { text: '11. System Call per File I/O', link: '/11-system-calls-processi-segnali-pipe' },
          { text: '12. System Call per i Processi', link: '/12-reti-thread-rust' },
          { text: '13. Funzioni e Variabili Esterne/Statiche, GDB', link: '/13-funzioni-e-variabili-esterne' },
          { text: '14. Segnali, Pipe, FIFO', link: '/14-segnali-pipe-fifo' },
          { text: '15. Socket', link: '/15-socket' },
          { text: '16. Thread', link: '/16-threads' },
          { text: '17. Introduzione a Rust', link: '/17-rust-intro' }
        ]
      }
    ]
  }
})
