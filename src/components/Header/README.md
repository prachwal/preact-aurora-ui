# Header

Komponent nagłówka aplikacji zgodny z Material Design 3 App Bar, zapewniający nawigację, branding i działania użytkownika.

## 🎯 Kiedy używać

- **Główny nagłówek aplikacji** - logo, tytuł, nawigacja globalna
- **Dashboard header** - przełączanie widoków, akcje kontekstowe
- **Mobile app bars** - hamburger menu, tytuł strony, akcje
- **Landing pages** - nawigacja, CTA, przełącznik motywu

## 📱 Podstawowe użycie

```tsx
import { Header } from 'preact-aurora-ui';

function App() {
  return (
    <Header>
      <h1>My Application</h1>
    </Header>
  );
}
```

## 🔧 Warianty

### Header z logo i nawigacją

```tsx
function AppHeader() {
  return (
    <Header
      logo={
        <div className="logo">
          <img src="/logo.svg" alt="Logo" />
          <span>MyApp</span>
        </div>
      }
      nav={
        <nav>
          <a href="/home">Home</a>
          <a href="/products">Products</a>
          <a href="/about">About</a>
        </nav>
      }
      actions={
        <div>
          <Button variant="text">Login</Button>
          <Button variant="filled">Sign Up</Button>
        </div>
      }
    />
  );
}
```

### Header z hamburger menu (mobile)

```tsx
function MobileHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Header
      navigationIcon={<IconButton icon="menu" />}
      onNavigationClick={() => setSidebarOpen(true)}
      centerTitle
    >
      <h1>Page Title</h1>
    </Header>
  );
}
```

### Header z przełącznikiem motywu

```tsx
function ThemedHeader() {
  return (
    <Header
      logo={<Logo />}
      showThemeToggle
      themeTogglePosition="right"
      themeToggleVariant="button"
      autoColorManagement
    >
      <h1>Theme-aware App</h1>
    </Header>
  );
}
```

## 🎨 Warianty stylowe

### Różne wysokości i style

```tsx
// Domyślny
<Header variant="default">
  Standard Header
</Header>

// Kompaktowy (mniejsza wysokość)
<Header variant="compact">
  Compact Header
</Header>

// Prominentny (większa wysokość)
<Header variant="prominent">
  Prominent Header
</Header>

// Minimalny (bez stylu)
<Header variant="minimal">
  Minimal Header
</Header>
```

### Poziomy cienia (elevation)

```tsx
// Bez cienia
<Header elevation={0}>No shadow</Header>

// Subtelny cień
<Header elevation={1}>Light shadow</Header>

// Średni cień (domyślny)
<Header elevation={2}>Medium shadow</Header>

// Silny cień
<Header elevation={3}>Strong shadow</Header>

// Bardzo silny cień
<Header elevation={4}>Very strong shadow</Header>
```

### Sticky i borderless

```tsx
// Sticky header (przykleja się do góry)
<Header sticky>
  Sticky Header
</Header>

// Bez obramowania
<Header borderless>
  Borderless Header
</Header>

// Kombinacja
<Header sticky borderless elevation={2}>
  Advanced Header
</Header>
```

## 🎯 Zachowanie przy scrollowaniu

### Fixed (domyślny)

```tsx
<Header scrollBehavior="fixed">Always visible</Header>
```

### Hide (ukrywa się przy scrollu w dół)

```tsx
<Header scrollBehavior="hide" scrollThreshold={50}>
  Hides when scrolling down
</Header>
```

### Elevate (dodaje cień przy scrollu)

```tsx
<Header scrollBehavior="elevate" scrollThreshold={10}>
  Gains shadow when scrolled
</Header>
```

### Scroll (scrolluje z treścią)

```tsx
<Header scrollBehavior="scroll">Scrolls with content</Header>
```

### Custom scroll target

```tsx
function CustomScrollHeader() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Header scrollBehavior="hide" scrollTarget={scrollRef.current} scrollThreshold={100}>
        Header watching custom element
      </Header>

      <div ref={scrollRef} style={{ height: '400px', overflow: 'auto' }}>
        <div style={{ height: '1000px' }}>Long scrollable content</div>
      </div>
    </div>
  );
}
```

## 🧩 Overflow menu i akcje

### Podstawowe akcje

```tsx
function HeaderWithActions() {
  return (
    <Header
      actions={
        <div className="header-actions">
          <IconButton icon="search" />
          <IconButton icon="notifications" />
          <IconButton icon="settings" />
        </div>
      }
    />
  );
}
```

