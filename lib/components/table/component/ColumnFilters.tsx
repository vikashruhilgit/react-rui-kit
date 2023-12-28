/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Header, RowData, Table } from '@tanstack/react-table'

// import { ChevronRightIcon } from '@heroicons/react/20/solid'

import { MultiSearch, MultiSearchItem } from './MultiSearch'
import { TabItem, Tabs } from '../../Tabs'
import { QuickFilters } from './QuickFilters'


type Props<T extends RowData> = {
  header: Header<T, unknown>
  table: Table<T>
}

const tabsData = [{
  name: "Quick",
  current: true
},
{
  name: "Multi",
  current: false
}]

export function ColumnFilters<T extends RowData>({ header, table }: Props<T>) {
  const [tabs, setTabs] = useState(tabsData);

  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(header.column.id)
  const columnFilterValue = header.column.getFilterValue();
  const uniqueValues = header.column.getFacetedUniqueValues();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(uniqueValues.keys()).sort(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uniqueValues]
  )

  const tabHandler = (item: TabItem) => {
    const updatedList = tabs.map(single => ({
      ...single,
      current: single.name === item.name ? true : false
    }));
    setTabs(updatedList);
  }

  // const isNumber = typeof firstValue === 'number' ? true : false

  const handleSelection = (item: MultiSearchItem) => {
    // console.log(item);
    // console.log(columnFilterValue);
    header.column.columnDef.filterFn = "arrIncludesSome";
    let existingFilter = columnFilterValue as string[] || [];

    if (item.isChecked) {
      header.column.setFilterValue([...existingFilter as string[], item.label]);
    } else {
      existingFilter = existingFilter.filter((single: string) => single !== item.label);
      header.column.setFilterValue([...existingFilter]);
    }
  }
  console.log(columnFilterValue);
  return <>
    <Tabs tabs={tabs}
      fullWidth={true}
      onChange={tabHandler}
    />
    <section>
      {tabs.map((single, i) => single.current ?
        <section key={i}>
          {single.name === "Quick" &&
            <QuickFilters column={header.column} table={table} />}
          {single.name === "Multi" &&
            <MultiSearch
              placeholder={`Search (${sortedUniqueValues.length})`}
              items={sortedUniqueValues.map(value => ({
                id: value,
                label: value,
                isChecked: (columnFilterValue && (columnFilterValue as string[]).includes(value)) ? true : false
              }))}
              onChange={handleSelection}
            />}
        </section>
        : null)}
    </section>
    {/* <section className='flex justify-between items-center hover:bg-gray-50'>
      <p className='p-2'>{isNumber ? "Number" : "Text"} Filter</p>
      <ChevronRightIcon
        className={`ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-300/80`}
        aria-hidden="true"
      />
    </section> */}
  </>
}
