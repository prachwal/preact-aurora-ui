import { useState, useMemo, useCallback } from 'preact/hooks';

import type {
  SortConfig,
  FilterConfig,
  UseDataTableOptions,
  UseDataTableReturn,
  SortDirection,
} from './types';

export function useDataTable({
  data,
  columns,
  sortable = false,
  initialSort,
  filterable = false,
  searchable = false,
  pagination = false,
  initialPageSize = 10,
  selectable = 'none',
}: UseDataTableOptions): UseDataTableReturn {
  // Sort state
  const [sortConfig, setSortConfig] = useState<SortConfig | undefined>(initialSort);

  // Filter state
  const [filters, setFilters] = useState<FilterConfig[]>([]);

  // Search state
  const [searchValue, setSearchValue] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Selection state
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);

  // Sort handler
  const handleSort = useCallback(
    (field: string) => {
      if (!sortable) return;

      setSortConfig((prevSort) => {
        let direction: SortDirection = 'asc';

        if (prevSort?.field === field) {
          if (prevSort.direction === 'asc') {
            direction = 'desc';
          } else if (prevSort.direction === 'desc') {
            direction = null;
          }
        }

        return direction ? { field, direction } : undefined;
      });

      // Reset to first page when sorting
      setCurrentPage(1);
    },
    [sortable],
  );

  // Filter handler
  const handleFilter = useCallback(
    (field: string, value: any, operator: FilterConfig['operator'] = 'contains') => {
      if (!filterable) return;

      setFilters((prevFilters) => {
        const existingFilterIndex = prevFilters.findIndex((f) => f.field === field);

        if (value === '' || value == null) {
          // Remove filter if value is empty
          return prevFilters.filter((f) => f.field !== field);
        }

        const newFilter: FilterConfig = { field, value, operator };

        if (existingFilterIndex >= 0) {
          // Update existing filter
          const newFilters = [...prevFilters];
          newFilters[existingFilterIndex] = newFilter;
          return newFilters;
        } else {
          // Add new filter
          return [...prevFilters, newFilter];
        }
      });

      // Reset to first page when filtering
      setCurrentPage(1);
    },
    [filterable],
  );

  // Search handler
  const handleSearch = useCallback(
    (value: string) => {
      if (!searchable) return;

      setSearchValue(value);
      setCurrentPage(1); // Reset to first page when searching
    },
    [searchable],
  );

  // Process data (filter, search, sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (searchable && searchValue.trim()) {
      const searchTerm = searchValue.toLowerCase().trim();
      result = result.filter((row) =>
        columns.some((column) => {
          const value = row[column.field];
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchTerm);
        }),
      );
    }

    // Apply filters
    if (filterable && filters.length > 0) {
      result = result.filter((row) =>
        filters.every((filter) => {
          const value = row[filter.field];
          const filterValue = filter.value;

          if (value == null) return false;

          const stringValue = String(value).toLowerCase();
          const stringFilterValue = String(filterValue).toLowerCase();

          switch (filter.operator) {
            case 'equals':
              return stringValue === stringFilterValue;
            case 'contains':
              return stringValue.includes(stringFilterValue);
            case 'startsWith':
              return stringValue.startsWith(stringFilterValue);
            case 'endsWith':
              return stringValue.endsWith(stringFilterValue);
            case 'gt':
              return Number(value) > Number(filterValue);
            case 'lt':
              return Number(value) < Number(filterValue);
            case 'gte':
              return Number(value) >= Number(filterValue);
            case 'lte':
              return Number(value) <= Number(filterValue);
            default:
              return stringValue.includes(stringFilterValue);
          }
        }),
      );
    }

    // Apply sorting
    if (sortable && sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.field];
        const bValue = b[sortConfig.field];

        // Handle null/undefined values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        // Get column for type-specific sorting
        const column = columns.find((c) => c.field === sortConfig.field);
        const columnType = column?.type || 'text';

        let comparison = 0;

        switch (columnType) {
          case 'number':
            comparison = Number(aValue) - Number(bValue);
            break;
          case 'date':
            const dateA = new Date(aValue);
            const dateB = new Date(bValue);
            comparison = dateA.getTime() - dateB.getTime();
            break;
          case 'boolean':
            comparison = Number(aValue) - Number(bValue);
            break;
          default:
            comparison = String(aValue).localeCompare(String(bValue));
        }

        return sortConfig.direction === 'desc' ? -comparison : comparison;
      });
    }

    return result;
  }, [data, columns, searchable, searchValue, filterable, filters, sortable, sortConfig]);

  // Paginated data
  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, pagination, currentPage, pageSize]);

  // Pagination handlers
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page
  }, []);

  // Selection handlers
  const handleSelection = useCallback(
    (rowId: string | number, selected: boolean) => {
      if (selectable === 'none') return;

      setSelectedRows((prevSelected) => {
        if (selectable === 'single') {
          return selected ? [rowId] : [];
        } else {
          return selected ? [...prevSelected, rowId] : prevSelected.filter((id) => id !== rowId);
        }
      });
    },
    [selectable],
  );

  const handleSelectAll = useCallback(
    (selected: boolean) => {
      if (selectable !== 'multiple') return;

      if (selected) {
        const visibleRowIds = (pagination ? paginatedData : processedData).map((row) => row.id);
        setSelectedRows(visibleRowIds);
      } else {
        setSelectedRows([]);
      }
    },
    [selectable, pagination, paginatedData, processedData],
  );

  // Selection state calculations
  const allSelected = useMemo(() => {
    const visibleData = pagination ? paginatedData : processedData;
    if (visibleData.length === 0) return false;
    return visibleData.every((row) => selectedRows.includes(row.id));
  }, [pagination, paginatedData, processedData, selectedRows]);

  const someSelected = useMemo(() => {
    return selectedRows.length > 0 && !allSelected;
  }, [selectedRows, allSelected]);

  return {
    processedData: pagination ? paginatedData : processedData,
    sortConfig,
    handleSort,
    filters,
    handleFilter,
    searchValue,
    handleSearch,
    currentPage,
    pageSize,
    totalRows: processedData.length,
    handlePageChange,
    handlePageSizeChange,
    selectedRows,
    handleSelection,
    handleSelectAll,
    allSelected,
    someSelected,
  };
}