### Overflow menu dla dodatkowych akcji

```tsx
function HeaderWithOverflow() {
  const moreActions = [
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
    { key: 'help', label: 'Help', icon: '❓' },
    { key: 'logout', label: 'Logout', icon: '🚪' },
  ];

  return (
    <Header
      actions={
        <div>
          <IconButton icon="search" />
          <IconButton icon="notifications" />
        </div>
      }
      moreActions={moreActions}
      moreActionsIcon="⋮"
      maxVisibleActions={2}
    />
  );
}
```

### Responsywne akcje

```tsx
function ResponsiveHeader() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const moreActions = [
    { key: 'search', label: 'Search', icon: '🔍' },
    { key: 'favorites', label: 'Favorites', icon: '⭐' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <Header
      navigationIcon={isMobile ? <IconButton icon="menu" /> : undefined}
      actions={!isMobile ? <DesktopActions /> : undefined}
      moreActions={isMobile ? moreActions : []}
      centerTitle={isMobile}
    >
      <h1>Responsive App</h1>
    </Header>
  );
}
```

## 🧩 Wzorce implementacji

### Dashboard header

```tsx
function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Header
      variant="compact"
      sticky
      elevation={1}
      scrollBehavior="elevate"
      navigationIcon={<IconButton icon="menu" />}
      onNavigationClick={() => setSidebarOpen(true)}
      logo={
        <div className="dashboard-logo">
          <img src="/dashboard-logo.svg" alt="Dashboard" />
          <span>Admin Panel</span>
        </div>
      }
      actions={
        <div className="dashboard-actions">
          <IconButton icon="search" />
          <IconButton icon="notifications" badge={3} />
          <UserMenu />
        </div>
      }
      showThemeToggle
      themeTogglePosition="right"
    />
  );
}
```

### E-commerce header

```tsx
function EcommerceHeader() {
  const { cartItems } = useCart();

  return (
    <Header
      variant="prominent"
      elevation={2}
      logo={
        <Link to="/" className="store-logo">
          <img src="/store-logo.svg" alt="Store" />
        </Link>
      }
      nav={
        <nav className="main-nav">
          <Link to="/categories">Categories</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/new">New Arrivals</Link>
        </nav>
      }
      actions={
        <div className="store-actions">
          <SearchBar />
          <IconButton icon="wishlist" />
          <IconButton icon="cart" badge={cartItems.length} onClick={() => openCart()} />
          <UserAccountMenu />
        </div>
      }
    />
  );
}
```

### Blog header

```tsx
function BlogHeader() {
  return (
    <Header
      variant="minimal"
      borderless
      centerTitle
      logo={
        <div className="blog-brand">
          <h1>My Tech Blog</h1>
          <p>Coding, Design & Technology</p>
        </div>
      }
      nav={
        <nav>
          <Link to="/articles">Articles</Link>
          <Link to="/tutorials">Tutorials</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      }
      actions={
        <div>
          <SearchToggle />
          <ThemeToggle />
          <SocialLinks />
        </div>
      }
    />
  );
}
```

### Landing page header

```tsx
function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Header
      variant="minimal"
      borderless
      elevation={0}
      scrollBehavior="hide"
      logo={<Brand />}
      nav={
        <nav className="landing-nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>
      }
      actions={
        <div className="landing-actions">
          <Button variant="text" href="/login">
            Sign In
          </Button>
          <Button variant="filled" href="/signup">
            Get Started
          </Button>
        </div>
      }
      navigationIcon={<IconButton icon="menu" />}
      onNavigationClick={() => setMobileMenuOpen(true)}
    />
  );
}
```

## 📋 API Reference

### Header Props

