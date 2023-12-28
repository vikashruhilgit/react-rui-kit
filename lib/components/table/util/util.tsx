import { ColumnDef, FilterFn, SortingFn, sortingFns } from "@tanstack/react-table";
import IndeterminateCheckbox from "../component/InderterminateCheckbox";
import { RankingInfo, compareItems, rankItem } from "@tanstack/match-sorter-utils";

export const addIndeterminateCheckbox = <T,>(columns: ColumnDef<T>[], label: string = "select") => {
  return [
    {
      id: label,
      header: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <div>
          <IndeterminateCheckbox
            checked={row.getIsSelected()}
            indeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </div>
      ),
    },
    ...columns
  ] as ColumnDef<T>[]
}

export const shuffle = <T,>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {

    // Generate random number 
    const j = Math.floor(Math.random() * (i + 1));

    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

export const getFilterFn = <T,>(): FilterFn<T> => {
  return (
    row,
    columnId,
    value,
    addMeta
  ) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the ranking info
    addMeta(itemRank)

    // Return if the item should be filtered in/out
    return itemRank.passed
  }
}

export const getSortingFn = <T,>(): SortingFn<T> => {
  return (rowA, rowB, columnId) => {
    let dir = 0

    // Only sort by rank if the column has ranking information
    if (rowA.columnFiltersMeta[columnId]) {
      dir = compareItems(
        rowA.columnFiltersMeta[columnId]! as RankingInfo,
        rowB.columnFiltersMeta[columnId]! as RankingInfo
      )
    }

    // Provide an alphanumeric fallback for when the item ranks are equal
    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
  }
}