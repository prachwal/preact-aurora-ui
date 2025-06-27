# Plan ulepszeń: **Header → MD3 App Bar Enhancements**

---

## 1. Analiza obecnego stanu i wymagań MD3

### Obecny stan Header

**Obecne propsy (już bardzo dobre):**

- `logo`, `nav`, `actions` - podstawowe sekcje
- `variant`: default, compact, prominent, minimal
- `elevation`: 0-4 (zgodne z MD3)
- `sticky`: boolean
- `borderless`: boolean
- `className`, `style`, `aria-label`

### MD3 App Bar dodatkowe wymagania

**Advanced behaviors:** scroll-based hiding/elevation  
**Navigation:** hamburger menu integration  
**Actions:** overflow menu dla wielu akcji  
**Layout:** center title option

---

## 2. Checklist: Rozbudowa Header Component

### 2.1 Rozszerzenie interfejsu

- [ ] Aktualizacja `HeaderProps`:

```typescript
interface HeaderProps {
  // Istniejące propsy (zachowane)
  children?: ComponentChildren;
  className?: string;
  style?: JSX.CSSProperties;
  logo?: preact.VNode;
  nav?: preact.VNode;
  actions?: preact.VNode;
  'aria-label'?: string;
  variant?: 'default' | 'compact' | 'prominent' | 'minimal';
  elevation?: 0 | 1 | 2 | 3 | 4;
  sticky?: boolean;
  borderless?: boolean;

  // NOWE - MD3 App Bar enhancements
  scrollBehavior?: 'fixed' | 'scroll' | 'hide' | 'elevate';
  centerTitle?: boolean;

  // Navigation integration
  navigationIcon?: ComponentChildren;
  onNavigationClick?: () => void;

  // Action overflow
  moreActions?: MenuItem[];
  moreActionsIcon?: ComponentChildren;
  maxVisibleActions?: number;

  // Advanced scrolling
  scrollTarget?: HTMLElement | string; // Element to watch for scroll
  scrollThreshold?: number; // px threshold for behaviors
}
```

### 2.2 SCSS enhancements

- [ ] Scroll behaviors:

```scss
// Scroll-based elevation
.header--scroll-elevate {
  transition: box-shadow 0.3s ease;

  &.scrolled {
    box-shadow: var(--md-sys-elevation-level2);
  }
}

// Hide on scroll
.header--scroll-hide {
  transition: transform 0.3s ease;

  &.hidden {
    transform: translateY(-100%);
  }
}

// Scroll with content
.header--scroll-scroll {
  position: absolute;
  // Will scroll with content naturally
}
```

- [ ] Center title layout:

```scss
.header--center-title {
  .header-content {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--space-md);

    .logo {
      grid-column: 1;
    }

    .nav {
      grid-column: 2;
      justify-self: center;
      text-align: center;
    }

    .actions {
      grid-column: 3;
      justify-self: end;
    }
  }
}
```

- [ ] Navigation icon styling:

```scss
.navigation-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--md-sys-color-on-surface);
  transition: background 0.2s ease;

  &:hover {
    background: color-mix(in srgb, var(--md-sys-color-on-surface) 8%, transparent);
  }

  &:active {
    background: color-mix(in srgb, var(--md-sys-color-on-surface) 12%, transparent);
  }
}
```

- [ ] Actions overflow menu:

```scss
.actions-container {
  display: flex;
  align-items: center;
  gap: var(--space-xs);

  .visible-actions {
    display: flex;
    gap: var(--space-xs);

    @media (max-width: 768px) {
      .action-item {
        display: none;

        &.always-visible {
          display: flex;
        }
      }
    }
  }

  .more-actions-button {
    @extend .navigation-icon;

    position: relative;
  }
}

.overflow-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--space-xs);
  z-index: 1000;
}
```

### 2.3 Component Logic Enhancements

- [ ] Scroll behavior hook:

```typescript
const useScrollBehavior = (
  scrollBehavior?: string,
  scrollTarget?: HTMLElement | string,
  scrollThreshold = 10,
) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!scrollBehavior || scrollBehavior === 'fixed') return;

    const target = scrollTarget
      ? typeof scrollTarget === 'string'
        ? document.querySelector(scrollTarget)
        : scrollTarget
      : window;

    const handleScroll = () => {
      const currentScrollY = target === window ? window.scrollY : (target as HTMLElement).scrollTop;

      if (scrollBehavior === 'elevate') {
        setScrolled(currentScrollY > scrollThreshold);
      } else if (scrollBehavior === 'hide') {
        if (currentScrollY > lastScrollY.current && currentScrollY > scrollThreshold) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [scrollBehavior, scrollTarget, scrollThreshold]);

  return { scrolled, hidden };
};
```

- [ ] Actions overflow logic:

```typescript
const useActionsOverflow = (
  actions?: preact.VNode,
  moreActions?: MenuItem[],
  maxVisibleActions = 3,
) => {
  const [showOverflow, setShowOverflow] = useState(false);

  // Extract action items from actions VNode (if needed)
  const visibleActions = useMemo(() => {
    // Logic to determine which actions are visible
    return actions; // Simplified for now
  }, [actions, maxVisibleActions]);

  const overflowActions = useMemo(() => {
    return moreActions || [];
  }, [moreActions]);

  return {
    visibleActions,
    overflowActions,
    showOverflow,
    setShowOverflow,
  };
};
```

