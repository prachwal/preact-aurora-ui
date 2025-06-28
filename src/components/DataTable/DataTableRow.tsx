import type { DataTableRowProps } from './types';
import { DataTableCell } from './DataTableCell';
import styles from './DataTable.module.scss';

export function DataTableRow({
  row,
  index,
  columns,
  selected = false,
  selectable = 'none',
  onSelect,
  onClick,
  onDoubleClick,
}: DataTableRowProps) {
  const rowClasses = [
    styles.row,
    selected && styles['row--selected'],
    onClick && styles['row--clickable'],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr
      className={rowClasses}
      onClick={onClick}
      onDblClick={onDoubleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick();
            }
          }
          : undefined
      }
    >
      {/* Selection column */}
      {selectable !== 'none' && (
        <td className={styles.cell}>
          <input
            type={selectable === 'single' ? 'radio' : 'checkbox'}
            checked={selected}
            onChange={(e) => onSelect?.((e.target as HTMLInputElement).checked)}
            className={styles.checkbox}
            aria-label={`Select row ${index + 1}`}
            name={selectable === 'single' ? 'table-selection' : undefined}
          />
        </td>
      )}

      {/* Data columns */}
      {columns.map((column) => (
        <DataTableCell
          key={column.id}
          value={row[column.field]}
          row={row}
          column={column}
          className={styles.cell}
        />
      ))}
    </tr>
  );
}