| Prop                  | Typ                                                  | Domyślnie   | Opis                               |
| --------------------- | ---------------------------------------------------- | ----------- | ---------------------------------- |
| `children`            | `ComponentChildren`                                  | -           | Dodatkowa treść headera            |
| `logo`                | `preact.VNode`                                       | -           | Element logo/branding              |
| `nav`                 | `preact.VNode`                                       | -           | Element nawigacji                  |
| `actions`             | `preact.VNode`                                       | -           | Akcje/przyciski w headerze         |
| `variant`             | `'default' \| 'compact' \| 'prominent' \| 'minimal'` | `'default'` | Wariant stylu headera              |
| `elevation`           | `0 \| 1 \| 2 \| 3 \| 4`                              | `1`         | Poziom cienia (Material Design)    |
| `sticky`              | `boolean`                                            | `false`     | Czy header ma być sticky           |
| `borderless`          | `boolean`                                            | `false`     | Czy ukryć dolne obramowanie        |
| `scrollBehavior`      | `'fixed' \| 'scroll' \| 'hide' \| 'elevate'`         | `'fixed'`   | Zachowanie przy scrollowaniu       |
| `centerTitle`         | `boolean`                                            | `false`     | Czy wyśrodkować zawartość          |
| `navigationIcon`      | `ComponentChildren`                                  | -           | Ikona nawigacji (hamburger)        |
| `onNavigationClick`   | `() => void`                                         | -           | Callback dla ikony nawigacji       |
| `moreActions`         | `MenuItem[]`                                         | `[]`        | Dodatkowe akcje w overflow menu    |
| `moreActionsIcon`     | `ComponentChildren`                                  | `'⋮'`       | Ikona przycisku "więcej akcji"     |
| `maxVisibleActions`   | `number`                                             | `3`         | Maksymalna liczba widocznych akcji |
| `scrollTarget`        | `HTMLElement \| string`                              | -           | Element do śledzenia scrollu       |
| `scrollThreshold`     | `number`                                             | `10`        | Próg scrollu dla zachowania        |
| `showThemeToggle`     | `boolean`                                            | `false`     | Czy pokazać przełącznik motywu     |
| `themeTogglePosition` | `'left' \| 'right' \| 'center'`                      | `'right'`   | Pozycja przełącznika motywu        |
| `autoColorManagement` | `boolean`                                            | `false`     | Automatyczne zarządzanie kolorami  |
| `themeToggleVariant`  | `'icon' \| 'button' \| 'switch'`                     | `'icon'`    | Wariant przełącznika motywu        |
| `themeToggleSize`     | `'sm' \| 'md' \| 'lg'`                               | `'md'`      | Rozmiar przełącznika motywu        |
| `className`           | `string`                                             | -           | Dodatkowe klasy CSS                |
| `style`               | `JSX.CSSProperties`                                  | -           | Inline style                       |
| `aria-label`          | `string`                                             | `'Header'`  | Etykieta accessibility             |

### Warianty

**`default`** - standardowy header z normalną wysokością
**`compact`** - kompaktowy header o mniejszej wysokości  
**`prominent`** - wysoki header z większą przestrzenią
**`minimal`** - czysty header bez dodatkowych stylów

### Scroll Behaviors

**`fixed`** - header pozostaje na miejscu (domyślny)
**`scroll`** - header scrolluje wraz z treścią
**`hide`** - header ukrywa się przy scrollu w dół
**`elevate`** - header zyskuje cień przy scrollu

## 🎨 Stylowanie

### CSS Custom Properties

```css
.custom-header {
  /* Wysokość i spacing */
  --header-height: 56px;
  --header-padding-x: 16px;
  --header-padding-y: 8px;

  /* Kolory */
  --header-background: var(--md-sys-color-surface);
  --header-color: var(--md-sys-color-on-surface);
  --header-border: var(--md-sys-color-outline-variant);

  /* Cienie */
  --header-shadow: var(--md-sys-elevation-level1);
  --header-shadow-scrolled: var(--md-sys-elevation-level2);

  /* Przejścia */
  --header-transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Responsywne zachowanie

```scss
.header {
  @media (max-width: $breakpoint-sm) {
    --header-height: 48px;
    --header-padding-x: 12px;

    .logo {
      font-size: var(--font-size-md);
    }

    .nav {
      display: none; // Ukryj nav na mobile
    }
  }

  @media (min-width: $breakpoint-lg) {
    --header-height: 64px;
    --header-padding-x: 24px;
  }
}
```

### Custom warianty

```tsx
// Custom header poprzez className
<Header variant="minimal" className="custom-header">
  <h1>Custom Styled Header</h1>
