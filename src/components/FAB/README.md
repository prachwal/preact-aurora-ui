# FAB (Floating Action Button) Component

A Material Design 3 Floating Action Button component for primary actions, with support for standard FABs and expandable Speed Dial menus.

## Overview

The FAB component provides:

- **Multiple Sizes**: Mini, regular, and extended variants
- **Color Variants**: Surface, primary, secondary, tertiary
- **Positioning**: Fixed positioning options and static mode
- **Speed Dial**: Expandable action menus with animations
- **Accessibility**: Full keyboard navigation and screen reader support
- **Material Design 3**: Complete MD3 styling with elevation and ripple effects

## Basic Usage

```tsx
import { FAB } from '@aurora-ui/preact-aurora-ui';

function CreateAction() {
  return (
    <FAB
      icon="+"
      position="bottom-right"
      onClick={() => console.log('Create new item')}
      ariaLabel="Create new item"
    />
  );
}
```

## API Reference

### FAB Props

| Prop        | Type                                                                       | Default     | Description                    |
| ----------- | -------------------------------------------------------------------------- | ----------- | ------------------------------ |
| `size`      | `'mini' \| 'regular' \| 'extended'`                                        | `'regular'` | Size variant of the FAB        |
| `color`     | `'surface' \| 'primary' \| 'secondary' \| 'tertiary'`                      | `'surface'` | Color variant                  |
| `position`  | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' \| 'static'` | `'static'`  | Positioning mode               |
| `icon`      | `ComponentChildren`                                                        |             | Icon to display                |
| `label`     | `string`                                                                   |             | Text label (extended FAB only) |
| `disabled`  | `boolean`                                                                  | `false`     | Whether FAB is disabled        |
| `onClick`   | `(event: MouseEvent) => void`                                              |             | Click handler                  |
| `onFocus`   | `(event: FocusEvent) => void`                                              |             | Focus handler                  |
| `onBlur`    | `(event: FocusEvent) => void`                                              |             | Blur handler                   |
| `onKeyDown` | `(event: KeyboardEvent) => void`                                           |             | Keyboard handler               |
| `ariaLabel` | `string`                                                                   |             | Accessibility label            |
| `className` | `string`                                                                   |             | Additional CSS classes         |
| `style`     | `JSX.CSSProperties`                                                        |             | Inline styles                  |
| `testId`    | `string`                                                                   |             | Test identifier                |
| `children`  | `ComponentChildren`                                                        |             | Custom content                 |

### SpeedDial Props

| Prop                 | Type                                  | Default      | Description            |
| -------------------- | ------------------------------------- | ------------ | ---------------------- |
| `fabProps`           | `Omit<FABProps, 'onClick'>`           | `{}`         | Props for main FAB     |
| `actions`            | `SpeedDialAction[]`                   | **required** | Action items           |
| `open`               | `boolean`                             |              | Controlled open state  |
| `defaultOpen`        | `boolean`                             | `false`      | Default open state     |
| `direction`          | `'up' \| 'down' \| 'left' \| 'right'` | `'up'`       | Expansion direction    |
| `onToggle`           | `(open: boolean) => void`             |              | Open/close handler     |
| `closeOnActionClick` | `boolean`                             | `true`       | Close on action click  |
| `className`          | `string`                              |              | Additional CSS classes |
| `testId`             | `string`                              |              | Test identifier        |

### SpeedDialAction Type

```tsx
interface SpeedDialAction {
  id: string; // Unique identifier
  icon: ComponentChildren; // Action icon
  label: string; // Action label/tooltip
  disabled?: boolean; // Whether action is disabled
  onClick?: (event: MouseEvent) => void; // Click handler
  ariaLabel?: string; // Accessibility label
}
```

## Examples

### Basic FAB

```tsx
function BasicFABs() {
  return (
    <div className="fab-examples">
      {/* Regular FAB */}
      <FAB icon="+" onClick={() => alert('Add item')} ariaLabel="Add new item" />

      {/* Primary color FAB */}
      <FAB
        icon="✉"
        color="primary"
        onClick={() => alert('Compose email')}
        ariaLabel="Compose email"
      />

      {/* Mini FAB */}
      <FAB
        size="mini"
        icon="🔍"
        color="secondary"
        onClick={() => alert('Search')}
        ariaLabel="Search"
      />
    </div>
  );
}
```

### Extended FAB

