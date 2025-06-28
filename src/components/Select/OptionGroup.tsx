import { Option } from './Option';
import type { OptionGroupProps } from './types';
import styles from './Select.module.scss';

export const OptionGroup = ({
  group,
  selectedValues = [],
  focusedValue,
  multiple = false,
  renderOption,
  onOptionClick,
  className,
}: OptionGroupProps) => {
  const groupClasses = [styles.optionGroup, className].filter(Boolean).join(' ');

  return (
    <div className={groupClasses}>
      <div className={styles.optionGroupLabel}>{group.label}</div>
      <div className={styles.optionGroupOptions}>
        {group.options.map((option) => (
          <Option
            key={option.value}
            option={option}
            selected={selectedValues.includes(option.value)}
            focused={option.value === focusedValue}
            multiple={multiple}
            render={renderOption}
            onClick={() => onOptionClick?.(option)}
            className={styles.option}
          />
        ))}
      </div>
    </div>
  );
};
