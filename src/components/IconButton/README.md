# IconButton Component

A Material Design 3 icon button component for displaying clickable icons with various styles, sizes, and interactive states.

## Overview

The IconButton component provides:

- **Material Design 3 Variants**: Standard, filled, outlined, tonal
- **Multiple Sizes**: Small, medium, large
- **Toggle Functionality**: Stateful buttons with selected/unselected states
- **Built-in Icons**: Common icons included for convenience
- **Accessibility**: Full keyboard navigation and screen reader support
- **Interactive States**: Hover, focus, active, and disabled states

## Basic Usage

```tsx
import { IconButton, HeartIcon } from '@aurora-ui/preact-aurora-ui';

function LikeButton() {
  return (
    <IconButton
      icon={<HeartIcon />}
      onClick={() => console.log('Liked!')}
      aria-label="Like this item"
    />
  );
}
```

## API Reference

### IconButton Props

| Prop               | Type                                              | Default      | Description                        |
| ------------------ | ------------------------------------------------- | ------------ | ---------------------------------- |
| `icon`             | `ComponentChildren`                               |              | Icon to display                    |
| `variant`          | `'standard' \| 'filled' \| 'outlined' \| 'tonal'` | `'standard'` | Visual variant                     |
| `size`             | `'small' \| 'medium' \| 'large'`                  | `'medium'`   | Button size                        |
| `disabled`         | `boolean`                                         | `false`      | Whether button is disabled         |
| `toggle`           | `boolean`                                         | `false`      | Enable toggle functionality        |
| `selected`         | `boolean`                                         | `false`      | Toggle state (when toggle=true)    |
| `onToggle`         | `(selected: boolean) => void`                     |              | Toggle state change handler        |
| `selectedIcon`     | `ComponentChildren`                               |              | Icon when selected (toggle mode)   |
| `unselectedIcon`   | `ComponentChildren`                               |              | Icon when unselected (toggle mode) |
| `onClick`          | `(event: MouseEvent) => void`                     |              | Click handler                      |
| `aria-label`       | `string`                                          |              | Accessibility label                |
| `aria-describedby` | `string`                                          |              | ARIA description reference         |
| `title`            | `string`                                          |              | Tooltip text                       |
| `className`        | `string`                                          |              | Additional CSS classes             |
| `type`             | `'button' \| 'submit' \| 'reset'`                 | `'button'`   | Button type                        |
| `children`         | `ComponentChildren`                               |              | Alternative to icon prop           |

## Examples

### Basic Icon Buttons

```tsx
import { IconButton, EditIcon, DeleteIcon, ShareIcon } from '@aurora-ui/preact-aurora-ui';

function ActionButtons() {
  return (
    <div className="action-buttons">
      <IconButton icon={<EditIcon />} onClick={() => console.log('Edit')} aria-label="Edit item" />

      <IconButton
        icon={<DeleteIcon />}
        onClick={() => console.log('Delete')}
        aria-label="Delete item"
        variant="outlined"
      />

      <IconButton
        icon={<ShareIcon />}
        onClick={() => console.log('Share')}
        aria-label="Share item"
        variant="filled"
      />
    </div>
  );
}
```

### Size Variants

```tsx
function SizeVariants() {
  return (
    <div className="size-examples">
      <IconButton size="small" icon={<HeartIcon />} aria-label="Small heart" />

      <IconButton size="medium" icon={<HeartIcon />} aria-label="Medium heart" />

      <IconButton size="large" icon={<HeartIcon />} aria-label="Large heart" />
    </div>
  );
}
```

### Style Variants

```tsx
function StyleVariants() {
  return (
    <div className="variant-examples">
      {/* Standard (default) */}
      <IconButton variant="standard" icon={<StarIcon />} aria-label="Standard star" />

      {/* Filled */}
      <IconButton variant="filled" icon={<StarIcon />} aria-label="Filled star" />

      {/* Outlined */}
      <IconButton variant="outlined" icon={<StarIcon />} aria-label="Outlined star" />

      {/* Tonal */}
      <IconButton variant="tonal" icon={<StarIcon />} aria-label="Tonal star" />
    </div>
  );
}
```