```tsx
function ExtendedFABs() {
  return (
    <div className="extended-fab-examples">
      {/* Extended FAB with icon and label */}
      <FAB
        size="extended"
        icon="+"
        label="Create"
        color="primary"
        onClick={() => console.log('Create new')}
      />

      {/* Extended FAB with just text */}
      <FAB
        size="extended"
        label="Get Started"
        color="tertiary"
        onClick={() => console.log('Get started')}
      />

      {/* Extended FAB with emoji icon */}
      <FAB size="extended" icon="🚀" label="Launch" onClick={() => console.log('Launch app')} />
    </div>
  );
}
```

### Positioned FABs

```tsx
function PositionedFABs() {
  return (
    <div className="app-container">
      <main>
        {/* Your app content */}
        <p>App content goes here...</p>
      </main>

      {/* Fixed positioned FABs */}
      <FAB
        position="bottom-right"
        icon="+"
        color="primary"
        onClick={() => console.log('Primary action')}
        ariaLabel="Add new item"
      />

      <FAB
        position="bottom-left"
        icon="💬"
        color="secondary"
        onClick={() => console.log('Open chat')}
        ariaLabel="Open chat"
      />
    </div>
  );
}
```

### Speed Dial

```tsx
import { SpeedDial } from '@aurora-ui/preact-aurora-ui';

function SpeedDialExample() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      id: 'email',
      icon: '✉',
      label: 'Email',
      onClick: () => console.log('Open email'),
    },
    {
      id: 'phone',
      icon: '📞',
      label: 'Call',
      onClick: () => console.log('Make call'),
    },
    {
      id: 'message',
      icon: '💬',
      label: 'Message',
      onClick: () => console.log('Send message'),
    },
  ];

  return (
    <SpeedDial
      fabProps={{
        position: 'bottom-right',
        color: 'primary',
        ariaLabel: 'Contact options',
      }}
      actions={actions}
      open={open}
      onToggle={setOpen}
      direction="up"
    />
  );
}
```

### Controlled Speed Dial

```tsx
function ControlledSpeedDial() {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const handleActionClick = (actionId: string) => {
    console.log(`Action clicked: ${actionId}`);
    // Close speed dial after action
    setSpeedDialOpen(false);
  };

  const actions = [
    {
      id: 'create-document',
      icon: '📄',
      label: 'Create Document',
      onClick: () => handleActionClick('create-document'),
    },
    {
      id: 'create-folder',
      icon: '📁',
      label: 'Create Folder',
      onClick: () => handleActionClick('create-folder'),
    },
    {
      id: 'upload-file',
      icon: '⬆',
      label: 'Upload File',
      onClick: () => handleActionClick('upload-file'),
    },
  ];

  return (
    <div>
      <h3>Speed Dial {speedDialOpen ? 'Open' : 'Closed'}</h3>

      <SpeedDial
        fabProps={{
          icon: speedDialOpen ? '✕' : '+',
          color: 'primary',
        }}
        actions={actions}
        open={speedDialOpen}
        onToggle={setSpeedDialOpen}
        direction="up"
        closeOnActionClick={false} // Manual control
      />
    </div>
  );
}
```

### Disabled States

```tsx
function DisabledFABs() {
  return (
    <div className="disabled-examples">
      {/* Disabled regular FAB */}
      <FAB icon="+" disabled ariaLabel="Add (disabled)" />

      {/* Disabled extended FAB */}
      <FAB size="extended" icon="🚀" label="Launch" disabled color="primary" />

      {/* Speed Dial with disabled actions */}
      <SpeedDial
        actions={[
          {
            id: 'action1',
            icon: '✉',
            label: 'Send Email',
            onClick: () => {},
          },
          {
            id: 'action2',
            icon: '📞',
            label: 'Call (unavailable)',
            disabled: true,
            onClick: () => {},
          },
        ]}
      />
    </div>
  );
}
```

### Custom Icons and Content

```tsx
function CustomFABs() {
  const CustomIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  );

  return (
    <div className="custom-examples">
      {/* FAB with SVG icon */}
      <FAB
        icon={<CustomIcon />}
        color="primary"
        onClick={() => console.log('Custom icon clicked')}
        ariaLabel="Add with custom icon"
      />

      {/* FAB with image */}
      <FAB
        icon={<img src="/avatar.jpg" alt="" width="24" height="24" />}
        color="surface"
        onClick={() => console.log('Profile clicked')}
        ariaLabel="Open profile"
      />

      {/* FAB with custom content */}
      <FAB onClick={() => console.log('Custom content')}>
        <div className="custom-fab-content">
          <span>42</span>
        </div>
      </FAB>
    </div>
  );
}
```

