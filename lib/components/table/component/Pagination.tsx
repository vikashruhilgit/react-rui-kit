import { Select } from "../../Select"

type Props = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  pageCount: number
  pageIndex: number
  pageSize: number
  previousPage: () => void
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void
  totalRows: number
}

export function Pagination({
  hasNextPage,
  hasPreviousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  setPageIndex,
  setPageSize,
  totalRows,
}: Props) {
  return (
    <section className="flex items-center justify-between p-2 font-medium text-sm">
      <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => setPageIndex(0)}
          disabled={!hasPreviousPage}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => previousPage()}
          disabled={!hasPreviousPage}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => nextPage()}
          disabled={!hasNextPage}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={!hasNextPage}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <Select
          selectedIndex={[10, 20, 30, 40, 50].indexOf(pageSize)}
          onChange={e => {
            console.log(e);
            setPageSize(Number(e.name))
          }}
          items={[10, 20, 30, 40, 50].map((item, i) => ({
            id: i,
            name: item.toString()
          }))}
        />
      </div>
      <div className="text-sm">Total Rows: {totalRows}</div>
    </section>
  )
}

export default Pagination;
