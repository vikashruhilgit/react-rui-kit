/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";

import { Input } from "../../Input"
import { Checkbox } from "../../Checkbox";

export interface MultiTextSearchItem {
  id: string;
  label: string;
  avatar?: string;
  isChecked?: boolean;
}

interface MultiTextSearchProps<T> {
  items: MultiTextSearchItem[];
  onChange: (SelectItems: T) => void;
  placeholder: string;
}

export const MultiTextSearch = <T,>({
  items,
  onChange,
  placeholder
}: MultiTextSearchProps<T>) => {

  const [query, setQuery] = useState('');

  const changeHandler = (val: string) => {
    setQuery(val)
  }

  const filteredItem =
    query === ''
      ? items
      : items.filter((item) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })

  const checkboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedItem: T = JSON.parse(e.target.dataset.item!)
    onChange({
      ...selectedItem,
      isChecked: e.target.checked
    })
  }

  return <section className="p-2">
    <Input label="" placeholder={placeholder} onChange={(e) => changeHandler(e.target.value)} />
    <section className="h-40 overflow-y-scroll">
      <Checkbox items={filteredItem} dense={true} onChange={checkboxHandler} />
    </section>
  </section>
}