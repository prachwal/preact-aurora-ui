# BottomNavigation

Nawigacja dolna na urządzenia mobilne zgodna z Material Design 3, zapewniająca szybki dostęp do głównych sekcji aplikacji.

## 🎯 Kiedy używać

- **Aplikacje mobilne** - główna nawigacja na urządzeniach dotykowych
- **Dostęp do kluczowych sekcji** - 3-5 głównych obszarów aplikacji
- **Nawigacja na poziomie aplikacji** - przełączanie między widokami wysokiego poziomu
- **Zamiast menu hamburger** - alternatywa dla mobilnej nawigacji bocznej

## 📱 Podstawowe użycie

```tsx
import { BottomNavigation, BottomNavigationTab } from 'preact-aurora-ui';
import { useState } from 'preact/hooks';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab}>
      <BottomNavigationTab index={0} label="Dom" icon="🏠" />
      <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
      <BottomNavigationTab index={2} label="Profil" icon="👤" />
    </BottomNavigation>
  );
}
```

## 🔧 Warianty

### Bez etykiet (kompaktowy)

```tsx
<BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} showLabels={false}>
  <BottomNavigationTab index={0} label="Dom" icon="🏠" />
  <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
  <BottomNavigationTab index={2} label="Profil" icon="👤" />
</BottomNavigation>
```

### Z ukrywaniem podczas przewijania

```tsx
<BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} autoHide={true}>
  <BottomNavigationTab index={0} label="Dom" icon="🏠" />
  <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
  <BottomNavigationTab index={2} label="Profil" icon="👤" />
</BottomNavigation>
```

### Z powiadomieniami (badge)

```tsx
<BottomNavigation activeTab={activeTab} onTabChange={setActiveTab}>
  <BottomNavigationTab index={0} label="Dom" icon="🏠" />
  <BottomNavigationTab index={1} label="Wiadomości" icon="💬" badge={5} />
  <BottomNavigationTab index={2} label="Powiadomienia" icon="🔔" badge={99} />
</BottomNavigation>
```

### Ze stanem wyłączonym

```tsx
<BottomNavigation activeTab={activeTab} onTabChange={setActiveTab}>
  <BottomNavigationTab index={0} label="Dom" icon="🏠" />
  <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
  <BottomNavigationTab index={2} label="Premium" icon="⭐" disabled={true} />
</BottomNavigation>
```

## 🧩 Integracja z routerem

### React Router

```tsx
import { useLocation, useNavigate } from 'react-router-dom';

function AppNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    { path: '/', icon: '🏠', label: 'Dom' },
    { path: '/search', icon: '🔍', label: 'Wyszukaj' },
    { path: '/profile', icon: '👤', label: 'Profil' },
  ];

  const activeTab = routes.findIndex((route) => location.pathname === route.path);

  const handleTabChange = (index: number) => {
    navigate(routes[index].path);
  };

  return (
    <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange}>
      {routes.map((route, index) => (
        <BottomNavigationTab key={route.path} index={index} label={route.label} icon={route.icon} />
      ))}
    </BottomNavigation>
  );
}
```

### Z lazy loading

```tsx
function AppWithLazyTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [loadedTabs, setLoadedTabs] = useState(new Set([0]));

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setLoadedTabs((prev) => new Set([...prev, index]));
  };

  return (
    <>
      <main>
        {activeTab === 0 && <HomeView />}
        {activeTab === 1 && loadedTabs.has(1) && <SearchView />}
        {activeTab === 2 && loadedTabs.has(2) && <ProfileView />}
      </main>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange}>
        <BottomNavigationTab index={0} label="Dom" icon="🏠" />
        <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
        <BottomNavigationTab index={2} label="Profil" icon="👤" />
      </BottomNavigation>
    </>
  );
}
```

## 📋 API Reference

### BottomNavigation

| Prop          | Typ                       | Domyślnie | Opis                                         |
| ------------- | ------------------------- | --------- | -------------------------------------------- |
| `activeTab`   | `number`                  | -         | **Wymagane.** Indeks aktywnej zakładki       |
| `onTabChange` | `(index: number) => void` | -         | **Wymagane.** Callback zmiany zakładki       |
| `children`    | `ReactNode`               | -         | **Wymagane.** Komponenty BottomNavigationTab |
| `showLabels`  | `boolean`                 | `true`    | Pokazywanie etykiet zakładek                 |
| `autoHide`    | `boolean`                 | `false`   | Ukrywanie podczas przewijania w dół          |
| `className`   | `string`                  | -         | Dodatkowe klasy CSS                          |

