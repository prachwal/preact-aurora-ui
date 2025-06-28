import { useMemo } from 'preact/hooks';

import type { DataTablePaginationProps } from './types';
import styles from './DataTable.module.scss';

export function DataTablePagination({
  page,
  pageSize,
  total,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = true,
  showPageInfo = true,
}: DataTablePaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const startRow = (page - 1) * pageSize + 1;
  const endRow = Math.min(page * pageSize, total);

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let start = Math.max(1, page - 2);
      let end = Math.min(totalPages, page + 2);

      if (page <= 3) {
        end = maxVisiblePages;
      } else if (page >= totalPages - 2) {
        start = totalPages - maxVisiblePages + 1;
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }, [page, totalPages]);

  const handlePageSizeChange = (newPageSize: number) => {
    const newTotalPages = Math.ceil(total / newPageSize);
    const newPage = Math.min(page, newTotalPages);
    onPageSizeChange(newPageSize);
    if (newPage !== page) {
      onPageChange(newPage);
    }
  };

  if (total === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      {showPageInfo && (
        <div className={styles.paginationInfo}>
          Showing {startRow.toLocaleString()} to {endRow.toLocaleString()} of{' '}
          {total.toLocaleString()} entries
        </div>
      )}

      <div className={styles.paginationControls}>
        {showPageSizeSelector && (
          <div className={styles.pageSizeSelector}>
            <label htmlFor="page-size-select">Rows per page:</label>
            <select
              id="page-size-select"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number((e.target as HTMLSelectElement).value))}
              className={styles.pageSelect}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.paginationControls}>
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={!canGoPrevious}
            className={styles.paginationButton}
            aria-label="Go to first page"
          >
            ⟪
          </button>

          <button
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={!canGoPrevious}
            className={styles.paginationButton}
            aria-label="Go to previous page"
          >
            ⟨
          </button>

          {pageNumbers[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => onPageChange(1)}
                className={styles.paginationButton}
              >
                1
              </button>
              {pageNumbers[0] > 2 && <span>...</span>}
            </>
          )}

          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`${styles.paginationButton} ${pageNum === page ? styles['paginationButton--active'] : ''}`}
              aria-current={pageNum === page ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span>...</span>}
              <button
                type="button"
                onClick={() => onPageChange(totalPages)}
                className={styles.paginationButton}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={!canGoNext}
            className={styles.paginationButton}
            aria-label="Go to next page"
          >
            ⟩
          </button>

          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={!canGoNext}
            className={styles.paginationButton}
            aria-label="Go to last page"
          >
            ⟫
          </button>
        </div>
      </div>
    </div>
  );
}