</Header>
```

```scss
.custom-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;

  .logo {
    color: white;
  }

  .navigation-icon {
    color: white;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
```

## ♿ Accessibility

### Role i struktura

```tsx
<Header aria-label="Main navigation">
  <div role="banner">
    <img src="/logo.svg" alt="Company Logo" />
    <h1>Application Name</h1>
  </div>

  <nav role="navigation" aria-label="Main menu">
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/products">Products</a>
      </li>
    </ul>
  </nav>

  <div role="toolbar" aria-label="User actions">
    <button aria-label="Search">🔍</button>
    <button aria-label="Notifications">🔔</button>
  </div>
</Header>
```

### Keyboard navigation

```tsx
function AccessibleHeader() {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const actionRefs = useRef<HTMLElement[]>([]);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    const totalActions = actionRefs.current.length;

    switch (key) {
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : totalActions - 1));
        break;
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex((prev) => (prev < totalActions - 1 ? prev + 1 : 0));
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(totalActions - 1);
        break;
    }
  };

  useEffect(() => {
    actionRefs.current[focusedIndex]?.focus();
  }, [focusedIndex]);

  return (
    <Header
      actions={
        <div onKeyDown={handleKeyDown}>
          {actions.map((action, index) => (
            <button
              key={index}
              ref={(el) => (actionRefs.current[index] = el)}
              tabIndex={focusedIndex === index ? 0 : -1}
            >
              {action}
            </button>
          ))}
        </div>
      }
    />
  );
}
```

### Screen readers

```tsx
<Header aria-label="Main application header">
  <div>
    <img src="/logo.svg" alt="Company logo" />
    <h1 id="app-title">Dashboard</h1>
  </div>

  <nav aria-labelledby="main-nav-label">
    <h2 id="main-nav-label" className="sr-only">
      Main Navigation
    </h2>
    <ul>
      <li>
        <a href="/dashboard" aria-current="page">
          Dashboard
        </a>
      </li>
      <li>
        <a href="/reports">Reports</a>
      </li>
    </ul>
  </nav>

  <div aria-label="User actions and settings">
    <button aria-label="Search" aria-expanded="false" aria-haspopup="dialog">
      🔍
    </button>
    <button aria-label="Notifications (3 unread)" aria-expanded="false" aria-haspopup="menu">
      🔔<span className="sr-only">3 unread notifications</span>
    </button>
  </div>
</Header>
```

## 🧪 Testowanie

### Testy podstawowe

```tsx
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Header } from 'preact-aurora-ui';

test('renderuje header z podstawową zawartością', () => {
  render(
    <Header
      logo={<div data-testid="logo">Logo</div>}
      nav={<nav data-testid="nav">Navigation</nav>}
      actions={<div data-testid="actions">Actions</div>}
    >
      <h1>Title</h1>
    </Header>,
  );

  expect(screen.getByTestId('logo')).toBeInTheDocument();
  expect(screen.getByTestId('nav')).toBeInTheDocument();
  expect(screen.getByTestId('actions')).toBeInTheDocument();
  expect(screen.getByText('Title')).toBeInTheDocument();
});

test('aplikuje prawidłowe klasy CSS', () => {
  render(<Header variant="compact" elevation={2} sticky centerTitle />);

  const header = screen.getByRole('banner');
  expect(header).toHaveClass('header--variant-compact');
  expect(header).toHaveClass('header--elevation-2');
  expect(header).toHaveClass('header--sticky');
  expect(header).toHaveClass('header--center-title');
});
```

### Testy nawigacji

```tsx
test('obsługuje kliknięcie ikony nawigacji', async () => {
  const user = userEvent.setup();
  const handleNavClick = vi.fn();

  render(<Header navigationIcon="☰" onNavigationClick={handleNavClick} />);

  const navButton = screen.getByLabelText('Open navigation menu');
  await user.click(navButton);

  expect(handleNavClick).toHaveBeenCalledOnce();
});
```

### Testy scroll behavior

```tsx
test('reaguje na scrollowanie', async () => {
  render(<Header scrollBehavior="elevate" />);

  const header = screen.getByRole('banner');

  // Symuluj scroll
  Object.defineProperty(window, 'scrollY', { value: 100 });
  window.dispatchEvent(new Event('scroll'));

  // Czekaj na aktualizację stanu
  await waitFor(() => {
    expect(header).toHaveClass('header--scrolled');
  });
});
```

### Testy overflow menu

```tsx
test('pokazuje i ukrywa overflow menu', async () => {
  const user = userEvent.setup();
  const moreActions = [
    { key: 'action1', label: 'Action 1' },
    { key: 'action2', label: 'Action 2' },
  ];

  render(<Header moreActions={moreActions} />);

  const moreButton = screen.getByLabelText('More actions');

  // Menu początkowo ukryte
  expect(screen.queryByText('Action 1')).not.toBeInTheDocument();

  // Pokaż menu
  await user.click(moreButton);
  expect(screen.getByText('Action 1')).toBeInTheDocument();

  // Ukryj menu
  await user.click(moreButton);
  expect(screen.queryByText('Action 1')).not.toBeInTheDocument();
});
```

### Testy accessibility

```tsx
test('ma poprawną strukturę accessibility', () => {
  render(
    <Header aria-label="Main navigation">
      <h1>App Title</h1>
    </Header>,
  );

  const header = screen.getByRole('banner');
  expect(header).toHaveAttribute('aria-label', 'Main navigation');
});