### BottomNavigationTab

| Prop        | Typ          | Domyślnie | Opis                                                   |
| ----------- | ------------ | --------- | ------------------------------------------------------ |
| `index`     | `number`     | -         | **Wymagane.** Indeks zakładki                          |
| `label`     | `string`     | -         | **Wymagane.** Etykieta zakładki                        |
| `icon`      | `ReactNode`  | -         | **Wymagane.** Ikona zakładki                           |
| `active`    | `boolean`    | `false`   | Stan aktywny (zarządzany przez BottomNavigation)       |
| `badge`     | `number`     | -         | Liczba powiadomień (> 99 pokazuje kropkę)              |
| `disabled`  | `boolean`    | `false`   | Stan wyłączony                                         |
| `showLabel` | `boolean`    | `true`    | Pokazywanie etykiety (dziedziczone z BottomNavigation) |
| `onClick`   | `() => void` | -         | Handler kliknięcia                                     |
| `className` | `string`     | -         | Dodatkowe klasy CSS                                    |
| `tabIndex`  | `number`     | `0`       | Indeks tabulacji dla accessibility                     |

## 🎨 Stylowanie

### CSS Custom Properties

```css
.custom-bottom-navigation {
  /* Wysokość nawigacji */
  --nav-height: 72px;
  --nav-height-compact: 56px;

  /* Kolory */
  --nav-background: var(--md-sys-color-surface-container);
  --nav-border: var(--md-sys-color-outline-variant);

  /* Kolory zakładek */
  --tab-color-inactive: var(--md-sys-color-on-surface-variant);
  --tab-color-active: var(--md-sys-color-on-secondary-container);
  --tab-background-active: var(--md-sys-color-secondary-container);

  /* Badge */
  --badge-background: var(--md-sys-color-error);
  --badge-color: var(--md-sys-color-on-error);
}
```

### Responsywne zachowanie

```scss
.bottomNavigation {
  // Kompaktowy tryb na małych ekranach
  @media (max-width: 480px) {
    height: var(--nav-height-compact);

    .label {
      font-size: calc(var(--md-sys-typescale-label-small-size) * 0.9);
    }
  }

  // Ukrywanie podczas przewijania
  &.hidden {
    transform: translateY(100%);
  }
}
```

### Custom ikony

```tsx
import { Icon } from 'preact-aurora-ui';

<BottomNavigationTab index={0} label="Dom" icon={<Icon name="home" size={24} />} />;
```

## ♿ Accessibility

### ARIA Labels

```tsx
<BottomNavigation
  activeTab={activeTab}
  onTabChange={setActiveTab}
  aria-label="Główna nawigacja aplikacji"
>
  <BottomNavigationTab index={0} label="Dom" icon="🏠" aria-label="Przejdź do strony głównej" />
</BottomNavigation>
```

### Nawigacja klawiaturą

- **Tab/Shift+Tab** - przełączanie fokusa między zakładkami
- **Strzałki lewo/prawo** - nawigacja między zakładkami z zawijaniem
- **Home/End** - przejście do pierwszej/ostatniej zakładki
- **Enter/Space** - aktywacja zakładki
- **Escape** - opuszczenie nawigacji

### Screen readers

```tsx
// Automatyczne dodawanie informacji o badge
<BottomNavigationTab
  index={1}
  label="Wiadomości"
  icon="💬"
  badge={5}
  // aria-label="Wiadomości (5 powiadomień)"
/>
```

## 🧪 Testowanie

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { BottomNavigation, BottomNavigationTab } from 'preact-aurora-ui';

test('renderuje nawigację z zakładkami', () => {
  const onTabChange = vi.fn();

  render(
    <BottomNavigation activeTab={0} onTabChange={onTabChange}>
      <BottomNavigationTab index={0} label="Dom" icon="🏠" />
      <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
    </BottomNavigation>,
  );

  expect(screen.getByRole('tablist')).toBeInTheDocument();
  expect(screen.getByText('Dom')).toBeInTheDocument();
  expect(screen.getByText('Wyszukaj')).toBeInTheDocument();
});

