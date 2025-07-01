# Select Component

## Overview

The Select component provides dropdown selection controls that follow Material Design 3 guidelines. It supports single and multiple selection, search functionality, option groups, and extensive customization options.

## Installation

```bash
npm install preact-aurora-ui@0.0.13
```

## Usage

### Basic Select

```tsx
import { Select } from 'preact-aurora-ui';

function BasicExample() {
  const [value, setValue] = useState('');

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];

  return (
    <Select
      label="Choose a fruit"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit..."
    />
  );
}
```

### Multiple Selection

```tsx
function MultiSelectExample() {
  const [values, setValues] = useState([]);

  return (
    <Select
      label="Choose fruits"
      options={options}
      value={values}
      onChange={setValues}
      multiple
      placeholder="Select fruits..."
    />
  );
}
```

### Searchable Select

```tsx
function SearchableExample() {
  return (
    <Select
      label="Search countries"
      options={countryOptions}
      value={country}
      onChange={setCountry}
      searchable
      searchPlaceholder="Type to search..."
    />
  );
}
```

## API Reference

### Select Props

| Prop                  | Type                                                 | Default                 | Description                  |
| --------------------- | ---------------------------------------------------- | ----------------------- | ---------------------------- |
| `value`               | `string \| number \| (string \| number)[]`           | `undefined`             | Current selected value(s)    |
| `defaultValue`        | `string \| number \| (string \| number)[]`           | `undefined`             | Default value (uncontrolled) |
| `options`             | `SelectOption[]`                                     | `[]`                    | Array of options to display  |
| `groups`              | `SelectOptionGroup[]`                                | `[]`                    | Grouped options              |
| `label`               | `string`                                             | `undefined`             | Label text                   |
| `placeholder`         | `string`                                             | `'Select an option...'` | Placeholder text             |
| `helperText`          | `string`                                             | `undefined`             | Helper text below select     |
| `error`               | `string`                                             | `undefined`             | Error message                |
| `variant`             | `'filled' \| 'outlined'`                             | `'outlined'`            | Visual variant               |
| `size`                | `'small' \| 'medium' \| 'large'`                     | `'medium'`              | Size variant                 |
| `disabled`            | `boolean`                                            | `false`                 | Disabled state               |
| `required`            | `boolean`                                            | `false`                 | Required field indicator     |
| `multiple`            | `boolean`                                            | `false`                 | Multiple selection mode      |
| `searchable`          | `boolean`                                            | `false`                 | Enable search functionality  |
| `searchPlaceholder`   | `string`                                             | `'Search options...'`   | Search input placeholder     |
| `clearSearchOnSelect` | `boolean`                                            | `true`                  | Clear search on selection    |
| `maxDropdownHeight`   | `number`                                             | `300`                   | Maximum dropdown height (px) |
| `open`                | `boolean`                                            | `undefined`             | Controlled open state        |
| `defaultOpen`         | `boolean`                                            | `false`                 | Default open state           |
| `loading`             | `boolean`                                            | `false`                 | Loading state                |
| `clearable`           | `boolean`                                            | `false`                 | Show clear button            |
| `className`           | `string`                                             | `undefined`             | Additional CSS classes       |
| `onChange`            | `(value: any) => void`                               | `undefined`             | Value change handler         |
| `onOpenChange`        | `(open: boolean) => void`                            | `undefined`             | Open state change handler    |
| `onSearch`            | `(searchValue: string) => void`                      | `undefined`             | Search input handler         |
| `renderOption`        | `(option: SelectOption) => ReactNode`                | `undefined`             | Custom option renderer       |
| `renderValue`         | `(value: any, options: SelectOption[]) => ReactNode` | `undefined`             | Custom value renderer        |
| `renderEmpty`         | `() => ReactNode`                                    | `undefined`             | Custom empty state renderer  |
| `renderLoading`       | `() => ReactNode`                                    | `undefined`             | Custom loading renderer      |

### SelectOption Interface

```tsx
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  data?: any;
}
```

### SelectOptionGroup Interface

```tsx
interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
  disabled?: boolean;
}
```

## Examples

### Variants and Sizes

```tsx
// Different variants
<Select variant="outlined" options={options} />
<Select variant="filled" options={options} />

// Different sizes
<Select size="small" options={options} />
<Select size="medium" options={options} />
<Select size="large" options={options} />
```

### Option Groups

```tsx
function GroupedExample() {
  const groups = [
    {
      label: 'Fruits',
      options: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
      ],
    },
    {
      label: 'Vegetables',
      options: [
        { value: 'carrot', label: 'Carrot' },
        { value: 'potato', label: 'Potato' },
      ],
    },
  ];

  return <Select label="Food items" groups={groups} value={food} onChange={setFood} />;
}
```

