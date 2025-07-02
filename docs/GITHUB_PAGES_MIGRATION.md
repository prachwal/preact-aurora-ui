# GitHub Pages Migration to Preact App

## Zmiany w systemie deploymentu

Projekt został zmigrowany z statycznej strony HTML na pełną aplikację Preact jako strona główna GitHub Pages.

### Co się zmieniło:

#### 1. **Workflow GitHub Actions** (`.github/workflows/deploy-docs.yml`)

- **Przed**: Budowa tylko Storybook + kopiowanie markdown
- **Po**: Budowa aplikacji Preact + Storybook + kopiowanie plików

#### 2. **Konfiguracja Vite** (`vite.config.ts`)

- Dodano `base: '/preact-aurora-ui/'` dla GitHub Pages
- Poprawne ścieżki assets w produkcji

#### 3. **Struktura aplikacji**

- **Strona główna**: Preact aplikacja z routingiem
- **Routing**:
  - `/` - DocsHomepage (strona główna dokumentacji)
  - `/docs/readme` - ReadmePage (dokumentacja README)
  - `/docs/components` - ComponentsPage (lista komponentów)
  - `/docs/quick-start` - QuickStartPage (przewodnik)
  - `/storybook` - Storybook (interaktywny playground)

#### 4. **Benefity nowej architektury**

- **Jeden system**: Spójne style, theming i komponenty
- **Reaktywność**: Pełne wsparcie dla dark/light mode
- **Performance**: SPA z lazy loading
- **SEO**: Lepsze metadane i struktura
- **Maintainability**: Jeden codebase zamiast dwóch

### Struktura po deployment:

```
dist/
├── index.html           # Preact aplikacja
├── assets/              # CSS/JS bundles
├── docs/                # Pliki markdown
├── storybook/           # Storybook build
└── README.md            # Główny README
```

### Linki:

- **Strona główna**: https://prachwal.github.io/preact-aurora-ui/
- **Dokumentacja**: https://prachwal.github.io/preact-aurora-ui/docs/readme
- **Komponenty**: https://prachwal.github.io/preact-aurora-ui/docs/components
- **Storybook**: https://prachwal.github.io/preact-aurora-ui/storybook

### Development vs Production:

| Environment | Base Path            | Accessible at                                  |
| ----------- | -------------------- | ---------------------------------------------- |
| Development | `/`                  | `http://localhost:5174/`                       |
| Production  | `/preact-aurora-ui/` | `https://prachwal.github.io/preact-aurora-ui/` |

Wszystkie linki wewnętrzne w aplikacji automatycznie dostosowują się do odpowiedniego środowiska.
