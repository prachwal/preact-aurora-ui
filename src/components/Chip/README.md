# Chip Component

A Material Design 3 chip component for displaying compact elements that represent inputs, attributes, actions, or filters with multiple variants and behaviors.

## Overview

The Chip component provides:

- **Four Chip Types**: Input, Assist, Filter, and Suggestion chips
- **Interactive States**: Clickable, selectable, and removable behaviors
- **Visual Elements**: Icons, avatars, and built-in action indicators
- **ChipGroup**: Container for organizing multiple chips
- **Accessibility**: Full keyboard navigation and screen reader support
- **Material Design 3**: Complete MD3 styling with proper typography and spacing

## Basic Usage

```tsx
import { Chip, ChipGroup } from '@aurora-ui/preact-aurora-ui';

function BasicChips() {
  return (
    <ChipGroup>
      <Chip type="assist" onClick={() => console.log('Assist clicked')}>
        Help
      </Chip>

      <Chip type="filter" onSelect={(selected) => console.log('Selected:', selected)}>
        Filter Option
      </Chip>

      <Chip type="input" onRemove={() => console.log('Remove tag')}>
        Removable Tag
      </Chip>
    </ChipGroup>
  );
}
```

## API Reference

### Chip Props

#### Base Props (All Types)

| Prop               | Type                                              | Default      | Description                     |
| ------------------ | ------------------------------------------------- | ------------ | ------------------------------- |
| `type`             | `'input' \| 'assist' \| 'filter' \| 'suggestion'` | **required** | Chip behavior type              |
| `children`         | `ComponentChildren`                               | **required** | Chip content/label              |
| `disabled`         | `boolean`                                         | `false`      | Whether chip is disabled        |
| `icon`             | `ComponentChildren`                               |              | Leading icon                    |
| `avatar`           | `ComponentChildren`                               |              | Leading avatar (overrides icon) |
| `className`        | `string`                                          |              | Additional CSS classes          |
| `style`            | `JSX.CSSProperties`                               |              | Inline styles                   |
| `aria-label`       | `string`                                          |              | Accessibility label             |
| `aria-describedby` | `string`                                          |              | ARIA description reference      |

#### Input Chip Props

| Prop        | Type         | Default      | Description                 |
| ----------- | ------------ | ------------ | --------------------------- |
| `type`      | `'input'`    | **required** | Chip type identifier        |
| `onRemove`  | `() => void` |              | Remove handler              |
| `removable` | `boolean`    | `true`       | Whether chip can be removed |

#### Assist Chip Props

| Prop      | Type              | Default      | Description          |
| --------- | ----------------- | ------------ | -------------------- |
| `type`    | `'assist'`        | **required** | Chip type identifier |
| `onClick` | `(event) => void` |              | Click handler        |

#### Filter Chip Props

| Prop       | Type                          | Default      | Description              |
| ---------- | ----------------------------- | ------------ | ------------------------ |
| `type`     | `'filter'`                    | **required** | Chip type identifier     |
| `selected` | `boolean`                     | `false`      | Whether chip is selected |
| `onSelect` | `(selected: boolean) => void` |              | Selection handler        |

#### Suggestion Chip Props

| Prop      | Type              | Default      | Description          |
| --------- | ----------------- | ------------ | -------------------- |
| `type`    | `'suggestion'`    | **required** | Chip type identifier |
| `onClick` | `(event) => void` |              | Click handler        |

### ChipGroup Props

| Prop          | Type                         | Default         | Description                     |
| ------------- | ---------------------------- | --------------- | ------------------------------- |
| `children`    | `ComponentChildren`          | **required**    | Chip components                 |
| `multiSelect` | `boolean`                    | `false`         | Allow multiple selections       |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'`  | Layout direction                |
| `spacing`     | `'compact' \| 'comfortable'` | `'comfortable'` | Spacing between chips           |
| `wrap`        | `boolean`                    | `true`          | Whether chips wrap to new lines |
| `className`   | `string`                     |                 | Additional CSS classes          |

## Examples

### Input Chips (Tags)

```tsx
function TagInput() {
  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <h3>Tags:</h3>
      <ChipGroup>
        {tags.map((tag) => (
          <Chip key={tag} type="input" onRemove={() => removeTag(tag)}>
            {tag}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  );
}
```

### Filter Chips

