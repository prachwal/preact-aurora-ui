import type { OptionProps } from './types';
import styles from './Select.module.scss';

export const Option = ({
  option,
  selected = false,
  focused = false,
  multiple = false,
  render,
  onClick,
  className,
}: OptionProps) => {
  const handleClick = () => {
    if (!option.disabled) {
      onClick?.();
    }
  };

  const optionClasses = [
    styles.option,
    selected && styles['option--selected'],
    focused && styles['option--focused'],
    option.disabled && styles['option--disabled'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = render ? render(option) : option.label;

  return (
    <div
      className={optionClasses}
      onClick={handleClick}
      role="option"
      aria-selected={selected}
      aria-disabled={option.disabled}
      data-value={option.value}
    >
      {multiple && (
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            checked={selected}
            onChange={() => { }} // Handled by parent onClick
            tabIndex={-1}
            aria-hidden="true"
          />
        </div>
      )}
      <div className={styles.optionContent}>{content}</div>
    </div>
  );
};
