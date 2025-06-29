import type { ComponentChildren, JSX } from 'preact';

// Base chip props shared by all types
interface BaseChipProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onSelect'> {
  children?: ComponentChildren;
  disabled?: boolean;
  icon?: ComponentChildren;
  avatar?: ComponentChildren;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Input chip - for user input with removal
export interface InputChipProps extends BaseChipProps {
  type: 'input';
  onRemove?: () => void;
  removable?: boolean;
}

// Assist chip - for actions/suggestions
export interface AssistChipProps extends BaseChipProps {
  type: 'assist';
  onClick?: (event?: JSX.TargetedMouseEvent<HTMLDivElement>) => void;
}

// Filter chip - for filtering with selection state
export interface FilterChipProps extends BaseChipProps {
  type: 'filter';
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

// Suggestion chip - for displaying suggestions
export interface SuggestionChipProps extends BaseChipProps {
  type: 'suggestion';
  onClick?: (event?: JSX.TargetedMouseEvent<HTMLDivElement>) => void;
}

// Export the discriminated union
export type ChipProps = InputChipProps | AssistChipProps | FilterChipProps | SuggestionChipProps;

// Type guards for discriminated union
export function isInputChip(props: ChipProps): props is InputChipProps {
  return props.type === 'input';
}

export function isAssistChip(props: ChipProps): props is AssistChipProps {
  return props.type === 'assist';
}

export function isFilterChip(props: ChipProps): props is FilterChipProps {
  return props.type === 'filter';
}

export function isSuggestionChip(props: ChipProps): props is SuggestionChipProps {
  return props.type === 'suggestion';
}

// Helper functions to create type-safe chip props
export function createInputChip(props: Omit<InputChipProps, 'type'>): InputChipProps {
  return { ...props, type: 'input' };
}

export function createAssistChip(props: Omit<AssistChipProps, 'type'>): AssistChipProps {
  return { ...props, type: 'assist' };
}

export function createFilterChip(props: Omit<FilterChipProps, 'type'>): FilterChipProps {
  return { ...props, type: 'filter' };
}

export function createSuggestionChip(
  props: Omit<SuggestionChipProps, 'type'>,
): SuggestionChipProps {
  return { ...props, type: 'suggestion' };
}

// Chip group props
export interface ChipGroupProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children: ComponentChildren;
  multiSelect?: boolean;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'compact' | 'comfortable';
  wrap?: boolean;
}
