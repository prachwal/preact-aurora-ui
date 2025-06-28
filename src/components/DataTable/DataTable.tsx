import { useMemo } from 'preact/hooks';

import type { DataTableProps } from './types';
import { DataTableHeader } from './DataTableHeader';
import { DataTableBody } from './DataTableBody';
import { DataTablePagination } from './DataTablePagination';
import styles from './DataTable.module.scss';

export function DataTable({
  columns,
  data,
  loading = false,
  error = false,
  errorMessage = 'Failed to load data',
  emptyMessage = 'No data available',
  sortable = false,
  sortConfig,
  onSort,
  selectable = 'none',
  selection,
  filterable = false,
  filters,
  onFilter,
  searchable = false,
  searchValue,
  onSearch,
  pagination,
  virtualScroll = false,
  virtualScrollHeight = 400,
  stickyHeader = false,
  height,
  maxHeight,
  className = '',
  onRowClick,
  onRowDoubleClick,
  onExport,
  ...rest
}: DataTableProps) {
  const tableClasses = [
    styles.dataTable,
    stickyHeader && styles['dataTable--stickyHeader'],
    virtualScroll && styles['dataTable--virtualScroll'],
    error && styles['dataTable--error'],
    loading && styles['dataTable--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClasses = [styles.container, pagination && styles['container--withPagination']]
    .filter(Boolean)
    .join(' ');

  const tableStyle = useMemo(() => {
    const style: any = {};
    if (height) style.height = typeof height === 'number' ? `${height}px` : height;
    if (maxHeight) style.maxHeight = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
    return style;
  }, [height, maxHeight]);

  // Selection logic
  const selectedRows = selection?.selectedRows || [];
  const allSelected = useMemo(() => {
    if (data.length === 0) return false;
    return data.every((row) => selectedRows.includes(row.id));
  }, [data, selectedRows]);

  const someSelected = useMemo(() => {
    return selectedRows.length > 0 && !allSelected;
  }, [selectedRows, allSelected]);

  const handleSelectAll = (selected: boolean) => {
    if (!selection?.onSelectionChange) return;

    if (selected) {
      const allRowIds = data.map((row) => row.id);
      selection.onSelectionChange(allRowIds);
    } else {
      selection.onSelectionChange([]);
    }
  };

  const handleRowSelect = (rowId: string | number, selected: boolean) => {
    if (!selection?.onSelectionChange) return;

    if (selectable === 'single') {
      selection.onSelectionChange(selected ? [rowId] : []);
    } else if (selectable === 'multiple') {
      const newSelection = selected
        ? [...selectedRows, rowId]
        : selectedRows.filter((id) => id !== rowId);
      selection.onSelectionChange(newSelection);
    }
  };

  return (
    <div className={containerClasses} {...rest}>
      {/* Search bar */}
      {searchable && (
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue || ''}
            onChange={(e) => onSearch?.((e.target as HTMLInputElement).value)}
            className={styles.searchInput}
          />
        </div>
      )}

      {/* Export controls */}
      {onExport && (
        <div className={styles.exportContainer}>
          <button type="button" onClick={() => onExport('csv')} className={styles.exportButton}>
            Export CSV
          </button>
          <button type="button" onClick={() => onExport('json')} className={styles.exportButton}>
            Export JSON
          </button>
        </div>
      )}

      {/* Table */}
      <div className={styles.tableContainer} style={tableStyle}>
        <table className={tableClasses}>
          <DataTableHeader
            columns={columns}
            sortable={sortable}
            sortConfig={sortConfig}
            onSort={onSort}
            selectable={selectable}
            allSelected={allSelected}
            someSelected={someSelected}
            onSelectAll={handleSelectAll}
          />
          <DataTableBody
            columns={columns}
            data={data}
            loading={loading}
            error={error}
            errorMessage={errorMessage}
            emptyMessage={emptyMessage}
            selectable={selectable}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onRowClick={onRowClick}
            onRowDoubleClick={onRowDoubleClick}
            virtualScroll={virtualScroll}
            virtualScrollHeight={virtualScrollHeight}
          />
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <DataTablePagination
          page={pagination.page}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={(page) => pagination.onChange?.(page, pagination.pageSize)}
          onPageSizeChange={(pageSize) => pagination.onChange?.(pagination.page, pageSize)}
          showPageSizeSelector
          showPageInfo
        />
      )}
    </div>
  );
}