### Toggle Icon Buttons

```tsx
function ToggleButtons() {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <div className="toggle-examples">
      {/* Simple toggle with state change */}
      <IconButton
        toggle
        selected={liked}
        onToggle={setLiked}
        selectedIcon={<HeartIcon filled />}
        unselectedIcon={<HeartIcon />}
        aria-label={liked ? 'Unlike' : 'Like'}
      />

      {/* Toggle with different icons */}
      <IconButton
        toggle
        selected={bookmarked}
        onToggle={setBookmarked}
        selectedIcon={<BookmarkIcon filled />}
        unselectedIcon={<BookmarkIcon />}
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        variant="tonal"
      />

      {/* Star rating toggle */}
      <IconButton
        toggle
        selected={starred}
        onToggle={setStarred}
        selectedIcon={<StarIcon filled />}
        unselectedIcon={<StarIcon />}
        aria-label={starred ? 'Remove from favorites' : 'Add to favorites'}
        variant="outlined"
      />
    </div>
  );
}
```

### Custom Icons

```tsx
function CustomIcons() {
  const CustomSettingsIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
    </svg>
  );

  return (
    <div className="custom-icons">
      <IconButton
        icon={<CustomSettingsIcon />}
        onClick={() => console.log('Settings')}
        aria-label="Open settings"
        variant="tonal"
      />

      {/* Using emoji as icon */}
      <IconButton icon="🎯" onClick={() => console.log('Target')} aria-label="Set target" />

      {/* Using text as icon */}
      <IconButton onClick={() => console.log('Info')} aria-label="Information">
        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>i</span>
      </IconButton>
    </div>
  );
}
```

### Disabled States

```tsx
function DisabledButtons() {
  return (
    <div className="disabled-examples">
      <IconButton icon={<EditIcon />} disabled aria-label="Edit (disabled)" />

      <IconButton icon={<DeleteIcon />} disabled variant="filled" aria-label="Delete (disabled)" />

      <IconButton
        toggle
        selected={true}
        disabled
        selectedIcon={<HeartIcon filled />}
        aria-label="Liked (disabled)"
      />
    </div>
  );
}
```

### Button Groups

```tsx
function ButtonGroups() {
  const [alignment, setAlignment] = useState('left');

  return (
    <div className="button-groups">
      {/* Text alignment toolbar */}
      <div className="toolbar" role="toolbar" aria-label="Text formatting">
        <IconButton
          toggle
          selected={alignment === 'left'}
          onToggle={() => setAlignment('left')}
          icon="⬅"
          aria-label="Align left"
          variant="outlined"
        />

        <IconButton
          toggle
          selected={alignment === 'center'}
          onToggle={() => setAlignment('center')}
          icon="↔"
          aria-label="Align center"
          variant="outlined"
        />

        <IconButton
          toggle
          selected={alignment === 'right'}
          onToggle={() => setAlignment('right')}
          icon="➡"
          aria-label="Align right"
          variant="outlined"
        />
      </div>

      {/* Media controls */}
      <div className="media-controls">
        <IconButton
          icon="⏮"
          onClick={() => console.log('Previous')}
          aria-label="Previous track"
          size="large"
        />

        <IconButton
          icon="⏸"
          onClick={() => console.log('Pause')}
          aria-label="Pause"
          variant="filled"
          size="large"
        />

        <IconButton
          icon="⏭"
          onClick={() => console.log('Next')}
          aria-label="Next track"
          size="large"
        />
      </div>
    </div>
  );
}
```

## Built-in Icons

The component exports several commonly used icons:

