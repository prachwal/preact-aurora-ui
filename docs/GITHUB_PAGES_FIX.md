# Naprawa GitHub Pages Deployment

## Problem

GitHub Actions próbował przetworzyć dokumentację jako Jekyll site, ale:

- Brakował plik `_config.yml`
- Folder `docs` zawierał statyczny HTML
- Błąd: `No such file or directory @ dir_chdir0 - /github/workspace/docs`

## Rozwiązanie

### 1. Dodano plik `.nojekyll`

- Wyłącza automatyczne przetwarzanie Jekyll
- Pozwala na deployment statycznych plików HTML

### 2. Zaktualizowano workflow GitHub Actions

- Zmieniono z `gh-pages` na nowoczesny GitHub Pages workflow
- Dodano odpowiednie permissions i security settings
- Workflow teraz używa `actions/configure-pages` i `actions/deploy-pages`

### 3. Oczyszczono package.json

- Usunięto przestarzałe komendy `docs:deploy` i `docs:deploy-storybook`
- Usunięto dependency `gh-pages`
- Deployment teraz odbywa się wyłącznie przez GitHub Actions

### 4. Zaktualizowano dokumentację

- Dodano informacje o deployment do `docs/README.md`
- Wyjaśniono strukturę dokumentacji

## Workflow po naprawie

1. **Push do main branch**
2. **GitHub Actions buduje Storybook** (`npm run build-storybook`)
3. **Upload do GitHub Pages** (folder `storybook-static`)
4. **Deployment na** https://prachwal.github.io/preact-aurora-ui

## Korzyści

- ✅ Prostszy i bardziej bezpieczny deployment
- ✅ Brak potrzeby konfiguracji Jekyll
- ✅ Automatyczny deployment przy każdym push
- ✅ Wykorzystanie najnowszych GitHub Actions
- ✅ Lepsze zarządzanie permissions i security