```tsx
function CategoryFilter() {
  const [selectedFilters, setSelectedFilters] = useState(new Set(['all']));

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'tech', label: 'Technology' },
    { id: 'design', label: 'Design' },
    { id: 'business', label: 'Business' },
  ];

  const handleFilterSelect = (categoryId, selected) => {
    const newFilters = new Set(selectedFilters);

    if (categoryId === 'all') {
      setSelectedFilters(new Set(['all']));
    } else {
      newFilters.delete('all');
      if (selected) {
        newFilters.add(categoryId);
      } else {
        newFilters.delete(categoryId);
      }
      if (newFilters.size === 0) {
        newFilters.add('all');
      }
      setSelectedFilters(newFilters);
    }
  };

  return (
    <div>
      <h3>Filter by Category:</h3>
      <ChipGroup>
        {categories.map((category) => (
          <Chip
            key={category.id}
            type="filter"
            selected={selectedFilters.has(category.id)}
            onSelect={(selected) => handleFilterSelect(category.id, selected)}
          >
            {category.label}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  );
}
```

### Assist Chips (Actions)

```tsx
function QuickActions() {
  const actions = [
    { id: 'copy', label: 'Copy Link', icon: '📋' },
    { id: 'share', label: 'Share', icon: '📤' },
    { id: 'save', label: 'Save', icon: '💾' },
    { id: 'print', label: 'Print', icon: '🖨️' },
  ];

  const handleAction = (actionId) => {
    switch (actionId) {
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        break;
      case 'share':
        navigator.share?.({ url: window.location.href });
        break;
      case 'save':
        console.log('Saving...');
        break;
      case 'print':
        window.print();
        break;
    }
  };

  return (
    <div>
      <h3>Quick Actions:</h3>
      <ChipGroup>
        {actions.map((action) => (
          <Chip
            key={action.id}
            type="assist"
            icon={action.icon}
            onClick={() => handleAction(action.id)}
          >
            {action.label}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  );
}
```

### Suggestion Chips

```tsx
function SearchSuggestions() {
  const [query, setQuery] = useState('');
  const suggestions = [
    'JavaScript tutorials',
    'React best practices',
    'CSS animations',
    'TypeScript guide',
    'Node.js deployment',
  ];

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    // Trigger search with suggestion
    console.log('Searching for:', suggestion);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />

      {query.length === 0 && (
        <div>
          <h4>Popular searches:</h4>
          <ChipGroup>
            {suggestions.map((suggestion) => (
              <Chip
                key={suggestion}
                type="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Chip>
            ))}
          </ChipGroup>
        </div>
      )}
    </div>
  );
}
```

### Chips with Icons and Avatars

```tsx
function ContactChips() {
  const contacts = [
    { id: 1, name: 'John Doe', avatar: '/avatars/john.jpg', status: 'online' },
    { id: 2, name: 'Jane Smith', avatar: '/avatars/jane.jpg', status: 'away' },
    { id: 3, name: 'Bob Johnson', avatar: '/avatars/bob.jpg', status: 'offline' },
  ];

  const statusIcons = {
    online: '🟢',
    away: '🟡',
    offline: '⚫',
  };

  return (
    <div>
      <h3>Team Members:</h3>
      <ChipGroup>
        {contacts.map((contact) => (
          <Chip
            key={contact.id}
            type="assist"
            avatar={<img src={contact.avatar} alt={contact.name} />}
            onClick={() => console.log('Contact:', contact.name)}
          >
            {contact.name} {statusIcons[contact.status]}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  );
}
```

### Custom Icons

```tsx
import { CloseIcon, CheckIcon, AddIcon } from '@aurora-ui/preact-aurora-ui';

function CustomIconChips() {
  const StarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  return (
    <ChipGroup>
      <Chip type="assist" icon={<StarIcon />}>
        Favorite
      </Chip>

      <Chip type="filter" icon={<CheckIcon />}>
        Completed
      </Chip>

      <Chip type="suggestion" icon={<AddIcon />}>
        Add New
      </Chip>
    </ChipGroup>
  );
}
```

### Chip Groups with Different Layouts

```tsx
function ChipLayouts() {
  const items = ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry'];

  return (
    <div>
      {/* Horizontal layout (default) */}
      <section>
        <h3>Horizontal Layout:</h3>
        <ChipGroup orientation="horizontal" spacing="comfortable">
          {items.map((item) => (
            <Chip key={item} type="filter">
              {item}
            </Chip>
          ))}
        </ChipGroup>
      </section>

      {/* Vertical layout */}
      <section>
        <h3>Vertical Layout:</h3>
        <ChipGroup orientation="vertical" spacing="compact">
          {items.map((item) => (
            <Chip key={item} type="assist">
              {item}
            </Chip>
          ))}
        </ChipGroup>
      </section>

      {/* No wrap layout */}
      <section>
        <h3>No Wrap Layout:</h3>
        <ChipGroup wrap={false} style={{ width: '300px', overflow: 'auto' }}>
          {items.map((item) => (
            <Chip key={item} type="input">
              {item}
            </Chip>
          ))}
        </ChipGroup>
      </section>
    </div>
  );
}
```

