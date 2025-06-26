# Plan implementacji: **Komponent Loader / Spinner**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie uniwersalnego komponentu Loader/Spinner do sygnalizacji ładowania.
- Warianty rozmiaru (sm, md, lg), kolor, aria, dostępność.
- Integracja z systemem zmiennych SCSS, motyw, customizacja przez propsy.
- Testy, stories, eksport, checklist.

### Architektura folderu

```
Loader/
├── Loader.tsx           # Główny komponent
├── Loader.module.scss   # Style modułowe
├── Loader.test.tsx      # Testy jednostkowe
├── Loader.stories.tsx   # Storybook
├── index.ts             # Eksport publiczny
```

---

## 2. Checklist: Implementacja komponentu Loader / Spinner

### 2.1 Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Loader/`
- [x] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Loader.tsx`)

- [x] Import zależności: Preact, JSX, SCSS Module
- [x] Definicja interfejsu: typy, propsy, aria
- [x] Obsługa propsów: size, color, className, style, aria-label
- [x] Integracja z systemem zmiennych SCSS
- [x] Eksport w index.ts

### 2.3 Style (`Loader.module.scss`)

- [x] Import globalnych zmiennych przez @use
- [x] Lokalne zmienne SCSS na bazie custom properties
- [x] Style dla rozmiarów, animacja, motyw

### 2.4 Testy (`Loader.test.tsx`)

- [x] Renderowanie domyślne
- [x] Warianty size, color
- [x] Aria-label

### 2.5 Storybook (`Loader.stories.tsx`)

- [x] Warianty: domyślny, large, custom color

### 2.6 Eksport (`index.ts`)

- [x] Eksport komponentu Loader

### 2.7 Dokumentacja i checklisty

- [x] Aktualizacja checklisty dashboardu
- [x] Aktualizacja planu wdrożenia Loader

---

## 3. Status wdrożenia

- [x] Loader w pełni wdrożony zgodnie z checklistą i instrukcją projektu.
- [x] Testy, lint, build, build-storybook przechodzą poprawnie.
- [x] Eksport, typy, SCSS Modules, accessibility, dokumentacja – zgodność z wymaganiami.