test('wywołuje onTabChange przy kliknięciu', async () => {
  const user = userEvent.setup();
  const onTabChange = vi.fn();

  render(
    <BottomNavigation activeTab={0} onTabChange={onTabChange}>
      <BottomNavigationTab index={0} label="Dom" icon="🏠" />
      <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
    </BottomNavigation>,
  );

  await user.click(screen.getByRole('tab', { name: /wyszukaj/i }));
  expect(onTabChange).toHaveBeenCalledWith(1);
});
```

### Testy nawigacji klawiaturą

```tsx
test('obsługuje nawigację strzałkami', async () => {
  const user = userEvent.setup();
  const onTabChange = vi.fn();

  render(
    <BottomNavigation activeTab={0} onTabChange={onTabChange}>
      <BottomNavigationTab index={0} label="Dom" icon="🏠" />
      <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
      <BottomNavigationTab index={2} label="Profil" icon="👤" />
    </BottomNavigation>,
  );

  const homeTab = screen.getByRole('tab', { name: /dom/i });
  homeTab.focus();

  await user.keyboard('{ArrowRight}');
  expect(onTabChange).toHaveBeenCalledWith(1);

  await user.keyboard('{ArrowLeft}');
  expect(onTabChange).toHaveBeenCalledWith(0);
});
```

### Testy accessibility

```tsx
test('ma poprawną strukturę ARIA', () => {
  render(
    <BottomNavigation activeTab={1} onTabChange={vi.fn()}>
      <BottomNavigationTab index={0} label="Dom" icon="🏠" />
      <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
    </BottomNavigation>,
  );

  const navigation = screen.getByRole('tablist');
  expect(navigation).toHaveAttribute('aria-label', 'Bottom navigation');

  const activeTab = screen.getByRole('tab', { name: /wyszukaj/i });
  expect(activeTab).toHaveAttribute('aria-selected', 'true');
  expect(activeTab).toHaveAttribute('tabindex', '0');

  const inactiveTab = screen.getByRole('tab', { name: /dom/i });
  expect(inactiveTab).toHaveAttribute('aria-selected', 'false');
  expect(inactiveTab).toHaveAttribute('tabindex', '-1');
});
```

## 📚 Przykłady zaawansowane

### Z animowanymi ikonami

```tsx
function AnimatedTab({ active, icon, label, ...props }) {
  return (
    <BottomNavigationTab
      {...props}
      label={label}
      icon={
        <div className={`icon ${active ? 'active' : ''}`}>
          {icon}
        </div>
      }
    />
  );
}

// CSS
.icon {
  transition: transform 0.2s ease;
}
.icon.active {
  transform: scale(1.2);
}
```

### Z gestami swipe

```tsx
import { useSwipeable } from 'react-swipeable';

function SwipeableNavigation() {
  const [activeTab, setActiveTab] = useState(0);
  const maxTabs = 3;

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setActiveTab((prev) => Math.min(prev + 1, maxTabs - 1));
    },
    onSwipedRight: () => {
      setActiveTab((prev) => Math.max(prev - 1, 0));
    },
    trackMouse: true,
  });

  return (
    <div {...handlers}>
      <main>{/* Treść widoku */}</main>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab}>
        <BottomNavigationTab index={0} label="Dom" icon="🏠" />
        <BottomNavigationTab index={1} label="Wyszukaj" icon="🔍" />
        <BottomNavigationTab index={2} label="Profil" icon="👤" />
      </BottomNavigation>
    </div>
  );
}
```

## ❓ FAQ

**P: Ile zakładek mogę dodać do BottomNavigation?**  
O: Zalecane są 3-5 zakładek. Więcej może powodować problemy z UX na małych ekranach.

**P: Jak ukryć etykiety na małych ekranach?**  
O: Użyj `showLabels={false}` lub CSS media queries do responsywnego ukrywania.

**P: Czy mogę używać niestandardowych ikon?**  
O: Tak, prop `icon` przyjmuje `ReactNode`, więc możesz używać komponentów ikon, SVG, czy emoji.

**P: Jak obsłużyć deep linking z BottomNavigation?**  
O: Zintegruj z routerem - sprawdź przykład z React Router powyżej.

**P: Czy autoHide działa też przy przewijaniu w górę?**  
O: Tak, nawigacja pojawia się przy przewijaniu w górę i ukrywa przy przewijaniu w dół (po przejściu 100px).

**P: Jak zmienić wysokość nawigacji?**  
O: Użyj CSS custom properties `--nav-height` i `--nav-height-compact`.

---

**Powiązane komponenty:**

- [Tabs](../Tabs/README.md) - Zakładki dla treści
- [Menu](../Menu/README.md) - Menu kontekstowe
- [Breadcrumbs](../Breadcrumbs/README.md) - Ścieżka nawigacyjna
