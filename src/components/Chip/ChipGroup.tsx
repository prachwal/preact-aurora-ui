import { forwardRef } from 'preact/compat';

import type { ChipGroupProps } from './types';
import styles from './Chip.module.scss';

export const ChipGroup = forwardRef<HTMLDivElement, ChipGroupProps>(
  (
    {
      children,
      className,
      style,
      multiSelect: _multiSelect = false,
      orientation = 'horizontal',
      spacing = 'comfortable',
      wrap = true,
      ...rest
    },
    ref,
  ) => {
    const groupClasses = [
      styles.chipGroup,
      orientation === 'vertical' ? styles.vertical : '',
      !wrap ? styles.noWrap : '',
      styles[spacing],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        {...rest}
        ref={ref}
        className={groupClasses}
        style={style}
        role="group"
        aria-label="Chip group"
      >
        {children}
      </div>
    );
  },
);

ChipGroup.displayName = 'ChipGroup';
