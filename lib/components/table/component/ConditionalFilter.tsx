/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Table } from "@tanstack/react-table";
import { Select, SelectItem } from "../../Select";
import { useState } from "react";
import DebouncedInput from "./DebouncedInput";

export interface ConditionalFilterItem {
  id: string;
  label: string;
  avatar?: string;
  isChecked?: boolean
}

interface ConditionalFilterProps<T> {
  column: Column<T, unknown>;
  table?: Table<T>;
  sortedUniqueValues: any[]
}

const selectTextItems = [
  "Contains",
  "Does not contain",
  "Equals",
  "Does not equal",
  "Begins with",
  "Ends with",
  "Blank",
  "Not blank"
];

export const ConditionalFilter = <T,>({
  column,
  sortedUniqueValues
}: ConditionalFilterProps<T>) => {

  // const columnFilterValue = column.getFilterValue();

  /* const items = sortedUniqueValues.map(value => ({
    id: value,
    name: value,
  })) */

  console.log(column, sortedUniqueValues);

  const [condition, setcondition] = useState("")

  /* const changeHandler = (val: string | number) => {
    console.log(val);
  } */

  const selectChangeHandler = (val: SelectItem) => {
    setcondition(val.name)
  }

  console.log(condition);


  return <section className="p-2">
    <Select
      items={selectTextItems.map((single, i) => ({
        id: i,
        name: single
      }))}
      selectedIndex={-1}
      onChange={selectChangeHandler}
      placeholder="Select"
    />
  </section>
}