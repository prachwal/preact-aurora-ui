import type { DataTableHeaderProps, SortDirection } from './types';
import styles from './DataTable.module.scss';

export function DataTableHeader({
  columns,
  sortable = false,
  sortConfig,
  onSort,
  selectable = 'none',
  allSelected = false,
  someSelected = false,
  onSelectAll,
}: DataTableHeaderProps) {
  const handleSort = (field: string) => {
    if (!sortable || !onSort) return;

    let direction: SortDirection = 'asc';

    if (sortConfig?.field === field) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }

    onSort({ field, direction });
  };

  const getSortIcon = (field: string) => {
    if (!sortConfig || sortConfig.field !== field) {
      return '↕️'; // Neutral sort icon
    }

    if (sortConfig.direction === 'asc') {
      return '↑'; // Ascending
    } else if (sortConfig.direction === 'desc') {
      return '↓'; // Descending
    }

    return '↕️';
  };

  return (
    <thead className={styles.header}>
      <tr className={styles.headerRow}>
        {/* Selection column */}
        {selectable !== 'none' && (
          <th className={styles.headerCell}>
            {selectable === 'multiple' && (
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected && !allSelected;
                  }
                }}
                onChange={(e) => onSelectAll?.((e.target as HTMLInputElement).checked)}
                className={styles.checkbox}
                aria-label="Select all rows"
              />
            )}
          </th>
        )}

        {/* Data columns */}
        {columns.map((column) => {
          const cellClasses = [
            styles.headerCell,
            styles[`headerCell--${column.align || 'left'}`],
            sortable && column.sortable !== false && styles['headerCell--sortable'],
            sortConfig?.field === column.field && styles['headerCell--sorted'],
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <th
              key={column.id}
              className={cellClasses}
              style={{
                width: column.width,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
              onClick={
                sortable && column.sortable !== false ? () => handleSort(column.field) : undefined
              }
              role={sortable && column.sortable !== false ? 'button' : undefined}
              tabIndex={sortable && column.sortable !== false ? 0 : undefined}
              onKeyDown={
                sortable && column.sortable !== false
                  ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSort(column.field);
                    }
                  }
                  : undefined
              }
              aria-sort={
                sortConfig?.field === column.field
                  ? sortConfig.direction === 'asc'
                    ? 'ascending'
                    : sortConfig.direction === 'desc'
                      ? 'descending'
                      : 'none'
                  : undefined
              }
            >
              <div className={styles.headerContent}>
                <span className={styles.headerLabel}>{column.label}</span>
                {sortable && column.sortable !== false && (
                  <span className={styles.sortIcon} aria-hidden="true">
                    {getSortIcon(column.field)}
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