```tsx
import {
  HeartIcon,
  StarIcon,
  BookmarkIcon,
  EditIcon,
  DeleteIcon,
  ShareIcon,
  MoreIcon,
  CloseIcon,
} from '@aurora-ui/preact-aurora-ui';

function BuiltInIcons() {
  return (
    <div className="built-in-icons">
      <IconButton icon={<HeartIcon />} aria-label="Like" />
      <IconButton icon={<StarIcon />} aria-label="Star" />
      <IconButton icon={<BookmarkIcon />} aria-label="Bookmark" />
      <IconButton icon={<EditIcon />} aria-label="Edit" />
      <IconButton icon={<DeleteIcon />} aria-label="Delete" />
      <IconButton icon={<ShareIcon />} aria-label="Share" />
      <IconButton icon={<MoreIcon />} aria-label="More options" />
      <IconButton icon={<CloseIcon />} aria-label="Close" />
    </div>
  );
}
```

### Filled Icon Variants

```tsx
function FilledIcons() {
  return (
    <div className="filled-icons">
      <IconButton icon={<HeartIcon filled />} aria-label="Loved" variant="tonal" />

      <IconButton icon={<StarIcon filled />} aria-label="Starred" variant="filled" />

      <IconButton icon={<BookmarkIcon filled />} aria-label="Bookmarked" variant="tonal" />
    </div>
  );
}
```

## Accessibility Features

### Keyboard Navigation

- **Tab**: Focus the button
- **Enter/Space**: Activate the button
- **Escape**: Remove focus (when applicable)

### Screen Reader Support

```tsx
// Comprehensive accessibility
<IconButton
  icon={<DeleteIcon />}
  onClick={handleDelete}
  aria-label="Delete selected items"
  aria-describedby="delete-help"
  title="Delete"
/>

<div id="delete-help" className="sr-only">
  This action cannot be undone
</div>
```

### State Announcements

```tsx
function AccessibleToggle() {
  const [liked, setLiked] = useState(false);

  return (
    <IconButton
      toggle
      selected={liked}
      onToggle={setLiked}
      selectedIcon={<HeartIcon filled />}
      unselectedIcon={<HeartIcon />}
      aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={liked}
    />
  );
}
```

## Form Integration

### Submit and Reset Buttons

```tsx
function FormButtons() {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-content">{/* Form fields */}</div>

      <div className="form-actions">
        <IconButton type="submit" icon="✓" variant="filled" aria-label="Save changes" />

        <IconButton type="reset" icon="↺" variant="outlined" aria-label="Reset form" />
      </div>
    </form>
  );
}
```

### Field Actions

```tsx
function FieldWithActions() {
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="field-with-actions">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <IconButton
        icon={showPassword ? '🙈' : '👁'}
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        size="small"
      />

      <IconButton
        icon={<CloseIcon />}
        onClick={() => setValue('')}
        aria-label="Clear field"
        size="small"
        disabled={!value}
      />
    </div>
  );
}
```

## Theming and Customization

### CSS Custom Properties

```scss
.custom-icon-button {
  // Override colors
  --md-sys-color-on-surface: #1a1a1a;
  --md-sys-color-primary: #6750a4;
  --md-sys-color-primary-container: #eaddff;
  --md-sys-color-on-primary-container: #21005d;

  // Override sizes
  --icon-button-size-small: 28px;
  --icon-button-size-medium: 36px;
  --icon-button-size-large: 44px;
}
```

### Custom Styling

```scss
// Custom button variants
.iconButton {
  &.custom-gradient {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;

    &:hover {
      background: linear-gradient(45deg, #5a67d8, #6b46c1);
    }
  }

  &.custom-rounded {
    border-radius: 8px;
  }

  &.custom-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
}
```

## Advanced Patterns

### Conditional Icon Display

```tsx
function ConditionalIcon() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await performAction();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  let icon = '+';
  let label = 'Add item';

  if (loading) {
    icon = '⟳';
    label = 'Adding...';
  } else if (success) {
    icon = '✓';
    label = 'Added successfully';
  }

  return (
    <IconButton
      icon={icon}
      onClick={handleAction}
      disabled={loading}
      aria-label={label}
      variant={success ? 'filled' : 'standard'}
    />
  );
}
```

### Animated Icons

