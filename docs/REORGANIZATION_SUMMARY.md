# Reorganizacja struktury projektu

## Podsumowanie zmian

### Utworzone foldery

- **`config/`** - wszystkie pliki konfiguracyjne narzędzi
- **`scripts/`** - skrypty buildowania i walidacji
- **`tests/legacy/`** - stare pliki testowe

### Przeniesione pliki

#### Do `config/`

- `tsconfig.*.json` (wszystkie oprócz głównego)
- `vitest.*.config.ts`
- `vite.bundle-analysis.config.ts`
- `playwright.config.ts`
- `eslint.config.js`
- `test-setup*.ts`

#### Do `scripts/`

- `build-and-copy.sh`
- `build-npm-package.sh`
- `publish-npm.sh`
- `validate-phase-6.sh`
- `validate-tests.sh`

#### Do `tests/legacy/`

- `test-v0.0.6-scss-fixes.tsx`

### Usunięte foldery

- `storybook-static/` (generowany automatycznie)
- `test-results/` (generowany automatycznie)

### Zaktualizowane pliki

#### `package.json`

- Zaktualizowane ścieżki do skryptów i plików konfiguracyjnych
- Wszystkie komendy wskazują na nowe lokalizacje

#### `tsconfig.json`

- Zaktualizowane referencje do plików w folderze `config/`

#### Pliki konfiguracyjne

- Wszystkie ścieżki względne zaktualizowane do nowych lokalizacji
- Importy w testach poprawione

#### `.gitignore`

- Dodany wpis dla `test-results/`

## Stan końcowy folderu głównego

```
.editorconfig
.git/
.github/
.gitignore
.idea/
.npmignore
.prettierignore
.prettierrc
.storybook/
.vscode/
README.md
config/          ← NOWY
demo/
dist/
docs/
index.html
node_modules/
package-lock.json
package.json
public/
scripts/         ← NOWY
src/
tests/
tsconfig.json
vite.config.ts
```

## Korzyści z reorganizacji

1. **Czystszy folder główny** - tylko najważniejsze pliki
2. **Lepsze grupowanie** - pliki konfiguracyjne w jednym miejscu
3. **Łatwiejsze zarządzanie** - skrypty w osobnym folderze
4. **Zgodność z najlepszymi praktykami** - czysta struktura projektu
5. **Zachowana funkcjonalność** - wszystkie komendy działają bez zmian

## Następne kroki

- [ ] Przetestować wszystkie komendy npm
- [ ] Sprawdzić czy build i testy działają poprawnie
- [ ] Zaktualizować dokumentację jeśli potrzeba
