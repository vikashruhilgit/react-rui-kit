import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react";
import { Table } from "@tanstack/react-table";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import DebouncedInput from "./DebouncedInput"
import { Checkbox } from "../../Checkbox";
import { Button } from "../../Button";

import { shuffle } from "../util/util";

interface TableActionProps<T> {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  table: Table<T>;
}

export const TableAction = <T,>({
  globalFilter,
  setGlobalFilter,
  table,
}: TableActionProps<T>) => {

  const randomizeColumns = () => {
    table.setColumnOrder(
      shuffle(table.getAllLeafColumns().map(d => d.id))
    )
  }

  return <div className="p-2 flex items-center gap-4 al">
    <DebouncedInput
      value={globalFilter ?? ''}
      onChange={value => setGlobalFilter(String(value))}
      className="shadow-sm border-gray-300 rounded-md text-sm p-1.5"
      placeholder="Search all columns..."
    />
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`
          group inline-flex items-center rounded-md  px-2.5 py-1 focus-visible:outline-none border border-gray-300`}
          >
            <span>Filters</span>
            {open ? <ChevronDownIcon
              className={`${open ? 'text-gray-300' : 'text-gray-700'}
            ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-300/80`}
              aria-hidden="true"
            /> : <ChevronRightIcon
              className={`${open ? 'text-gray-300' : 'text-gray-700'}
            ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-gray-300/80`}
              aria-hidden="true"
            />}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 bg-white/90">
                <>
                  <section className="flex">
                    <section className="flex-1">
                      <section className="p-4 border-b">Toggle Columns</section>
                      <section className="p-4">
                        <section>
                          <Checkbox items={[{
                            id: "ALL",
                            label: "ALL",
                          }]}
                            checked={table.getIsAllColumnsVisible()}
                            onChange={table.getToggleAllColumnsVisibilityHandler()} />
                          {table.getAllLeafColumns().map(column => {
                            return (
                              <Checkbox key={column.id} items={[{
                                id: column.id,
                                label: column.id,
                              }]}
                                checked={column.getIsVisible()}
                                onChange={column.getToggleVisibilityHandler()} />
                            )
                          })}
                        </section>

                      </section>
                    </section>
                  </section>
                </>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
    <Button onClick={randomizeColumns} primary={false}>
      Shuffle Columns
    </Button>
    <Button onClick={table.resetColumnOrder} primary={false}>
      Reset Columns Order
    </Button>
    <Button onClick={table.resetColumnFilters} primary={false}>
      Reset column Filter
    </Button>

    {/* <div className="p-2">
    <div>
      <input
        type="checkbox"
        checked={isSplit}
        onChange={e => setIsSplit(e.target.checked)}
        className="mx-1"
      />
      Split Mode
    </div>
   
  </div> */}
  </div>
}