test('wspiera nawigację klawiaturą', async () => {
  const user = userEvent.setup();

  render(
    <Header
      actions={
        <div>
          <button>Action 1</button>
          <button>Action 2</button>
          <button>Action 3</button>
        </div>
      }
    />,
  );

  const firstAction = screen.getByText('Action 1');
  const secondAction = screen.getByText('Action 2');

  firstAction.focus();
  await user.keyboard('{Tab}');
  expect(secondAction).toHaveFocus();
});
```

## 📚 Przykłady zaawansowane

### Header z animacjami

```tsx
import { useSpring, animated } from '@react-spring/web';

function AnimatedHeader() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = useSpring({
    backgroundColor: scrollY > 50 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,1)',
    backdropFilter: scrollY > 50 ? 'blur(10px)' : 'blur(0px)',
    transform: `translateY(${Math.min(scrollY * 0.5, 20)}px)`,
  });

  return (
    <animated.div style={headerStyle}>
      <Header variant="minimal" borderless>
        <h1>Animated Header</h1>
      </Header>
    </animated.div>
  );
}
```

### Header z wyszukiwaniem

```tsx
function SearchableHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Header
      logo={<Logo />}
      nav={!searchOpen ? <MainNavigation /> : null}
      actions={
        searchOpen ? (
          <div className="search-container">
            <TextField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search..."
              autoFocus
            />
            <IconButton icon="close" onClick={() => setSearchOpen(false)} />
          </div>
        ) : (
          <div>
            <IconButton icon="search" onClick={() => setSearchOpen(true)} />
            <UserMenu />
          </div>
        )
      }
    />
  );
}
```

### Header z progressem

```tsx
function ProgressHeader() {
  const { uploadProgress, isUploading } = useUpload();

  return (
    <div className="header-with-progress">
      <Header>
        <h1>File Upload</h1>
      </Header>

      {isUploading && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
        </div>
      )}
    </div>
  );
}
```

## ❓ FAQ

**P: Jak zintegrować header z routerem?**  
O: Użyj komponentów Link w nav i sprawdzaj aktywną trasę dla podświetlenia:

```tsx
<Header
  nav={
    <nav>
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        Home
      </Link>
    </nav>
  }
/>
```

**P: Dlaczego header nie jest sticky?**  
O: Sprawdź czy `sticky={true}` jest ustawione i czy rodzic nie ma `overflow: hidden`.

**P: Jak dostosować wysokość headera?**  
O: Użyj CSS custom properties lub wariantów:

```css
.custom-header {
  --header-height: 72px;
}
```

**P: Czy mogę mieć różne headery na różnych stronach?**  
O: Tak, używaj conditional rendering lub różnych instancji Header na każdej stronie.

**P: Jak obsłużyć bardzo długi tytuł?**  
O: Użyj CSS `text-overflow: ellipsis` lub skróć programowo:

```css
.header h1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

**P: Dlaczego scroll behavior nie działa?**  
O: Sprawdź czy `scrollBehavior` jest prawidłowo ustawiony i czy element docelowy jest scrollowalny.

---

**Powiązane komponenty:**

- [Layout](../Layout/README.md) - Struktura aplikacji
- [Sidebar](../Sidebar/README.md) - Panel boczny nawigacji
- [Menu](../Menu/README.md) - Menu dropdown i nawigacja
- [IconButton](../IconButton/README.md) - Przyciski akcji w headerze  
  A: Add an `img` element within the `children` of the `Header` component.

**Q: How do I add navigation controls to the header?**  
A: Add navigation components (e.g., `Button`, `Menu`) within the `children` of the `Header` component.

## Contribution

Contributions are welcome! Please follow the contribution guidelines in the repository.

## License

MIT