## Accessibility Features

### Keyboard Navigation

- **Tab**: Focus chips in sequence
- **Enter/Space**: Activate focused chip
- **Delete/Backspace**: Remove input chips when focused
- **Arrow Keys**: Navigate between chips in a group

### Screen Reader Support

```tsx
// Comprehensive accessibility
<Chip
  type="filter"
  aria-label="Filter by technology category"
  aria-describedby="tech-filter-description"
  selected={isSelected}
  onSelect={handleSelect}
>
  Technology
</Chip>

<ChipGroup aria-label="Category filters">
  {/* Chips */}
</ChipGroup>
```

### ARIA Attributes

- **role="option"**: For filter and input chips
- **role="button"**: For assist and suggestion chips
- **aria-selected**: Current selection state
- **aria-pressed**: Toggle state for filter chips
- **aria-disabled**: Disabled state

## Type-Safe Chip Creation

```tsx
import {
  createInputChip,
  createAssistChip,
  createFilterChip,
  createSuggestionChip,
} from '@aurora-ui/preact-aurora-ui';

function TypeSafeChips() {
  // Type-safe chip creation with helpers
  const inputChipProps = createInputChip({
    children: 'Remove me',
    onRemove: () => console.log('Removed'),
  });

  const filterChipProps = createFilterChip({
    children: 'Filter option',
    selected: true,
    onSelect: (selected) => console.log('Selected:', selected),
  });

  return (
    <ChipGroup>
      <Chip {...inputChipProps} />
      <Chip {...filterChipProps} />
    </ChipGroup>
  );
}
```

## Advanced Patterns

### Multi-Select Filter System

```tsx
function MultiSelectFilters() {
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  const filters = [
    { id: 'new', label: 'New' },
    { id: 'popular', label: 'Popular' },
    { id: 'trending', label: 'Trending' },
    { id: 'featured', label: 'Featured' },
  ];

  const handleFilterToggle = (filterId, selected) => {
    const newFilters = new Set(selectedFilters);
    if (selected) {
      newFilters.add(filterId);
    } else {
      newFilters.delete(filterId);
    }
    setSelectedFilters(newFilters);
  };

  const clearAllFilters = () => {
    setSelectedFilters(new Set());
  };

  return (
    <div>
      <div className="filter-header">
        <h3>Filters ({selectedFilters.size})</h3>
        {selectedFilters.size > 0 && <button onClick={clearAllFilters}>Clear All</button>}
      </div>

      <ChipGroup multiSelect>
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            type="filter"
            selected={selectedFilters.has(filter.id)}
            onSelect={(selected) => handleFilterToggle(filter.id, selected)}
          >
            {filter.label}
          </Chip>
        ))}
      </ChipGroup>
    </div>
  );
}
```

### Dynamic Tag Input

```tsx
function DynamicTagInput() {
  const [tags, setTags] = useState(['JavaScript', 'React']);
  const [inputValue, setInputValue] = useState('');

  const addTag = (tag) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags([...tags, tag.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className="tag-input">
      <label>Tags:</label>
      <div className="tag-input-container">
        <ChipGroup>
          {tags.map((tag) => (
            <Chip key={tag} type="input" onRemove={() => removeTag(tag)}>
              {tag}
            </Chip>
          ))}
        </ChipGroup>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Add tag..."
          className="tag-input-field"
        />
      </div>
    </div>
  );
}
```

### Chip with Loading States

```tsx
function LoadingChips() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/suggestions');
      const data = await response.json();
      setSuggestions(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={loadSuggestions} disabled={loading}>
        {loading ? 'Loading...' : 'Load Suggestions'}
      </button>

      <ChipGroup>
        {loading ? (
          <Chip type="assist" disabled>
            Loading...
          </Chip>
        ) : (
          suggestions.map((suggestion) => (
            <Chip
              key={suggestion.id}
              type="suggestion"
              onClick={() => console.log('Selected:', suggestion.text)}
            >
              {suggestion.text}
            </Chip>
          ))
        )}
      </ChipGroup>
    </div>
  );
}
```

## Theming and Customization

### CSS Custom Properties

```scss
.custom-chips {
  // Chip colors
  --color-primary: #6750a4;
  --color-on-primary: #ffffff;
  --color-surface: #ffffff;
  --color-on-surface: #1a1a1a;

  // Chip specific overrides
  --chip-border-radius: 12px;
  --chip-height: 36px;
  --chip-padding: 18px;
}
```

### Custom Styling

```scss
// Custom chip variants
.chip.custom {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;

  &:hover {
    background: linear-gradient(45deg, #5a67d8, #6b46c1);
  }

  .removeButton {
    color: rgba(255, 255, 255, 0.8);

    &:hover {
      color: white;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

// Custom chip group spacing
.chipGroup.wide {
  gap: 16px;
}
```

