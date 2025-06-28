import type { ComponentChildren } from 'preact';

export interface SelectOption {
  /** Unique value for the option */
  value: string | number;
  /** Display label for the option */
  label: string;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Additional data associated with the option */
  data?: any;
}

export interface SelectOptionGroup {
  /** Group label */
  label: string;
  /** Options in this group */
  options: SelectOption[];
  /** Whether the entire group is disabled */
  disabled?: boolean;
}

export type SelectVariant = 'filled' | 'outlined';
export type SelectSize = 'small' | 'medium' | 'large';

export interface SelectProps {
  /** Current selected value(s) */
  value?: string | number | (string | number)[];
  /** Default value for uncontrolled component */
  defaultValue?: string | number | (string | number)[];
  /** Options to display */
  options?: SelectOption[];
  /** Grouped options */
  groups?: SelectOptionGroup[];
  /** Label text */
  label?: string;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Helper text below the select */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Visual variant */
  variant?: SelectVariant;
  /** Size variant */
  size?: SelectSize;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** Whether multiple values can be selected */
  multiple?: boolean;
  /** Whether options can be searched */
  searchable?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Whether to clear search on selection */
  clearSearchOnSelect?: boolean;
  /** Maximum height of dropdown */
  maxDropdownHeight?: number;
  /** Whether dropdown is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Custom render function for options */
  renderOption?: (option: SelectOption) => ComponentChildren;
  /** Custom render function for selected value */
  renderValue?: (
    value: string | number | (string | number)[],
    options: SelectOption[],
  ) => ComponentChildren;
  /** Custom render function for empty state */
  renderEmpty?: () => ComponentChildren;
  /** Custom render function for loading state */
  renderLoading?: () => ComponentChildren;
  /** Whether options are loading */
  loading?: boolean;
  /** Whether to show clear button */
  clearable?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Inline styles */
  style?: Record<string, any>;
  /** Test ID for testing */
  testId?: string;

  // Event handlers
  /** Called when value changes */
  onChange?: (value: string | number | (string | number)[]) => void;
  /** Called when dropdown opens/closes */
  onOpenChange?: (open: boolean) => void;
  /** Called when search value changes */
  onSearch?: (searchValue: string) => void;
  /** Called when option is focused */
  onOptionFocus?: (option: SelectOption) => void;
  /** Called when select gains focus */
  onFocus?: (event: FocusEvent) => void;
  /** Called when select loses focus */
  onBlur?: (event: FocusEvent) => void;
  /** Called on keydown */
  onKeyDown?: (event: KeyboardEvent) => void;
}

export interface SelectRef {
  /** Focus the select */
  focus: () => void;
  /** Blur the select */
  blur: () => void;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Clear the selection */
  clear: () => void;
  /** Get current value */
  getValue: () => string | number | (string | number)[] | undefined;
}

export interface OptionProps {
  /** Option data */
  option: SelectOption;
  /** Whether this option is selected */
  selected?: boolean;
  /** Whether this option is focused */
  focused?: boolean;
  /** Whether multiple selection is enabled */
  multiple?: boolean;
  /** Custom render function */
  render?: (option: SelectOption) => ComponentChildren;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

export interface OptionGroupProps {
  /** Group data */
  group: SelectOptionGroup;
  /** Currently selected values */
  selectedValues?: (string | number)[];
  /** Currently focused option value */
  focusedValue?: string | number;
  /** Whether multiple selection is enabled */
  multiple?: boolean;
  /** Custom render function for options */
  renderOption?: (option: SelectOption) => ComponentChildren;
  /** Option click handler */
  onOptionClick?: (option: SelectOption) => void;
  /** Additional CSS class */
  className?: string;
}
