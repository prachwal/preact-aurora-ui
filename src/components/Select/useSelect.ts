import { useState, useEffect, useCallback, useMemo } from 'preact/hooks';

import type { SelectOption, SelectOptionGroup } from './types';

interface UseSelectProps {
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  options: SelectOption[];
  groups: SelectOptionGroup[];
  multiple: boolean;
  searchable: boolean;
  clearSearchOnSelect: boolean;
  open?: boolean;
  defaultOpen: boolean;
  onChange?: (value: string | number | (string | number)[]) => void;
  onOpenChange?: (open: boolean) => void;
  onSearch?: (searchValue: string) => void;
  onOptionFocus?: (option: SelectOption) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
}

export const useSelect = ({
  value,
  defaultValue,
  options,
  groups,
  multiple,
  searchable,
  clearSearchOnSelect,
  open,
  defaultOpen,
  onChange,
  onOpenChange,
  onSearch,
  onOptionFocus,
  onFocus,
  onBlur,
}: UseSelectProps) => {
  // Internal state for uncontrolled components
  const [internalValue, setInternalValue] = useState<
    string | number | (string | number)[] | undefined
  >(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [searchValue, setSearchValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Use controlled or uncontrolled value
  const currentValue = value !== undefined ? value : internalValue;
  const isOpen = open !== undefined ? open : internalOpen;

  // Flatten all options from groups and standalone options
  const allOptions = useMemo(() => {
    const groupOptions = groups.flatMap((group) => group.options);
    return [...options, ...groupOptions];
  }, [options, groups]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue.trim()) {
      return allOptions;
    }

    return allOptions.filter(
      (option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        String(option.value).toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [allOptions, searchable, searchValue]);

  // Get selected options
  const selectedOptions = useMemo(() => {
    if (!currentValue) return [];

    const values = Array.isArray(currentValue) ? currentValue : [currentValue];
    return allOptions.filter((option) => values.includes(option.value));
  }, [currentValue, allOptions]);

  // Display value for the select input
  const displayValue = useMemo(() => {
    if (selectedOptions.length === 0) return '';
    if (multiple) {
      return selectedOptions.map((opt) => opt.label).join(', ');
    }
    return selectedOptions[0]?.label || '';
  }, [selectedOptions, multiple]);

  // Handle opening/closing dropdown
  const handleToggle = useCallback(
    (forceOpen?: boolean) => {
      const newOpen = forceOpen !== undefined ? forceOpen : !isOpen;

      if (open === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);

      // Reset search when closing
      if (!newOpen && searchable) {
        setSearchValue('');
        onSearch?.('');
      }

      // Reset focused index when opening
      if (newOpen) {
        setFocusedIndex(-1);
      }
    },
    [isOpen, open, onOpenChange, searchable, onSearch],
  );

  // Handle option selection
  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;

      let newValue: string | number | (string | number)[];

      if (multiple) {
        const currentValues = Array.isArray(currentValue) ? currentValue : [];
        const isSelected = currentValues.includes(option.value);

        if (isSelected) {
          newValue = currentValues.filter((v) => v !== option.value);
        } else {
          newValue = [...currentValues, option.value];
        }
      } else {
        newValue = option.value;
        // Close dropdown for single selection
        handleToggle(false);
      }

      // Update internal state if uncontrolled
      if (value === undefined) {
        setInternalValue(newValue);
      }

      onChange?.(newValue);

      // Clear search if configured
      if (clearSearchOnSelect && searchable) {
        setSearchValue('');
        onSearch?.('');
      }
    },
    [
      multiple,
      currentValue,
      value,
      onChange,
      handleToggle,
      clearSearchOnSelect,
      searchable,
      onSearch,
    ],
  );

  // Handle search input
  const handleSearch = useCallback(
    (newSearchValue: string) => {
      setSearchValue(newSearchValue);
      onSearch?.(newSearchValue);
      setFocusedIndex(-1); // Reset focus when searching
    },
    [onSearch],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (!isOpen) {
            handleToggle(true);
          } else {
            setFocusedIndex((prev) => {
              const newIndex = Math.min(prev + 1, filteredOptions.length - 1);
              if (filteredOptions[newIndex]) {
                onOptionFocus?.(filteredOptions[newIndex]);
              }
              return newIndex;
            });
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          if (isOpen) {
            setFocusedIndex((prev) => {
              const newIndex = Math.max(prev - 1, 0);
              if (filteredOptions[newIndex]) {
                onOptionFocus?.(filteredOptions[newIndex]);
              }
              return newIndex;
            });
          }
          break;

        case 'Enter':
          event.preventDefault();
          if (isOpen && focusedIndex >= 0 && filteredOptions[focusedIndex]) {
            handleSelect(filteredOptions[focusedIndex]);
          } else if (!isOpen) {
            handleToggle(true);
          }
          break;

        case 'Escape':
          event.preventDefault();
          if (isOpen) {
            handleToggle(false);
          }
          break;

        case 'Tab':
          if (isOpen) {
            handleToggle(false);
          }
          break;

        case ' ':
          if (!searchable) {
            event.preventDefault();
            if (!isOpen) {
              handleToggle(true);
            } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
              handleSelect(filteredOptions[focusedIndex]);
            }
          }
          break;
      }
    },
    [isOpen, focusedIndex, filteredOptions, handleToggle, handleSelect, onOptionFocus, searchable],
  );

  // Handle clear selection
  const handleClear = useCallback(() => {
    const newValue = multiple ? [] : undefined;

    if (value === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue as any);
  }, [multiple, value, onChange]);

  // Handle focus events
  const handleFocus = useCallback(
    (event: FocusEvent) => {
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      // Delay blur to allow click events on dropdown
      setTimeout(() => {
        if (isOpen) {
          handleToggle(false);
        }
      }, 150);

      onBlur?.(event);
    },
    [isOpen, handleToggle, onBlur],
  );

  // Reset focused index when filtered options change
  useEffect(() => {
    if (focusedIndex >= filteredOptions.length) {
      setFocusedIndex(Math.max(0, filteredOptions.length - 1));
    }
  }, [filteredOptions.length, focusedIndex]);

  return {
    isOpen,
    selectedOptions,
    focusedIndex,
    searchValue,
    filteredOptions,
    displayValue,
    handleToggle,
    handleSelect,
    handleSearch,
    handleKeyDown,
    handleClear,
    handleFocus,
    handleBlur,
  };
};