```tsx
function AnimatedIcon() {
  const [spinning, setSpinning] = useState(false);

  return (
    <IconButton
      icon={<div className={spinning ? 'spin-animation' : ''}>⚙</div>}
      onClick={() => {
        setSpinning(true);
        setTimeout(() => setSpinning(false), 1000);
      }}
      aria-label="Refresh settings"
    />
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { IconButton, HeartIcon } from '@aurora-ui/preact-aurora-ui';

test('handles click events', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<IconButton icon={<HeartIcon />} onClick={handleClick} aria-label="Like" />);

  const button = screen.getByRole('button');
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('toggle functionality works', async () => {
  const user = userEvent.setup();
  const handleToggle = vi.fn();

  render(
    <IconButton
      toggle
      selected={false}
      onToggle={handleToggle}
      selectedIcon={<HeartIcon filled />}
      unselectedIcon={<HeartIcon />}
      aria-label="Toggle like"
    />,
  );

  const button = screen.getByRole('button');
  await user.click(button);

  expect(handleToggle).toHaveBeenCalledWith(true);
  expect(button).toHaveAttribute('aria-pressed', 'true');
});

test('supports keyboard navigation', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<IconButton icon={<HeartIcon />} onClick={handleClick} aria-label="Like" />);

  const button = screen.getByRole('button');
  button.focus();
  await user.keyboard('{Enter}');

  expect(handleClick).toHaveBeenCalled();
});
```

### Accessibility Tests

```tsx
test('has proper accessibility attributes', () => {
  render(
    <IconButton
      icon={<DeleteIcon />}
      aria-label="Delete item"
      aria-describedby="delete-help"
      title="Delete"
    />,
  );

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-label', 'Delete item');
  expect(button).toHaveAttribute('aria-describedby', 'delete-help');
  expect(button).toHaveAttribute('title', 'Delete');
});
```

## Performance Considerations

### Icon Optimization

```tsx
// Lazy load heavy icons
const HeavyIcon = lazy(() => import('./HeavyIcon'));

function OptimizedIconButton() {
  return (
    <IconButton
      icon={
        <Suspense fallback={<div>⟳</div>}>
          <HeavyIcon />
        </Suspense>
      }
      aria-label="Heavy action"
    />
  );
}
```

### Memoization

```tsx
const MemoizedIconButton = memo(IconButton);

function OptimizedList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <MemoizedIconButton
          key={item.id}
          icon={<DeleteIcon />}
          onClick={() => deleteItem(item.id)}
          aria-label={`Delete ${item.name}`}
        />
      ))}
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full feature support
- **CSS Transforms**: Used for animations
- **SVG**: Required for built-in icons
- **CSS Custom Properties**: Theming system
- **Touch Events**: Mobile interaction support

## Related Components

- [Button](../Button/README.md) - For text-based buttons
- [FAB](../FAB/README.md) - For floating action buttons
- [Menu](../Menu/README.md) - For dropdown actions
- [Tooltip](../Tooltip/README.md) - For icon explanations

## Troubleshooting

### Common Issues

**Q: Icons not displaying correctly?**  
A: Ensure icon components are properly imported and SVG viewBox is set correctly.

**Q: Toggle state not updating?**  
A: Check that `onToggle` handler is properly updating parent state.

**Q: Button not focusable?**  
A: Verify button is not disabled and has proper `aria-label`.

**Q: Custom icons too large/small?**  
A: Set proper width/height on SVG elements or use CSS to control icon size.

**Q: Accessibility warnings?**  
A: Ensure all icon buttons have meaningful `aria-label` or `title` attributes.

### Performance Tips

1. **Use built-in icons** when possible for better performance
2. **Memoize icon components** that don't change frequently
3. **Optimize SVG icons** by removing unnecessary elements
4. **Avoid inline icons** in frequently re-rendered components
5. **Use proper lazy loading** for heavy icon libraries

## Resources

- [Material Design Icon Buttons](https://m3.material.io/components/icon-buttons)
- [WCAG Button Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [SVG Accessibility Guide](https://css-tricks.com/accessible-svgs/)