## Accessibility Features

### Keyboard Navigation

- **Tab**: Focus the FAB
- **Enter/Space**: Activate the FAB
- **Escape**: Close Speed Dial when open

### Screen Reader Support

```tsx
// Comprehensive accessibility
<FAB
  icon="+"
  ariaLabel="Create new document"
  onClick={handleCreate}
/>

<SpeedDial
  fabProps={{
    ariaLabel: 'Document actions',
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
  }}
  actions={actions.map(action => ({
    ...action,
    ariaLabel: action.ariaLabel || action.label,
  }))}
/>
```

### Focus Management

```tsx
function FocusManagementExample() {
  const fabRef = useRef<FABRef>(null);

  const handleFocusFAB = () => {
    fabRef.current?.focus();
  };

  return (
    <div>
      <button onClick={handleFocusFAB}>Focus FAB</button>

      <FAB
        ref={fabRef}
        icon="+"
        onFocus={() => console.log('FAB focused')}
        onBlur={() => console.log('FAB blurred')}
      />
    </div>
  );
}
```

## State Management Patterns

### Application Actions

```tsx
function AppWithFAB() {
  const [items, setItems] = useState([]);
  const [showSpeedDial, setShowSpeedDial] = useState(false);

  const handleCreateItem = (type: string) => {
    const newItem = {
      id: Date.now(),
      type,
      name: `New ${type}`,
      createdAt: new Date(),
    };
    setItems((prev) => [...prev, newItem]);
    setShowSpeedDial(false);
  };

  const createActions = [
    {
      id: 'document',
      icon: '📄',
      label: 'Document',
      onClick: () => handleCreateItem('document'),
    },
    {
      id: 'image',
      icon: '🖼',
      label: 'Image',
      onClick: () => handleCreateItem('image'),
    },
    {
      id: 'video',
      icon: '🎥',
      label: 'Video',
      onClick: () => handleCreateItem('video'),
    },
  ];

  return (
    <div className="app">
      <main>
        <h1>My Items ({items.length})</h1>
        {/* Render items */}
      </main>

      <SpeedDial
        fabProps={{
          position: 'bottom-right',
          color: 'primary',
          ariaLabel: 'Create new item',
        }}
        actions={createActions}
        open={showSpeedDial}
        onToggle={setShowSpeedDial}
      />
    </div>
  );
}
```

### Conditional FAB Display

```tsx
function ConditionalFAB() {
  const [user, setUser] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showFAB = user && scrollY < 100; // Show only when near top

  return (
    <div>
      {/* Content */}

      {showFAB && (
        <FAB
          position="bottom-right"
          icon="+"
          color="primary"
          onClick={() => console.log('Create')}
          style={{
            opacity: scrollY > 50 ? 0.7 : 1,
            transition: 'opacity 200ms ease',
          }}
        />
      )}
    </div>
  );
}
```

## Theming and Customization

### CSS Custom Properties

```scss
.custom-fab {
  // Override FAB colors
  --md-sys-color-primary-container: #6750a4;
  --md-sys-color-on-primary-container: #ffffff;
  --md-sys-color-surface-container-high: #f7f2fa;

  // Override elevations
  --md-sys-elevation-level3: 0 4px 12px rgba(0, 0, 0, 0.15);
  --md-sys-elevation-level4: 0 6px 16px rgba(0, 0, 0, 0.2);
}
```

### Custom Styling

