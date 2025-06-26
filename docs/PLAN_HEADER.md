# Plan implementacji: Header Dashboard Component

## Analiza wymagań i architektura

### Główne cele

- Stworzenie **responsywnego i uniwersalnego** komponentu nagłówka (`Header`) dla dashboardu.
- Obsługa kluczowych elementów interfejsu: **nawigacja, akcje użytkownika (profil/logout), branding (logo, tytuł), powiadomienia i wyszukiwarka**.
- Integracja z systemami **uwierzytelniania, routingiem i powiadomieniami**.
- Zapewnienie **wysokiej dostępności (Accessibility)** na wszystkich urządzeniach.

### Architektura komponentu

```
Header/
├── Header.tsx           # Główny komponent nagłówka
├── Header.module.scss   # Style modułowe (SCSS Modules)
├── Header.test.tsx      # Testy jednostkowe z użyciem React Testing Library
├── Header.stories.tsx   # Dokumentacja i demonstracja w Storybooku
├── index.ts             # Eksport publiczny komponentu
// (opcjonalnie) types.ts, components/, hooks/, utils/ # Dodatkowe foldery dla złożonych funkcji
```

---

## Detailed Implementation Checklist

### 1\. Przygotowanie struktury projektu

- [x] **Utworzenie folderu głównego**
  - Lokalizacja: `src/components/Header/`
  - Sprawdzenie potencjalnych konfliktów z istniejącymi komponentami w projekcie.

### 2\. Implementacja głównego komponentu

#### **Plik: `Header.tsx`**

- [ ] **Podstawowa struktura komponentu**
  - Import niezbędnych zależności (React, typy, komponenty wewnętrzne).
  - **Typowanie propsów** (np. `logoSrc`, `title`, `navItems`, `user`, `notifications`, `searchEnabled`, `onSearchSubmit`, `onMobileMenuToggle`, `variant`, `className`, `style`, `menuOpen`).
  - **Kompozycja wewnętrznych slotów/sekcji**: logo/branding, główna nawigacja, wyszukiwarka (jeśli aktywna), przycisk powiadomień, menu użytkownika, przycisk toggle dla menu mobilnego/sidebara.
  - Przekazywanie dodatkowych `props` (np. `className`, `style`) do głównego kontenera HTML.
  - Definicja domyślnej klasy CSS dla komponentu (np. `header`).

- [ ] **Obsługa stanu**
  - **Stan otwarcia/zamknięcia menu mobilnego** (jeśli Header ma za to odpowiadać lub synchronizować się z Sidebar).
  - **Stan widoczności menu użytkownika (dropdown)**.
  - **Stan widoczności powiadomień (dropdown)**.
  - Stan aktywacji pola wyszukiwania (jeśli jest to overlay lub rozwijane pole).

- [ ] **Obsługa interakcji**
  - Obsługa kliknięć na elementy nawigacji.
  - Obsługa kliknięć na ikony (np. powiadomienia, avatar użytkownika).
  - Obsługa akcji wyszukiwania (`onSearchSubmit`).
  - Obsługa toggle dla menu mobilnego (`onMobileMenuToggle`).

- [ ] **Accessibility features**
  - Użycie odpowiednich **etykiet ARIA (`aria-label`, `aria-expanded`, `aria-haspopup`) i ról (`role="banner"`, `role="navigation"`, `role="search"`)**.
  - Wsparcie dla **nawigacji klawiaturą** (Tab, Enter, Escape dla zamknięcia dropdownów).
  - Zapewnienie **kompatybilności z czytnikami ekranu**.
  - Zarządzanie fokusem po otwarciu/zamknięciu dropdownów.

### 3\. Styling i responsywność

#### **Plik: `Header.module.scss`**

- [ ] **Setup zmiennych i importów**

  ```scss
  @use "../styles/colors.scss" as *;
  @use "../styles/spacing.scss" as *;
  @use "../styles/typography.scss" as *;
  @use "../styles/mixins.scss" as *; // Opcjonalnie, dla reużywalnych stylów
  // opcjonalnie: @use '../../styles/breakpoints.scss' as *;
  ```

- [ ] **Definicja lokalnych zmiennych**

  ```scss
  $header-height: 4rem; // Standardowa wysokość nagłówka
  $header-height-mobile: 3.5rem; // Wysokość na urządzeniach mobilnych
  $header-z-index: 1000; // Z-index dla zapewnienia widoczności na wierzchu
  $header-bg: var(--color-surface-primary); // Kolor tła nagłówka
  $header-border: var(--color-border-subtle); // Kolor dolnej granicy
  $header-shadow: var(--shadow-sm); // Cień nagłówka
  $header-transition: 0.3s ease; // Czas przejścia dla animacji
  ```