### Loading State

```tsx
function AsyncExample() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = async () => {
    setLoading(true);
    try {
      const data = await fetchOptions();
      setOptions(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      label="Remote data"
      options={options}
      loading={loading}
      onFocus={loadOptions}
      renderLoading={() => <div>Loading options...</div>}
    />
  );
}
```

### Custom Renderers

```tsx
function CustomRenderExample() {
  const userOptions = [
    { value: '1', label: 'John Doe', data: { email: 'john@example.com' } },
    { value: '2', label: 'Jane Smith', data: { email: 'jane@example.com' } },
  ];

  return (
    <Select
      options={userOptions}
      renderOption={(option) => (
        <div className="user-option">
          <strong>{option.label}</strong>
          <small>{option.data.email}</small>
        </div>
      )}
      renderValue={(value, options) => {
        const selected = options.find((opt) => opt.value === value);
        return selected ? `${selected.label} (${selected.data.email})` : '';
      }}
    />
  );
}
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Select
    name="category"
    label="Category"
    options={categories}
    value={formData.category}
    onChange={(value) => setFormData({ ...formData, category: value })}
    required
    error={errors.category}
    helperText={errors.category || 'Select a category for your item'}
  />

  <Select
    name="tags"
    label="Tags"
    options={tagOptions}
    value={formData.tags}
    onChange={(value) => setFormData({ ...formData, tags: value })}
    multiple
    searchable
    helperText="Choose multiple tags (searchable)"
  />

  <Button type="submit">Submit</Button>
</form>
```

### Advanced Search

```tsx
function AdvancedSearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(allOptions);

  const handleSearch = useCallback(
    debounce((term: string) => {
      const filtered = allOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(term.toLowerCase()) ||
          option.data?.description?.toLowerCase().includes(term.toLowerCase()),
      );
      setFilteredOptions(filtered);
    }, 300),
    [allOptions],
  );

  return (
    <Select
      options={filteredOptions}
      searchable
      onSearch={handleSearch}
      renderEmpty={() => <div className="no-results">No results found for "{searchTerm}"</div>}
    />
  );
}
```

## Accessibility

### ARIA Support

The Select component implements comprehensive ARIA attributes:

- `role="combobox"` on the trigger element
- `aria-expanded` reflects dropdown state
- `aria-haspopup="listbox"` indicates dropdown presence
- `aria-labelledby` links to label
- `aria-describedby` links to helper text
- `role="listbox"` on dropdown
- `role="option"` on each option
- `aria-selected` on selected options
- `aria-disabled` on disabled options

### Keyboard Navigation

- **Tab/Shift+Tab**: Navigate to/from select
- **Space/Enter**: Open dropdown
- **Escape**: Close dropdown
- **Arrow Up/Down**: Navigate options
- **Home/End**: First/last option
- **Page Up/Down**: Jump by 10 options
- **Type**: Search options (when searchable)

### Screen Reader Support

- Select role and state announced
- Label and helper text read
- Option selection communicated
- Search functionality accessible
- Error states announced

```tsx
// Accessibility example
<Select
  label="Country"
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  required
  error={!!errors.country}
  helperText={errors.country || "Select your country of residence"}
  aria-describedby="country-help"
/>
<div id="country-help">
  This information is used for shipping and tax calculations
</div>
```

## Theming

### CSS Custom Properties

Select components support extensive theming:

```css
.custom-select {
  --select-border-color: var(--md-sys-color-outline);
  --select-border-color-hover: var(--md-sys-color-primary);
  --select-border-color-focus: var(--md-sys-color-primary);
  --select-background: var(--md-sys-color-surface);
  --select-text-color: var(--md-sys-color-on-surface);
  --select-placeholder-color: var(--md-sys-color-outline);
  --select-arrow-color: var(--md-sys-color-outline);
  --select-height: 56px;
  --select-padding: 16px;
  --select-border-radius: 4px;
  --select-font-size: 16px;

  /* Dropdown */
  --dropdown-background: var(--md-sys-color-surface);
  --dropdown-border: 1px solid var(--md-sys-color-outline-variant);
  --dropdown-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  --dropdown-max-height: 300px;

  /* Options */
  --option-padding: 12px 16px;
  --option-background-hover: var(--md-sys-color-secondary-container);
  --option-background-selected: var(--md-sys-color-primary-container);
  --option-text-selected: var(--md-sys-color-on-primary-container);
}
```

### Material Design Tokens

Components use Material Design 3 tokens:

- `--md-sys-color-primary` - Focus/selected states
- `--md-sys-color-outline` - Borders and icons
- `--md-sys-color-surface` - Background colors
- `--md-sys-color-on-surface` - Text colors
- `--md-sys-color-error` - Error states

### Custom Styling

