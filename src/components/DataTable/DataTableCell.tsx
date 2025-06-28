import type { DataTableCellProps } from './types';
import styles from './DataTable.module.scss';

export function DataTableCell({ value, row, column, className = '' }: DataTableCellProps) {
  const cellClasses = [
    styles.cell,
    styles[`cell--${column.align || 'left'}`],
    styles[`cell--${column.type || 'text'}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const renderValue = () => {
    // Custom renderer takes precedence
    if (column.render) {
      return column.render(value, row, column);
    }

    // Handle different data types
    switch (column.type) {
      case 'boolean':
        return value ? '✓' : '✗';

      case 'date':
        if (value instanceof Date) {
          return value.toLocaleDateString();
        }
        if (typeof value === 'string' || typeof value === 'number') {
          const date = new Date(value);
          return isNaN(date.getTime()) ? value : date.toLocaleDateString();
        }
        return value;

      case 'number':
        if (typeof value === 'number') {
          return value.toLocaleString();
        }
        return value;

      default:
        // Handle null/undefined
        if (value == null) {
          return '—';
        }
        return String(value);
    }
  };

  return (
    <td
      className={cellClasses}
      style={{
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
      }}
      title={typeof value === 'string' ? value : undefined}
    >
      <div className={styles.cellContent}>{renderValue()}</div>
    </td>
  );
}
