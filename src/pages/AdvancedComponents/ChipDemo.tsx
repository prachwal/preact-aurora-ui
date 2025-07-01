// @ts-nocheck - Demo file with type assertion workarounds for discriminated unions
import { useState } from 'preact/hooks';

import { Chip, ChipGroup } from '../../components/Chip';

// Local icon components for demo
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
  </svg>
);

const AddIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

export function ChipDemo() {
  const [filters, setFilters] = useState({
    category: false,
    brand: false,
    price: false,
    rating: false,
  });

  const [inputChips, setInputChips] = useState([
    'React',
    'TypeScript',
    'Material Design',
    'Components',
  ]);

  const handleFilterChange = (filterName: keyof typeof filters) => (selected: boolean) => {
    setFilters((prev) => ({ ...prev, [filterName]: selected }));
  };

  const removeInputChip = (index: number) => {
    setInputChips((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4>🏷️ Chip Component</h4>
        <p>Material Design 3 chips with 4 types: Input, Assist, Filter, and Suggestion.</p>
      </div>

      {/* Input Chips */}
      <div>
        <h5>Input Chips (with removal)</h5>
        <ChipGroup>
          {inputChips.map((chip, index) => (
            <Chip key={index} type="input" onRemove={() => removeInputChip(index)} removable>
              {chip}
            </Chip>
          ))}
        </ChipGroup>
        {inputChips.length === 0 && (
          <p style={{ color: 'var(--color-on-surface-variant)', fontStyle: 'italic' }}>
            All chips have been removed!
          </p>
        )}
      </div>

      {/* Filter Chips */}
      <div>
        <h5>Filter Chips (selectable)</h5>
        <ChipGroup>
          <Chip
            type="filter"
            selected={filters.category}
            onSelect={handleFilterChange('category')}
            icon={<CheckIcon />}
          >
            Category
          </Chip>
          <Chip
            type="filter"
            selected={filters.brand}
            onSelect={handleFilterChange('brand')}
            icon={<CheckIcon />}
          >
            Brand
          </Chip>
          <Chip
            type="filter"
            selected={filters.price}
            onSelect={handleFilterChange('price')}
            icon={<CheckIcon />}
          >
            Price Range
          </Chip>
          <Chip
            type="filter"
            selected={filters.rating}
            onSelect={handleFilterChange('rating')}
            icon={<CheckIcon />}
          >
            Rating
          </Chip>
        </ChipGroup>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-on-surface-variant)' }}>
          Selected filters:{' '}
          {Object.entries(filters)
            .filter(([, selected]) => selected)
            .map(([name]) => name)
            .join(', ') || 'None'}
        </p>
      </div>

      {/* Assist Chips */}
      <div>
        <h5>Assist Chips (actions)</h5>
        <ChipGroup>
          <Chip type="assist" icon={<AddIcon />} onClick={() => alert('Add new item!')}>
            Add Item
          </Chip>
          <Chip type="assist" onClick={() => alert('Share content!')}>
            Share
          </Chip>
          <Chip type="assist" onClick={() => alert('Export data!')}>
            Export
          </Chip>
          <Chip type="assist" onClick={() => alert('Print document!')}>
            Print
          </Chip>
        </ChipGroup>
      </div>

      {/* Suggestion Chips */}
      <div>
        <h5>Suggestion Chips</h5>
        <ChipGroup>
          <Chip type="suggestion" onClick={() => alert('Search for "React"')}>
            React
          </Chip>
          <Chip type="suggestion" onClick={() => alert('Search for "TypeScript"')}>
            TypeScript
          </Chip>
          <Chip type="suggestion" onClick={() => alert('Search for "Material Design"')}>
            Material Design
          </Chip>
          <Chip type="suggestion" onClick={() => alert('Search for "UI Components"')}>
            UI Components
          </Chip>
        </ChipGroup>
      </div>

      {/* With Avatars and Icons */}
      <div>
        <h5>Chips with Icons and Avatars</h5>
        <ChipGroup>
          <Chip
            type="assist"
            avatar={
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-on-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                JD
              </div>
            }
            onClick={() => alert('User profile')}
          >
            John Doe
          </Chip>

          <Chip type="filter" icon={<CloseIcon />} selected={false} onSelect={() => {}}>
            With Icon
          </Chip>

          <Chip
            type="input"
            avatar={
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-secondary)',
                  color: 'var(--color-on-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              >
                AB
              </div>
            }
            onRemove={() => alert('Remove avatar chip')}
            removable
          >
            Anna Brown
          </Chip>
        </ChipGroup>
      </div>

      {/* Disabled State */}
      <div>
        <h5>Disabled State</h5>
        <ChipGroup>
          <Chip type="assist" disabled onClick={() => {}}>
            Disabled Assist
          </Chip>
          <Chip type="filter" disabled selected={false} onSelect={() => {}}>
            Disabled Filter
          </Chip>
          <Chip type="input" disabled onRemove={() => {}} removable>
            Disabled Input
          </Chip>
          <Chip type="suggestion" disabled onClick={() => {}}>
            Disabled Suggestion
          </Chip>
        </ChipGroup>
      </div>

      {/* Different Orientations and Spacing */}
      <div>
        <h5>Chip Groups - Orientation & Spacing</h5>

        <div style={{ marginBottom: '1rem' }}>
          <h6>Vertical Layout</h6>
          <ChipGroup orientation="vertical" spacing="compact">
            <Chip type="assist" onClick={() => {}}>
              First Item
            </Chip>
            <Chip type="assist" onClick={() => {}}>
              Second Item
            </Chip>
            <Chip type="assist" onClick={() => {}}>
              Third Item
            </Chip>
          </ChipGroup>
        </div>

        <div>
          <h6>No Wrap (Scrollable)</h6>
          <ChipGroup wrap={false} spacing="comfortable">
            <Chip type="suggestion" onClick={() => {}}>
              Very Long Chip Name One
            </Chip>
            <Chip type="suggestion" onClick={() => {}}>
              Very Long Chip Name Two
            </Chip>
            <Chip type="suggestion" onClick={() => {}}>
              Very Long Chip Name Three
            </Chip>
            <Chip type="suggestion" onClick={() => {}}>
              Very Long Chip Name Four
            </Chip>
            <Chip type="suggestion" onClick={() => {}}>
              Very Long Chip Name Five
            </Chip>
            <Chip type="suggestion" onClick={() => {}}>
              Very Long Chip Name Six
            </Chip>
          </ChipGroup>
        </div>
      </div>

      {/* Usage Notes */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-variant)',
          padding: '1rem',
          borderRadius: '8px',
        }}
      >
        <h5>🏷️ Key Features</h5>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          <li>
            <strong>Four types:</strong> Input (removable), Assist (actions), Filter (selectable),
            Suggestion (display)
          </li>
          <li>
            <strong>Icon support:</strong> Leading icons, avatars, trailing remove buttons
          </li>
          <li>
            <strong>Interaction:</strong> Click, selection, removal with full keyboard navigation
          </li>
          <li>
            <strong>Accessibility:</strong> ARIA states, roles, keyboard navigation
          </li>
          <li>
            <strong>Material Design 3:</strong> Follows official MD3 specifications
          </li>
        </ul>
      </div>
    </div>
  );
}