```scss
// Custom select theme
.premium-select {
  --select-border-color: #gold;
  --select-background: linear-gradient(135deg, #fff, #f8f9fa);
  --option-background-selected: #gold;
  --dropdown-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
```

## Advanced Usage

### Controlled vs Uncontrolled

```tsx
// Controlled
<Select
  value={selectedValue}
  onChange={setSelectedValue}
  options={options}
/>

// Uncontrolled
<Select
  defaultValue="apple"
  options={options}
  onChange={(value) => console.log('Selected:', value)}
/>
```

### Dynamic Options

```tsx
function DynamicSelect() {
  const [category, setCategory] = useState('');
  const [subOptions, setSubOptions] = useState([]);

  useEffect(() => {
    if (category) {
      setSubOptions(getSubOptions(category));
    }
  }, [category]);

  return (
    <>
      <Select label="Category" options={categoryOptions} value={category} onChange={setCategory} />

      {category && (
        <Select
          label="Subcategory"
          options={subOptions}
          value={subcategory}
          onChange={setSubcategory}
        />
      )}
    </>
  );
}
```

### Virtualization for Large Lists

```tsx
function VirtualizedSelect() {
  const [options] = useState(() =>
    Array.from({ length: 10000 }, (_, i) => ({
      value: i,
      label: `Option ${i + 1}`,
    })),
  );

  return (
    <Select
      options={options}
      searchable
      maxDropdownHeight={400}
      renderOption={(option) => <div style={{ height: 40 }}>{option.label}</div>}
    />
  );
}
```

### Server-Side Search

```tsx
function ServerSearchSelect() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm.trim()) return;

      setLoading(true);
      try {
        const results = await searchAPI(searchTerm);
        setOptions(results);
      } finally {
        setLoading(false);
      }
    }, 500),
    [],
  );

  return (
    <Select
      options={options}
      searchable
      loading={loading}
      onSearch={handleSearch}
      renderEmpty={() => <div>Type to search for options...</div>}
    />
  );
}
```

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/preact';
import { Select } from 'preact-aurora-ui';
import userEvent from '@testing-library/user-event';

test('selects option', async () => {
  const handleChange = vi.fn();
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
  ];

  render(<Select options={options} onChange={handleChange} placeholder="Choose fruit" />);

  await userEvent.click(screen.getByText('Choose fruit'));
  await userEvent.click(screen.getByText('Apple'));

  expect(handleChange).toHaveBeenCalledWith('apple');
});
```

### Integration Tests

```tsx
test('select form integration', async () => {
  const handleSubmit = vi.fn();

  render(
    <form onSubmit={handleSubmit}>
      <Select name="fruit" options={options} required />
      <button type="submit">Submit</button>
    </form>,
  );

  await userEvent.click(screen.getByRole('combobox'));
  await userEvent.click(screen.getByText('Apple'));
  await userEvent.click(screen.getByText('Submit'));

  expect(handleSubmit).toHaveBeenCalled();
});
```

### Accessibility Tests

```tsx
test('select accessibility', () => {
  render(<Select label="Fruit selection" options={options} helperText="Choose your favorite" />);

  const select = screen.getByRole('combobox');

  expect(select).toHaveAttribute('aria-expanded', 'false');
  expect(select).toHaveAccessibleName('Fruit selection');
  expect(select).toHaveAccessibleDescription('Choose your favorite');
});
```

## FAQ

### How do I handle validation with Select?

Use the `error` prop and `helperText` for validation feedback:

```tsx
<Select
  options={options}
  value={value}
  onChange={setValue}
  error={!value && submitted ? 'Please select an option' : undefined}
  helperText={!value && submitted ? 'This field is required' : 'Select an option'}
/>
```

### Can I use custom option components?

Yes, use the `renderOption` prop for custom option rendering:

```tsx
<Select
  options={options}
  renderOption={(option) => (
    <div className="custom-option">
      <img src={option.data.icon} alt="" />
      <span>{option.label}</span>
    </div>
  )}
/>
```

### How do I implement async data loading?

Use the `loading` prop and load data in event handlers:

```tsx
<Select
  options={options}
  loading={isLoading}
  onFocus={loadOptions}
  renderLoading={() => <Spinner />}
/>
```

### How do I clear the selection?

Use the `clearable` prop to show a clear button, or set value to empty:

```tsx
<Select
  clearable
  value={value}
  onChange={setValue}
  options={options}
/>

// Or programmatically
<button onClick={() => setValue('')}>Clear</button>
```

### Can I use Select for complex objects?

Yes, store object IDs as values and use `data` property for additional info:

```tsx
const options = users.map((user) => ({
  value: user.id,
  label: user.name,
  data: { email: user.email, avatar: user.avatar },
}));
```
