# Plan implementacji: **Komponent Drawer / Modal**

---

## 1. Analiza wymagań i architektura

### Główne cele

- Stworzenie uniwersalnego komponentu do wyświetlania tymczasowej zawartości: panel wysuwany (Drawer) lub modalne okno (Modal).
- Elastyczność pozycjonowania i rozmiaru (góra, dół, lewo, prawo, center).
- Obsługa otwierania/zamykania (przycisk, overlay, Escape).
- Wysoka dostępność (WCAG), zarządzanie fokusem, aria-modal, płynne animacje.
- Integracja z Menu, Content, innymi komponentami.

### Architektura folderu

```
Drawer/
├── Drawer.tsx           # Główny komponent
├── Drawer.module.scss   # Style modułowe
├── Drawer.test.tsx      # Testy jednostkowe
├── Drawer.stories.tsx   # Storybook
├── index.ts             # Eksport publiczny
```

---

## 2. Checklist: Implementacja komponentu Drawer / Modal

### 2.1 Przygotowanie struktury projektu

- [x] Utwórz folder `src/components/Drawer/`
- [x] Sprawdź potencjalne konflikty nazw

### 2.2 Główny komponent (`Drawer.tsx`)

- [x] Import zależności: Preact, JSX, useState/useEffect/useRef, SCSS Module
- [x] Definicja interfejsu: typy, propsy, pozycje, aria
- [x] Obsługa propsów: isOpen, onClose, children, className, style, title, position, width, height, isModal, closeOnOverlayClick, closeOnEscape, showCloseButton
- [x] Obsługa zamykania przez overlay, Escape, przycisk
- [x] Focus trap, aria-modal, role, tabIndex
- [x] Integracja z systemem zmiennych SCSS
- [x] Eksport w index.ts

### 2.3 Style (`Drawer.module.scss`)

- [x] Import globalnych zmiennych przez @use
- [x] Lokalne zmienne SCSS na bazie custom properties
- [x] Style dla pozycji, animacje, overlay, panel, header, close
- [x] Responsywność, motyw, z-index

### 2.4 Testy (`Drawer.test.tsx`)

- [x] Renderowanie children
- [x] Widoczność po isOpen
- [x] Zamykanie przez overlay, Escape, przycisk
- [x] Testy propsów closeOnOverlayClick, closeOnEscape

### 2.5 Storybook (`Drawer.stories.tsx`)

- [x] Warianty: podstawowy, left, modal, bez overlay
- [x] Przykład z title, children, obsługa otwierania/zamykania

### 2.6 Eksport (`index.ts`)

- [x] Eksport komponentu Drawer

### 2.7 Dokumentacja i checklisty

- [x] Aktualizacja checklisty dashboardu
- [x] Aktualizacja planu wdrożenia Drawer

---

## 3. Status wdrożenia

- [x] Drawer w pełni wdrożony zgodnie z checklistą i instrukcją projektu.
- [x] Testy, lint, build, build-storybook przechodzą poprawnie.
- [x] Eksport, typy, SCSS Modules, accessibility, dokumentacja – zgodność z wymaganiami.