## Testing

### Unit Tests

```tsx
import { render, screen, fireEvent } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { Chip, ChipGroup } from '@aurora-ui/preact-aurora-ui';

test('filter chip toggles selection', async () => {
  const user = userEvent.setup();
  const onSelect = vi.fn();

  render(
    <Chip type="filter" onSelect={onSelect}>
      Filter
    </Chip>,
  );

  const chip = screen.getByRole('option');
  await user.click(chip);

  expect(onSelect).toHaveBeenCalledWith(true);
});

test('input chip handles removal', async () => {
  const user = userEvent.setup();
  const onRemove = vi.fn();

  render(
    <Chip type="input" onRemove={onRemove}>
      Tag
    </Chip>,
  );

  const removeButton = screen.getByLabelText('Remove');
  await user.click(removeButton);

  expect(onRemove).toHaveBeenCalled();
});

test('assist chip handles clicks', async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();

  render(
    <Chip type="assist" onClick={onClick}>
      Action
    </Chip>,
  );

  const chip = screen.getByRole('button');
  await user.click(chip);

  expect(onClick).toHaveBeenCalled();
});
```

### Integration Tests

```tsx
test('chip group manages multiple selections', async () => {
  const user = userEvent.setup();

  render(
    <ChipGroup multiSelect>
      <Chip type="filter" onSelect={() => {}}>
        Option 1
      </Chip>
      <Chip type="filter" onSelect={() => {}}>
        Option 2
      </Chip>
    </ChipGroup>,
  );

  const options = screen.getAllByRole('option');

  await user.click(options[0]);
  await user.click(options[1]);

  expect(options[0]).toHaveAttribute('aria-selected', 'true');
  expect(options[1]).toHaveAttribute('aria-selected', 'true');
});
```

## Performance Considerations

### Memoization

```tsx
const MemoizedChip = memo(Chip);

function OptimizedChipList({ items, onItemSelect }) {
  const memoizedChips = useMemo(
    () =>
      items.map((item) => (
        <MemoizedChip
          key={item.id}
          type="filter"
          onSelect={(selected) => onItemSelect(item.id, selected)}
        >
          {item.label}
        </MemoizedChip>
      )),
    [items, onItemSelect],
  );

  return <ChipGroup>{memoizedChips}</ChipGroup>;
}
```

### Virtual Scrolling for Large Lists

```tsx
function VirtualizedChips({ items }) {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 50));

  const loadMore = useCallback(() => {
    const currentLength = visibleItems.length;
    const nextItems = items.slice(currentLength, currentLength + 50);
    setVisibleItems((prev) => [...prev, ...nextItems]);
  }, [visibleItems.length, items]);

  return (
    <div>
      <ChipGroup>
        {visibleItems.map((item) => (
          <Chip key={item.id} type="filter">
            {item.label}
          </Chip>
        ))}
      </ChipGroup>

      {visibleItems.length < items.length && <button onClick={loadMore}>Load More</button>}
    </div>
  );
}
```

## Browser Support

- **Modern Browsers**: Full feature support
- **CSS Grid/Flexbox**: Layout system
- **CSS Custom Properties**: Theming
- **Touch Events**: Mobile interaction support

## Related Components

- [Button](../Button/README.md) - For general button functionality
- [Badge](../Badge/README.md) - For status indicators
- [TextField](../TextField/README.md) - For input fields with chips
- [Menu](../Menu/README.md) - For dropdown selections

## Troubleshooting

### Common Issues

**Q: Chip not responding to clicks?**  
A: Ensure the correct `type` is set and corresponding handlers (`onClick`, `onSelect`) are provided.

**Q: Remove button not appearing on input chips?**  
A: Check that `removable` prop is not set to `false` and `onRemove` handler is provided.

**Q: Filter chips not showing selection state?**  
A: Verify `selected` prop is controlled and `onSelect` handler updates parent state.

**Q: Icons not displaying correctly?**  
A: Ensure icon components are properly imported and have appropriate sizing.

**Q: Chips overflowing container?**  
A: Use ChipGroup with `wrap={true}` or implement horizontal scrolling.

### Performance Tips

1. **Memoize chip arrays** for large lists
2. **Use stable keys** for chip identification
3. **Implement virtual scrolling** for huge datasets
4. **Debounce filter operations** to avoid excessive re-renders
5. **Optimize icon components** to prevent unnecessary renders

## Resources

- [Material Design Chips](https://m3.material.io/components/chips)
- [WCAG Interactive Elements](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [React Performance Patterns](https://react.dev/learn/render-and-commit)
