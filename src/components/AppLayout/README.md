# AppLayout

Inteligentny komponent-wrapper, który stanowi podstawę struktury każdej aplikacji. Umożliwia łatwe tworzenie responsywnych układów z nagłówkiem, panelem bocznym, główną treścią i stopką, a także automatycznie zarządza motywem (jasny/ciemny).

## Przykłady użycia

### 1. Podstawowy układ aplikacji

```tsx
import { AppLayout } from 'preact-aurora-ui';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Content } from '../Content';

function MyApp() {
  return (
    <AppLayout header={<Header>Nagłówek Aplikacji</Header>} sidebar={<Sidebar>Menu</Sidebar>}>
      <Content>
        <h1>Witaj w mojej aplikacji!</h1>
        <p>To jest główna treść.</p>
      </Content>
    </AppLayout>
  );
}
```

### 2. Zaawansowany układ z kontrolą stanu i motywu

```tsx
import { useState } from 'preact/hooks';
import { AppLayout } from 'preact-aurora-ui';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { Button } from '../Button';

function AdvancedApp() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);
  const changeTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  return (
    <AppLayout
      header={
        <Header>
          <Button onClick={toggleSidebar}>Toggle Sidebar</Button>
          <Button onClick={changeTheme}>Change Theme</Button>
        </Header>
      }
      sidebar={<Sidebar>Nawigacja</Sidebar>}
      sidebarCollapsed={isSidebarCollapsed}
      onSidebarToggle={setSidebarCollapsed}
      theme={theme}
      footer={<footer>Stopka</footer>}
    >
      <main>
        <p>Treść aplikacji z kontrolowanym stanem.</p>
      </main>
    </AppLayout>
  );
}
```

## API

| Prop                  | Typ                            | Domyślnie    | Opis                                                                              |
| :-------------------- | :----------------------------- | :----------- | :-------------------------------------------------------------------------------- |
| `header`              | `ComponentChildren`            | `undefined`  | Komponent do wyświetlenia w nagłówku.                                             |
| `sidebar`             | `ComponentChildren`            | `undefined`  | Komponent do wyświetlenia w panelu bocznym.                                       |
| `footer`              | `ComponentChildren`            | `undefined`  | Komponent do wyświetlenia w stopce.                                               |
| `children`            | `ComponentChildren`            | **Wymagane** | Główna treść aplikacji.                                                           |
| `theme`               | `'light' \| 'dark' \| 'auto'`  | `'auto'`     | Motyw kolorystyczny. `'auto'` dostosowuje się do ustawień systemowych.            |
| `sidebarCollapsed`    | `boolean`                      | `false`      | Kontroluje, czy panel boczny jest zwinięty.                                       |
| `onSidebarToggle`     | `(collapsed: boolean) => void` | `undefined`  | Funkcja zwrotna wywoływana przy zmianie stanu panelu bocznego.                    |
| `responsive`          | `boolean`                      | `true`       | Włącza/wyłącza zachowania responsywne.                                            |
| `sidebarBreakpoint`   | `number`                       | `768`        | Szerokość ekranu w pikselach, poniżej której layout przełącza się w tryb mobilny. |
| `autoThemeManagement` | `boolean`                      | `true`       | Automatycznie zarządza globalnymi stylami motywu przez `ThemeProvider`.           |
| `enableGrid`          | `boolean`                      | `true`       | Używa CSS Grid do budowy layoutu.                                                 |
| `maxWidth`            | `string \| number`             | `undefined`  | Maksymalna szerokość kontenera aplikacji.                                         |
| `className`           | `string`                       | `''`         | Dodatkowe klasy CSS.                                                              |
| `style`               | `JSX.CSSProperties`            | `undefined`  | Style inline.                                                                     |

## Dostępność (A11y)

- Automatyczne role i aria-labels dla sekcji layoutu
- Keyboard navigation między sekcjami
- Focus management przy zwijaniu/rozwijaniu sidebara
- Screen reader announcements dla zmian layoutu

## Integracja

- **ThemeProvider**: `AppLayout` automatycznie opakowuje całą aplikację w `ThemeProvider`
- **Container**: Wewnętrznie używa komponentu `Container` do zarządzania tłem i kolorem tekstu
- **Layout**: Główna treść jest umieszczona w komponencie `Layout` dla prawidłowego przewijania

## Stylowanie

Layout używa CSS Grid i jest w pełni responsywny. Obsługuje:

- Flexibilne rozmiary sekcji
- Automatyczne ukrywanie sidebara na mobile
- Smooth transitions przy zmianie motywu
- Custom breakpoints dla responsywności
