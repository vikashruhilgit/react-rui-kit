import {
  flexRender,
  HeaderGroup,
  Row,
  RowData,
  Table,
} from '@tanstack/react-table'
import Pagination from './Pagination'
import Filter from './Filter'
// import TablePins from './TablePins'

type TableGroup = 'center' | 'left' | 'right'

function getTableHeaderGroups<T extends RowData>(
  table: Table<T>,
  tg?: TableGroup
): [HeaderGroup<T>[], HeaderGroup<T>[]] {
  if (tg === 'left') {
    return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()]
  }

  if (tg === 'right') {
    return [table.getRightHeaderGroups(), table.getRightFooterGroups()]
  }

  if (tg === 'center') {
    return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()]
  }

  return [table.getHeaderGroups(), table.getFooterGroups()]
}

function getRowGroup<T extends RowData>(row: Row<T>, tg?: TableGroup) {
  if (tg === 'left') return row.getLeftVisibleCells()
  if (tg === 'right') return row.getRightVisibleCells()
  if (tg === 'center') return row.getCenterVisibleCells()
  return row.getVisibleCells()
}

type Props<T extends RowData> = {
  table: Table<T>
  tableGroup?: TableGroup
}

export function CustomTable<T extends RowData>({
  table,
  tableGroup,
}: Props<T>) {
  const [headerGroups] = getTableHeaderGroups(table, tableGroup);
  const headerDepth = headerGroups.length;
  console.log("headerGroups", headerGroups);
  console.log("headerDepth", headerDepth);

  return (
    <section className='border border-slate-200 rounded-md divide-y divide-gray-100 max-w-full overflow-x-scroll'>
      <table className='w-full border-none text-slate-800 text-sm'>
        <thead className="divide-y divide-gray-200 bg-slate-50">
          {headerGroups.map(headerGroup => (
            <tr className='' key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  className="py-1.5 px-2.5 font-medium truncate relative "
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div className=''>
                        {/* {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                        <button
                          onClick={header.column.getToggleGroupingHandler()}
                          style={{
                            cursor: 'pointer',
                          }}
                        >
                          {header.column.getIsGrouped()
                            ? `🛑(${header.column.getGroupedIndex()})`
                            : `👊`}
                        </button>
                      ) : null}{' '} */}
                        <section onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : () => null} className={`${header.column.getCanSort() ? 'cursor-pointer select-none'
                          : ''} flex ${headerDepth === header.depth ? "justify-start" : "justify-center"}`}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}{' '}
                          <button className='w-5'
                          >
                            {{
                              asc: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-5">
                                <path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd" />
                              </svg>

                              ,
                              desc: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-5">
                                <path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd" />
                              </svg>

                              ,
                            }[header.column.getIsSorted() as string] ?? ' '}
                          </button>
                        </section>
                      </div>
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                    </>
                  )}
                  <section
                    className="absolute right-0 top-0 h-full select-none touch-non cursor-col-resize flex"
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                  >
                    <section className='bg-gray-200 w-0.5 hover:w-0.75 hover:bg-gray-500 h-2/5 self-center'></section>
                  </section>
                  {/* {!header.isPlaceholder && header.column.getCanPin() && (
                  <TablePins
                    isPinned={header.column.getIsPinned()}
                    pin={header.column.pin}
                  />
                )} */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {getRowGroup(row, tableGroup).map(cell => (
                <td
                  key={cell.id}
                  style={{
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={1000}>
              <Pagination
                hasNextPage={table.getCanNextPage()}
                hasPreviousPage={table.getCanPreviousPage()}
                nextPage={table.nextPage}
                pageCount={table.getPageCount()}
                pageIndex={table.getState().pagination.pageIndex}
                pageSize={table.getState().pagination.pageSize}
                previousPage={table.previousPage}
                setPageIndex={table.setPageIndex}
                setPageSize={table.setPageSize}
                totalRows={table.getPrePaginationRowModel().rows.length}
              />
            </th>
          </tr>

        </tfoot>
        {/* <tfoot>
        {footerGroup.map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
      </table>
    </section>
  )
}

export default CustomTable