- [ ] **Layout styling**
  - Układ wykorzystujący **Flexbox** dla głównego kontenera nagłówka i jego wewnętrznych sekcji (np. logo, nawigacja, akcje).
  - Właściwe odstępy (`padding`, `gap`) i wyrównanie (`align-items`, `justify-content`).
  - Pozycjonowanie: `fixed` lub `sticky` na górze strony.
  - Zarządzanie `z-index` w celu uniknięcia nakładania się z innymi elementami.

- [ ] **Styling poszczególnych elementów**
  - Stylizacja logo, tytułu, elementów nawigacji, ikon (powiadomienia, wyszukiwarka), awatara użytkownika.
  - Stany :hover, :focus, :active dla interaktywnych elementów.
  - Stylizacja dropdownów dla menu użytkownika i powiadomień.
  - Wsparcie dla ikon (np. z biblioteki ikon, SVG).

- [ ] **Responsive design**
  - **Podejście Mobile-first**: zaprojektuj układ najpierw dla małych ekranów.
  - Użycie **media queries** do dostosowania układu i stylów dla tabletów i desktopów.
  - Przełączanie elementów (np. nawigacja ukryta za ikoną "hamburgera" na mobile).
  - Zachowania przyjazne dla dotyku (`touch-friendly interactions`).

- [ ] **Theme support**
  - Implementacja obsługi **trybu jasnego/ciemnego** poprzez wykorzystanie zmiennych CSS (custom properties).
  - Wsparcie dla **wysokiego kontrastu**.
  - Możliwość dostosowania kolorów przewodnich.

- [ ] **Animation i transitions**
  - Płynne przejścia dla otwierania/zamykania menu mobilnego i dropdownów.
  - Efekty `hover` dla elementów interaktywnych.
  - Stany ładowania (np. dla ikony powiadomień).
  - Drobne interakcje poprawiające UX.

### 4\. Testy jednostkowe

#### **Plik: `Header.test.tsx`**

- [ ] **Podstawowe renderowanie**
  - Renderowanie `Header` z różnymi kombinacjami propsów.
  - Sprawdzenie obecności kluczowych elementów (logo, tytuł, ikony, tekst).
  - Weryfikacja domyślnych propsów i ich nadpisywania.

- [ ] **Interakcje użytkownika**
  - Testowanie kliknięć na ikony (np. `onSearchSubmit`, `onMobileMenuToggle`).
  - Obsługa otwierania i zamykania menu użytkownika/powiadomień.
  - Testowanie wprowadzenia tekstu w polu wyszukiwania i wywołania akcji `onSearchSubmit`.

- [ ] **Responsywność**
  - Testowanie zmian w strukturze DOM i stylach przy symulowanych zmianach szerokości viewportu (np. ukrywanie nawigacji na mobile).
  - Weryfikacja działania przycisku "hamburgera".

- [ ] **Accessibility (A11y)**
  - Sprawdzenie obecności wymaganych atrybutów ARIA (`role`, `aria-label`, `aria-expanded`).
  - Testowanie nawigacji klawiaturą (np. Tab do przechodzenia przez elementy, Enter do aktywacji).
  - Weryfikacja, czy elementy są poprawnie etykietowane dla czytników ekranu.

- [ ] **Integracja (mock)**
  - Mockowanie funkcji przekazywanych przez propsy (np. `onSearchSubmit`, `onMobileMenuToggle`) i weryfikacja, czy są wywoływane poprawnie.
  - Symulacja danych użytkownika i powiadomień.

### 5\. Storybook

#### **Plik: `Header.stories.tsx`**

- [ ] **Basic Stories**
  - Story z podstawowym układem: logo, tytuł, główna nawigacja, ikony akcji (wyszukiwarka, powiadomienia, user menu).
  - Warianty: `minimal` (tylko logo i tytuł), `compact` (mniejsza wysokość, uproszczona nawigacja).

- [ ] **Content Variations**
  - Header z ikonami zamiast tekstu dla nawigacji.
  - Header bez sekcji wyszukiwania/powiadomień.
  - Header z różnymi ikonami i stanami powiadomień (np. z licznikiem).
  - Różne stany użytkownika (zalogowany, gość, z avatarem/bez).

- [ ] **Interactive Stories**
  - Prezentacja działania przycisku `onMobileMenuToggle` (synchronizacja z Sidebarem).
  - Story pokazujące interakcję z menu użytkownika (otwieranie/zamykanie dropdownu).
  - Prezentacja działania wyszukiwarki.

