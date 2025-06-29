# Aurora UI - NPM Package Publishing

## Opis

Aurora UI to nowoczesna biblioteka komponentów UI dla Preact, zgodna z Material Design 3. Ten dokument opisuje proces przygotowania i publikacji pakietu NPM.

## Struktura publikowanego pakietu

Pakiet NPM zawiera:

- ✅ **Skompilowane komponenty** (JS + TypeScript definitions)
- ✅ **Pliki SCSS** (style komponentów i globalne)
- ✅ **Dokumentację** (README dla każdego komponentu)
- ✅ **Typy TypeScript** (pełne wsparcie dla TS)
- ✅ **Index files** (łatwe importy)

## Skrypty

### `npm run build:npm`

Buduje pakiet NPM do folderu `dist/`:

- Kompiluje TypeScript (tylko komponenty, bez testów/stories)
- Kopiuje pliki SCSS
- Kopiuje dokumentację (README)
- Generuje package.json dla NPM
- Tworzy główne pliki index

### `npm run publish:npm`

Buduje pakiet i pokazuje podgląd przed publikacją:

- Wykonuje build:npm
- Pokazuje zawartość pakietu
- Daje instrukcje publikacji

## Publikacja krok po kroku

### 1. Przygotowanie

```bash
# Upewnij się, że wszystko jest commitowane
git status

# Zaktualizuj wersję w package.json
npm version patch  # lub minor/major
```

### 2. Build

```bash
npm run build:npm
```

### 3. Test lokalny

```bash
cd dist
npm publish --dry-run
```

### 4. Publikacja

```bash
# Z katalogu dist/
npm publish
```

## Struktura folderu dist/

```
dist/
├── package.json          # NPM package config
├── index.js             # Main export file
├── index.d.ts           # Main types export
├── README.md            # Main documentation
├── .npmignore           # NPM ignore rules
├── styles/              # Global SCSS files
│   ├── colors.scss
│   ├── typography.scss
│   └── spacing.scss
└── components/          # Component directories
    ├── Button/
    │   ├── Button.js
    │   ├── Button.d.ts
    │   ├── Button.module.scss
    │   ├── README.md
    │   └── index.js
    └── TextField/
        ├── TextField.js
        ├── TextField.d.ts
        ├── TextField.module.scss
        ├── README.md
        └── index.js
```

## Użycie publikowanego pakietu

### Instalacja

```bash
npm install preact-aurora-ui
```

### Import komponentów

```tsx
// Import wszystkich komponentów
import { Button, TextField, Badge } from 'preact-aurora-ui';

// Import pojedynczego komponentu
import { Button } from 'preact-aurora-ui/Button';
```

### Import stylów

```scss
// Import globalnych stylów
@use 'preact-aurora-ui/styles/colors.scss' as *;
@use 'preact-aurora-ui/styles/typography.scss' as *;

// Import stylów komponentu
@use 'preact-aurora-ui/Button/Button.module.scss' as button;
```

## Wersjonowanie

- **patch** (0.0.X) - bugfixy, drobne poprawki
- **minor** (0.X.0) - nowe funkcje, kompatybilne wstecz
- **major** (X.0.0) - breaking changes

## Troubleshooting

### Build fails

- Sprawdź błędy TypeScript: `npm run type-check`
- Sprawdź linting: `npm run lint`

### Publikacja fails

- Sprawdź czy jesteś zalogowany: `npm whoami`
- Sprawdź czy nazwa pakietu jest dostępna: `npm view preact-aurora-ui`

### Komponenty nie importują się

- Sprawdź czy index.js zawiera eksporty
- Sprawdź czy ścieżki w package.json są poprawne

## Automatyzacja (Future)

Planowane usprawnienia:

- GitHub Actions dla automatycznej publikacji
- Automatyczne zwiększanie wersji na podstawie conventional commits
- Automatyczne generowanie changelog
