/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, RowData, Table } from '@tanstack/react-table'
import React from 'react'
import DebouncedInput from './DebouncedInput'
import { ComboBox } from '../../ComboBox'

type NumberInputProps = {
  columnFilterValue: [number, number]
  getFacetedMinMaxValues: () => [number, number] | undefined
  setFilterValue: (updater: any) => void
}

const NumberInput: React.FC<NumberInputProps> = ({
  columnFilterValue,
  getFacetedMinMaxValues,
  setFilterValue,
}) => {
  const minOpt = getFacetedMinMaxValues()?.[0]
  const min = Number(minOpt ?? '')

  const maxOpt = getFacetedMinMaxValues()?.[1]
  const max = Number(maxOpt)

  return (
    <div className='text-left p-2'>
      <div className="flex space-x-2 justify-stretch">
        <DebouncedInput
          type="number"
          min={min}
          max={max}
          value={columnFilterValue?.[0] ?? ''}
          onChange={value =>
            setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${minOpt ? `(${min})` : ''}`}
          className="shadow-sm border-gray-300 rounded-md text-xs p-1.5 flex-1"
        />
        <DebouncedInput
          type="number"
          min={min}
          max={max}
          value={columnFilterValue?.[1] ?? ''}
          onChange={value =>
            setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${maxOpt ? `(${max})` : ''}`}
          className="shadow-sm border-gray-300 rounded-md text-xs p-1.5 flex-1"
        />
      </div>
      <div className="h-1" />
    </div>
  )
}

type TextInputProps = {
  columnId: string
  columnFilterValue: string
  columnSize: number
  setFilterValue: (updater: any) => void
  sortedUniqueValues: any[]
}

const TextInput: React.FC<TextInputProps> = ({
  columnFilterValue,
  columnSize,
  setFilterValue,
  sortedUniqueValues,
}) => {
  // const dataListId = columnId + 'list'

  return (
    <div className='text-left w-full p-2'>
      {/* <datalist id={dataListId}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={columnFilterValue ?? ''}
        onChange={value => {
          console.log(value);
          setFilterValue(value)
        }}
        placeholder={`Search... (${columnSize})`}
        // className="w-36 border shadow rounded"
        className="shadow-sm border-gray-300 rounded-md text-xs w-full p-1.5"
        list={dataListId}
      /> */}
      <ComboBox
        selectedIndex={sortedUniqueValues.indexOf(columnFilterValue)}
        placeholder={`Search... (${columnSize})`}
        items={sortedUniqueValues.map(single => ({ id: single, name: single }))}
        onChange={value => setFilterValue(value.id)}
      />
      <div className="h-1" />
    </div>
  )
}

type Props<T extends RowData> = {
  column: Column<T, unknown>
  table: Table<T>
  sortedUniqueValues: any[]
}

export function QuickFilter<T extends RowData>({ column, table, sortedUniqueValues }: Props<T>) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)
  const columnFilterValue = column.getFilterValue();
  const uniqueValues = column.getFacetedUniqueValues();

  return typeof firstValue === 'number' ? (
    <NumberInput
      columnFilterValue={columnFilterValue as [number, number]}
      getFacetedMinMaxValues={column.getFacetedMinMaxValues}
      setFilterValue={column.setFilterValue}
    />
  ) : (
    <TextInput
      columnId={column.id}
      columnFilterValue={columnFilterValue as string}
      columnSize={uniqueValues.size}
      setFilterValue={column.setFilterValue}
      sortedUniqueValues={sortedUniqueValues}
    />
  )
}