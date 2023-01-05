import { useEffect, useMemo } from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import {
  FiChevronsRight,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronLeft,
} from 'react-icons/fi'
import { Container } from 'react-bootstrap'

export const Table = ({
  columns,
  data,
  pageCount: controlledPageCount,
  fetchData,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: useMemo(() => columns, [columns]),
      data: useMemo(() => data, [data]),
      manualPagination: true,
      pageCount: controlledPageCount,
      manualSortBy: true,
    },
    useSortBy,
    usePagination,
  )

  useEffect(() => {
    fetchData({ pageIndex: pageIndex + 1 })
  }, [fetchData, pageIndex])
  return (
    <Container fluid className="overflow-auto p-0">
      <table
        {...getTableProps()}
        className="border-separate border-spa w-100 h-100"
        style={{
          borderSpacing: '0px 7px',
        }}
      >
        <thead className="bg-[#44142d]">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="h-2rem">
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className="border border-info text-center p-3 py-2"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      className="border border-info text-center p-3 py-2"
                      style={{
                        height: '3rem',
                      }}
                      {...cell.getCellProps()}
                    >
                      <div className="d-flex align-items-center justify-content-center">
                        {cell.render('Cell')}
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <button
          className="d-flex border-0 bg-transparent"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <FiChevronsLeft size={20} />
        </button>{' '}
        <button
          className="d-flex border-0 bg-transparent"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FiChevronLeft size={20} />
        </button>{' '}
        <button
          className="d-flex border-0 bg-transparent"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FiChevronRight size={20} />
        </button>{' '}
        <button
          className="d-flex border-0 bg-transparent"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <FiChevronsRight size={20} />
        </button>{' '}
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </Container>
  )
}
