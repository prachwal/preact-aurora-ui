import { useState, useCallback, useId } from 'preact/hooks';

import type { UseRadioGroupReturn } from './types';

interface UseRadioGroupProps {
  value?: string;
  defaultValue?: string;
  name?: string;
  onChange?: (value: string, event: Event & { currentTarget: HTMLInputElement }) => void;
}

export function useRadioGroup({
  value: controlledValue,
  defaultValue,
  name: providedName,
  onChange,
}: UseRadioGroupProps = {}): UseRadioGroupReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const generatedName = useId();

  // Use provided name or generate one
  const name = providedName || `radio-group-${generatedName}`;

  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const getRadioProps = useCallback(
    (radioValue: string) => ({
      name,
      checked: value === radioValue,
      onChange: (event: Event & { currentTarget: HTMLInputElement }) => {
        if (!isControlled) {
          setInternalValue(radioValue);
        }
        onChange?.(radioValue, event);
      },
    }),
    [value, name, isControlled, onChange],
  );

  return {
    value,
    getRadioProps,
  };
}