```scss
// Custom FAB variants
.fab-gradient {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;

  &:hover {
    background: linear-gradient(45deg, #5a67d8, #6b46c1);
  }
}

// Custom Speed Dial animations
.speedDial .speedDialAction {
  &.speedDialAction--visible {
    animation: slideInUp 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### Dark Theme Support

```scss
[data-theme='dark'] {
  --md-sys-color-surface-container-high: #2d2d2d;
  --md-sys-color-primary: #bb86fc;
  --md-sys-color-on-primary-container: #000000;
  --md-sys-color-primary-container: #3700b3;
}
```

## Advanced Patterns

### FAB with Badges

```tsx
function FABWithBadge() {
  const [unreadCount, setUnreadCount] = useState(3);

  return (
    <div className="fab-with-badge">
      <FAB
        icon="💬"
        color="primary"
        position="bottom-right"
        onClick={() => setUnreadCount(0)}
        ariaLabel={`Messages ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
      />

      {unreadCount > 0 && <div className="fab-badge">{unreadCount > 99 ? '99+' : unreadCount}</div>}
    </div>
  );
}
```

### Animated Transformations

```tsx
function AnimatedFAB() {
  const [mode, setMode] = useState('add'); // 'add' | 'close'

  const toggleMode = () => {
    setMode((prev) => (prev === 'add' ? 'close' : 'add'));
  };

  return (
    <FAB
      icon={
        <div className={`icon-transition ${mode}`}>
          <span className="add-icon">+</span>
          <span className="close-icon">✕</span>
        </div>
      }
      onClick={toggleMode}
      className="animated-fab"
    />
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { FAB, SpeedDial } from '@aurora-ui/preact-aurora-ui';

test('FAB handles click events', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<FAB icon="+" onClick={handleClick} />);

  const fab = screen.getByRole('button');
  await user.click(fab);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('FAB supports keyboard navigation', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<FAB icon="+" onClick={handleClick} />);

  const fab = screen.getByRole('button');
  fab.focus();
  await user.keyboard('{Enter}');

  expect(handleClick).toHaveBeenCalled();
});

test('SpeedDial opens and closes', async () => {
  const user = userEvent.setup();

  render(<SpeedDial actions={[{ id: '1', icon: '✉', label: 'Email', onClick: () => {} }]} />);

  const mainFab = screen.getByRole('button');
  await user.click(mainFab);

  expect(screen.getByRole('menu')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
});
```

### Integration Tests

```tsx
test('complete FAB workflow', async () => {
  const user = userEvent.setup();
  const actions = [];

  render(<CreateWorkflow onAction={(action) => actions.push(action)} />);

  // Open speed dial
  const speedDialFab = screen.getByLabelText('Create options');
  await user.click(speedDialFab);

  // Select action
  const documentAction = screen.getByLabelText('Create document');
  await user.click(documentAction);

  // Verify action was taken
  expect(actions).toContain('create-document');
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});
```

## Performance Considerations

### Lazy Loading Actions

```tsx
function LazySpeedDial() {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadActions = async () => {
    if (actions.length === 0 && !loading) {
      setLoading(true);
      const dynamicActions = await fetchAvailableActions();
      setActions(dynamicActions);
      setLoading(false);
    }
  };

  return <SpeedDial actions={actions} onToggle={(open) => open && loadActions()} />;
}
```

### Memoization

```tsx
const MemoizedFAB = memo(FAB);
const MemoizedSpeedDial = memo(SpeedDial);

function OptimizedFABContainer() {
  const memoizedActions = useMemo(
    () => [
      { id: '1', icon: '✉', label: 'Email', onClick: handleEmail },
      { id: '2', icon: '📞', label: 'Call', onClick: handleCall },
    ],
    [handleEmail, handleCall],
  );

  return <MemoizedSpeedDial actions={memoizedActions} fabProps={{ color: 'primary' }} />;
}
```

## Browser Support

- **Modern Browsers**: Full feature support
- **CSS Transforms**: Used for animations and positioning
- **CSS Custom Properties**: Theming system
- **Touch Events**: Mobile interaction support
- **ARIA**: Screen reader compatibility

## Related Components

- [Button](../Button/README.md) - For general button functionality
- [IconButton](../IconButton/README.md) - For icon-only buttons
- [Menu](../Menu/README.md) - For dropdown menus
- [Tooltip](../Tooltip/README.md) - For action tooltips

## Troubleshooting

### Common Issues

**Q: FAB not appearing in correct position?**  
A: Check parent container positioning and z-index values. Fixed positioning requires proper parent context.

**Q: Speed Dial actions not animating?**  
A: Verify CSS animations are enabled and not blocked by `prefers-reduced-motion`.

**Q: Click events not firing?**  
A: Ensure FAB is not disabled and check for overlapping elements with higher z-index.

**Q: Icons not displaying correctly?**  
A: Verify icon components are properly imported and rendered.

**Q: Accessibility warnings?**  
A: Ensure `ariaLabel` is provided and Speed Dial has proper ARIA attributes.

### Performance Tips

1. **Use memoization** for complex action arrays
2. **Lazy load actions** for large Speed Dials
3. **Optimize animations** with CSS transforms
4. **Minimize re-renders** with stable callback references
5. **Use proper z-index management** for positioning

## Resources

- [Material Design FAB Guidelines](https://m3.material.io/components/floating-action-button)
- [WCAG Button Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [CSS Transforms Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)