- [ ] **Theme Stories**
  - Story demonstrujące tryb jasny (`light mode`).
  - Story demonstrujące tryb ciemny (`dark mode`).
  - Prezentacja z niestandardowymi kolorami brandowymi.

- [ ] **State Stories**
  - Stany ładowania (np. gdy dane użytkownika są pobierane).
  - Stany błędu (np. błąd ładowania powiadomień).
  - Header dla różnych ról użytkownika (np. admin vs. zwykły użytkownik).

### 6\. Eksport

#### **Plik: `index.ts`**

- [ ] Eksportuj główny komponent `Header` z folderu.
- [ ] Eksportuj typy danych (jeśli zdefiniowane w osobnym pliku `types.ts`).

### 7\. Manualne testy integracyjne

- [ ] **Integracja z Layoutem**
  - Sprawdzenie zachowania `Header` w kontekście całej aplikacji, wraz z `Sidebar` i główną zawartością.
  - Weryfikacja poprawnego pozycjonowania (`fixed`/`sticky`) i `z-index`.
  - Upewnienie się, że `Header` nie koliduje z innymi elementami strony.

- [ ] **Responsywność**
  - Dokładne testy na **prawdziwych urządzeniach mobilnych i tabletach** (różne rozmiary ekranów, orientacje).
  - Weryfikacja działania mobilnego menu i ukrywania/pokazywania elementów.
  - Testowanie dotykowych interakcji.

- [ ] **Integracja z routingiem**
  - Weryfikacja, czy kliknięcia w linki nawigacyjne w `Headerze` prowadzą do odpowiednich stron.
  - Sprawdzenie, czy aktywny link nawigacji jest poprawnie podświetlany.

- [ ] **Performance**
  - Monitorowanie płynności animacji i przejść.
  - Ocena wpływu komponentu na czas ładowania strony (bundle size).
  - Sprawdzenie zużycia pamięci.

- [ ] **Customization**
  - Testowanie możliwości nadpisywania stylów przez propsy `className` i `style`.
  - Weryfikacja, czy komponent jest elastyczny na różne dane wejściowe (np. długa nazwa użytkownika).

---

## Opcjonalne rozszerzenia

### Advanced Features (jeśli potrzebne)

- [ ] **Wyszukiwanie z autouzupełnianiem**
  - Implementacja funkcjonalności wyszukiwania z sugestiami na podstawie wpisywanego tekstu.
  - Obsługa debounce dla zapytań API.

- [ ] **Wskaźnik statusu online**
  - Mała kropka/ikona przy avatarze użytkownika wskazująca status online/offline.

- [ ] **Integracja z "breadcrumbs"**
  - Wyświetlanie ścieżki nawigacji (breadcrumbs) w nagłówku.

### Custom Hooks (jeśli złożoność wymaga)

- [ ] **`useHeaderState`**
  - Centralne zarządzanie stanem otwarcia/zamknięcia dropdownów w nagłówku, sync z mobilnym menu.

- [ ] **`useAuthStatus`**
  - Hook do pobierania i zarządzania stanem uwierzytelnienia użytkownika.

### Types (jeśli w osobnym pliku `types.ts`)

- [ ] Definicja interfejsów dla złożonych propsów, np.:

  ```typescript
  interface NavItem {
    id: string;
    label: string;
    href: string;
    icon?: string;
    active?: boolean;
  }

  interface UserInfo {
    name: string;
    avatarUrl?: string;
    role?: string;
  }

  interface Notification {
    id: string;
    message: string;
    read: boolean;
    timestamp: string;
    link?: string;
  }
  ```

---

**Uwagi końcowe:**

- **Importy SCSS** zawsze powinny być względne względem folderu komponentu, aby zachować przenośność.
- **Dodatkowe pliki i podfoldery** (`types.ts`, `components/`, `hooks/`, `utils/`) twórz tylko wtedy, gdy złożoność komponentu tego wymaga, by utrzymać czytelność i porządek.
- **Priorytetem** jest zawsze najpierw funkcjonalność i użyteczność, a dopiero potem dodatkowe rozszerzenia.
- **Testuj na prawdziwych urządzeniach mobilnych** – emulatory często nie oddają wszystkich niuansów dotyku i wydajności.
- Zachowaj **konsystencję projektową i kodową** z komponentem `Sidebar` oraz z ogólnymi wytycznymi projektowymi.
- **Dokumentuj nietypowe rozwiązania** w komentarzach w kodzie lub w Storybooku.
