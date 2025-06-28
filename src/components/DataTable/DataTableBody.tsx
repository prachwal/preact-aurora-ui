import type { DataTableBodyProps } from './types';
import { DataTableRow } from './DataTableRow';
import styles from './DataTable.module.scss';

export function DataTableBody({
  columns,
  data,
  loading = false,
  error = false,
  errorMessage = 'Failed to load data',
  emptyMessage = 'No data available',
  selectable = 'none',
  selectedRows = [],
  onRowSelect,
  onRowClick,
  onRowDoubleClick,
  virtualScroll = false,
  virtualScrollHeight = 400,
}: DataTableBodyProps) {
  if (loading) {
    return (
      <tbody className={styles.body}>
        <tr className={styles.statusRow}>
          <td
            colSpan={columns.length + (selectable !== 'none' ? 1 : 0)}
            className={styles.statusCell}
          >
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <span>Loading...</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (error) {
    return (
      <tbody className={styles.body}>
        <tr className={styles.statusRow}>
          <td
            colSpan={columns.length + (selectable !== 'none' ? 1 : 0)}
            className={styles.statusCell}
          >
            <div className={styles.errorState}>
              <span className={styles.errorIcon}>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody className={styles.body}>
        <tr className={styles.statusRow}>
          <td
            colSpan={columns.length + (selectable !== 'none' ? 1 : 0)}
            className={styles.statusCell}
          >
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📭</span>
              <span>{emptyMessage}</span>
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  const bodyClasses = [styles.body, virtualScroll && styles['body--virtualScroll']]
    .filter(Boolean)
    .join(' ');

  const bodyStyle = virtualScroll
    ? { height: `${virtualScrollHeight}px`, overflowY: 'auto' as const }
    : undefined;

  return (
    <tbody className={bodyClasses} style={bodyStyle}>
      {data.map((row, index) => (
        <DataTableRow
          key={row.id}
          row={row}
          index={index}
          columns={columns}
          selected={selectedRows.includes(row.id)}
          selectable={selectable}
          onSelect={(selected) => onRowSelect?.(row.id, selected)}
          onClick={onRowClick ? () => onRowClick(row, index) : undefined}
          onDoubleClick={onRowDoubleClick ? () => onRowDoubleClick(row, index) : undefined}
        />
      ))}
    </tbody>
  );
}
