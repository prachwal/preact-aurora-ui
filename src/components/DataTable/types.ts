import type { ComponentChildren } from 'preact';

export type SortDirection = 'asc' | 'desc' | null;
export type SelectionMode = 'none' | 'single' | 'multiple';
export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'custom';
export type ColumnAlign = 'left' | 'center' | 'right';

export interface Column {
  /** Unique column identifier */
  id: string;
  /** Column display label */
  label: string;
  /** Field name in row data */
  field: string;
  /** Column data type */
  type?: ColumnType;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Whether column is filterable */
  filterable?: boolean;
  /** Column width */
  width?: number | string;
  /** Minimum column width */
  minWidth?: number;
  /** Maximum column width */
  maxWidth?: number;
  /** Text alignment */
  align?: ColumnAlign;
  /** Custom cell renderer */
  render?: (value: any, row: RowData, column: Column) => ComponentChildren;
}

export interface RowData {
  /** Unique row identifier */
  id: string | number;
  /** Row data fields */
  [key: string]: any;
}

export interface SortConfig {
  /** Column field to sort by */
  field: string;
  /** Sort direction */
  direction: SortDirection;
}

export interface FilterConfig {
  /** Column field to filter */
  field: string;
  /** Filter value */
  value: any;
  /** Filter operator */
  operator?: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'gt' | 'lt' | 'gte' | 'lte';
}

export interface PaginationConfig {
  /** Current page (1-based) */
  page: number;
  /** Number of rows per page */
  pageSize: number;
  /** Total number of rows */
  total: number;
  /** Page change handler */
  onChange?: (page: number, pageSize: number) => void;
}

export interface SelectionConfig {
  /** Currently selected row IDs */
  selectedRows: (string | number)[];
  /** Selection change handler */
  onSelectionChange: (selectedRows: (string | number)[]) => void;
}

export interface DataTableProps {
  /** Table columns definition */
  columns: Column[];
  /** Table row data */
  data: RowData[];
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Empty state message */
  emptyMessage?: string;
  /** Enable column sorting */
  sortable?: boolean;
  /** Current sort configuration */
  sortConfig?: SortConfig;
  /** Sort change handler */
  onSort?: (sortConfig: SortConfig) => void;
  /** Enable row selection */
  selectable?: SelectionMode;
  /** Selection configuration */
  selection?: SelectionConfig;
  /** Enable column filtering */
  filterable?: boolean;
  /** Current filter configuration */
  filters?: FilterConfig[];
  /** Filter change handler */
  onFilter?: (filters: FilterConfig[]) => void;
  /** Enable global search */
  searchable?: boolean;
  /** Current search value */
  searchValue?: string;
  /** Search change handler */
  onSearch?: (searchValue: string) => void;
  /** Enable pagination */
  pagination?: PaginationConfig;
  /** Enable virtual scrolling */
  virtualScroll?: boolean;
  /** Virtual scroll height */
  virtualScrollHeight?: number;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Table height */
  height?: number | string;
  /** Table max height */
  maxHeight?: number | string;
  /** Custom CSS class */
  className?: string;
  /** Row click handler */
  onRowClick?: (row: RowData, index: number) => void;
  /** Row double click handler */
  onRowDoubleClick?: (row: RowData, index: number) => void;
  /** Export handler */
  onExport?: (format: 'csv' | 'json') => void;
  /** Additional props */
  [key: string]: unknown;
}

export interface DataTableHeaderProps {
  /** Table columns */
  columns: Column[];
  /** Enable sorting */
  sortable?: boolean;
  /** Current sort configuration */
  sortConfig?: SortConfig;
  /** Sort change handler */
  onSort?: (sortConfig: SortConfig) => void;
  /** Enable selection */
  selectable?: SelectionMode;
  /** All rows selected state */
  allSelected?: boolean;
  /** Some rows selected state */
  someSelected?: boolean;
  /** Select all handler */
  onSelectAll?: (selected: boolean) => void;
}

export interface DataTableBodyProps {
  /** Table columns */
  columns: Column[];
  /** Table data */
  data: RowData[];
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Empty message */
  emptyMessage?: string;
  /** Enable selection */
  selectable?: SelectionMode;
  /** Selected row IDs */
  selectedRows?: (string | number)[];
  /** Row selection handler */
  onRowSelect?: (rowId: string | number, selected: boolean) => void;
  /** Row click handler */
  onRowClick?: (row: RowData, index: number) => void;
  /** Row double click handler */
  onRowDoubleClick?: (row: RowData, index: number) => void;
  /** Virtual scroll enabled */
  virtualScroll?: boolean;
  /** Virtual scroll height */
  virtualScrollHeight?: number;
}

export interface DataTableRowProps {
  /** Row data */
  row: RowData;
  /** Row index */
  index: number;
  /** Table columns */
  columns: Column[];
  /** Row selected state */
  selected?: boolean;
  /** Enable selection */
  selectable?: SelectionMode;
  /** Row selection handler */
  onSelect?: (selected: boolean) => void;
  /** Row click handler */
  onClick?: () => void;
  /** Row double click handler */
  onDoubleClick?: () => void;
}

export interface DataTableCellProps {
  /** Cell value */
  value: any;
  /** Row data */
  row: RowData;
  /** Column definition */
  column: Column;
  /** Custom CSS class */
  className?: string;
}

export interface DataTablePaginationProps {
  /** Current page */
  page: number;
  /** Page size */
  pageSize: number;
  /** Total rows */
  total: number;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Page size change handler */
  onPageSizeChange: (pageSize: number) => void;
  /** Show page size selector */
  showPageSizeSelector?: boolean;
  /** Show page info */
  showPageInfo?: boolean;
}

export interface UseDataTableOptions {
  /** Initial data */
  data: RowData[];
  /** Table columns */
  columns: Column[];
  /** Enable sorting */
  sortable?: boolean;
  /** Initial sort config */
  initialSort?: SortConfig;
  /** Enable filtering */
  filterable?: boolean;
  /** Enable search */
  searchable?: boolean;
  /** Enable pagination */
  pagination?: boolean;
  /** Initial page size */
  initialPageSize?: number;
  /** Enable selection */
  selectable?: SelectionMode;
}

export interface UseDataTableReturn {
  /** Processed data */
  processedData: RowData[];
  /** Current sort config */
  sortConfig: SortConfig | undefined;
  /** Sort handler */
  handleSort: (field: string) => void;
  /** Current filters */
  filters: FilterConfig[];
  /** Filter handler */
  handleFilter: (field: string, value: any, operator?: FilterConfig['operator']) => void;
  /** Current search value */
  searchValue: string;
  /** Search handler */
  handleSearch: (value: string) => void;
  /** Current page */
  currentPage: number;
  /** Page size */
  pageSize: number;
  /** Total rows */
  totalRows: number;
  /** Page change handler */
  handlePageChange: (page: number) => void;
  /** Page size change handler */
  handlePageSizeChange: (size: number) => void;
  /** Selected rows */
  selectedRows: (string | number)[];
  /** Selection handler */
  handleSelection: (rowId: string | number, selected: boolean) => void;
  /** Select all handler */
  handleSelectAll: (selected: boolean) => void;
  /** All selected state */
  allSelected: boolean;
  /** Some selected state */
  someSelected: boolean;
}