- [ ] Enhanced component:

```typescript
export function Header({
  // Existing props...
  scrollBehavior = 'fixed',
  centerTitle = false,
  navigationIcon,
  onNavigationClick,
  moreActions,
  moreActionsIcon = '⋮',
  maxVisibleActions = 3,
  scrollTarget,
  scrollThreshold = 10,
}: HeaderProps) {
  const { scrolled, hidden } = useScrollBehavior(
    scrollBehavior,
    scrollTarget,
    scrollThreshold
  );

  const {
    visibleActions,
    overflowActions,
    showOverflow,
    setShowOverflow
  } = useActionsOverflow(actions, moreActions, maxVisibleActions);

  const classes = [
    styles.header,
    styles[`header--variant-${variant}`],
    styles[`header--elevation-${elevation}`],
    sticky ? styles['header--sticky'] : '',
    borderless ? styles['header--borderless'] : '',
    centerTitle ? styles['header--center-title'] : '',
    scrollBehavior ? styles[`header--scroll-${scrollBehavior}`] : '',
    scrolled ? styles.scrolled : '',
    hidden ? styles.hidden : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <header className={classes} style={style} aria-label={ariaLabel}>
      <div className={styles['header-content']}>
        {/* Navigation Icon */}
        {navigationIcon && (
          <button
            className={styles['navigation-icon']}
            onClick={onNavigationClick}
            aria-label="Navigation menu"
          >
            {navigationIcon}
          </button>
        )}

        {/* Logo */}
        {logo && <div className={styles.logo}>{logo}</div>}

        {/* Navigation */}
        {nav && <nav className={styles.nav}>{nav}</nav>}

        {/* Actions */}
        <div className={styles['actions-container']}>
          <div className={styles['visible-actions']}>
            {visibleActions}
          </div>

          {overflowActions.length > 0 && (
            <div className={styles['more-actions']}>
              <button
                className={styles['more-actions-button']}
                onClick={() => setShowOverflow(!showOverflow)}
                aria-label="More actions"
              >
                {moreActionsIcon}
              </button>

              {showOverflow && (
                <div className={styles['overflow-menu']}>
                  <Menu
                    items={overflowActions}
                    variant="dropdown"
                    elevation={2}
                    onSelect={() => setShowOverflow(false)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {children}
      </div>
    </header>
  );
}
```

### 2.4 Enhanced Tests

- [ ] Test scroll behaviors (elevate, hide, scroll)
- [ ] Test center title layout
- [ ] Test navigation icon interaction
- [ ] Test actions overflow menu
- [ ] Test scroll threshold customization
- [ ] Test scroll target customization
- [ ] Test responsive behavior
- [ ] Test keyboard navigation
- [ ] Test accessibility attributes
- [ ] Test backwards compatibility

### 2.5 Enhanced Storybook

- [ ] Scroll behavior stories:
  - Fixed Header (default)
  - Elevate on Scroll
  - Hide on Scroll Down
  - Scroll with Content

- [ ] Layout stories:
  - Default Layout
  - Center Title Layout
  - With Navigation Icon
  - With Actions Overflow

- [ ] Interactive stories:
  - Responsive Behavior
  - Scroll Testing
  - Actions Overflow Demo

### 2.6 Backwards Compatibility

- [ ] Wszystkie istniejące propsy działają bez zmian
- [ ] Default behaviors zachowane
- [ ] Nowe features są opt-in

---

## 3. Przykłady użycia po rozbudowie

```tsx
// Basic header (unchanged)
<Header
  logo={<Logo />}
  nav={<Navigation />}
  actions={<UserActions />}
/>

// Elevating header with navigation
<Header
  logo={<Logo />}
  nav={<Navigation />}
  actions={<UserActions />}
  scrollBehavior="elevate"
  navigationIcon="☰"
  onNavigationClick={() => toggleSidebar()}
/>

// Center title layout
<Header
  logo={<BackButton />}
  nav={<h1>Page Title</h1>}
  actions={<ShareButton />}
  centerTitle
  variant="compact"
/>

// Header with actions overflow
<Header
  logo={<Logo />}
  nav={<Navigation />}
  actions={<PrimaryActions />}
  moreActions={[
    { key: 'settings', label: 'Settings', icon: '⚙️' },
    { key: 'help', label: 'Help', icon: '❓' },
    { key: 'about', label: 'About', icon: 'ℹ️' }
  ]}
  maxVisibleActions={2}
/>

// Hide on scroll
<Header
  logo={<Logo />}
  nav={<Navigation />}
  actions={<UserActions />}
  scrollBehavior="hide"
  scrollThreshold={50}
/>
```

---

## 4. Kryteria akceptacji

- ✅ Scroll behaviors (fixed, elevate, hide, scroll)
- ✅ Center title layout option
- ✅ Navigation icon integration
- ✅ Actions overflow menu
- ✅ Custom scroll target support
- ✅ Configurable scroll threshold
- ✅ Smooth animations
- ✅ Responsive behavior
- ✅ Backwards compatibility
- ✅ Proper accessibility
- ✅ Comprehensive tests
- ✅ Complete Storybook documentation

---

**Priorytet:** 🔄 NISKI - istniejący Header już bardzo dobry  
**Czas implementacji:** 2 dni robocze  
**Zależności:** Menu component (dla overflow), podstawowy Header (już gotowy)
