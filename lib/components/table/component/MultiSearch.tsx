import { ChangeEvent, FC, useState } from "react";

import { Input } from "../../Input"

import { Checkbox } from "../../Checkbox";

export interface MultiSearchItem {
  id: string;
  label: string;
  avatar?: string;
  isChecked?: boolean
}

interface MultiSearchProps {
  /**
  * placeholder for the list default - Select
  */
  placeholder?: string;
  /**
  * label for the list default
  */
  label?: string;
  /**
    * Options for the select menu
    */
  items: MultiSearchItem[];
  /**
  * Action handler for the select menu
  */
  onChange?: (SelectItems: MultiSearchItem) => void;
}

export const MultiSearch: FC<MultiSearchProps> = ({
  placeholder,
  items,
  onChange,
}) => {

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
    const selectedItem: MultiSearchItem = JSON.parse(e.target.dataset.item!)
    onChange && onChange({
      ...selectedItem,
      isChecked: e.target.checked
    })
  }

  console.log(filteredItem);

  return <section className="p-2">
    <Input label="" placeholder={placeholder} onChange={(e) => changeHandler(e.target.value)} />
    <section className="h-40 overflow-y-scroll">
      <Checkbox items={filteredItem} dense={true} onChange={checkboxHandler} />
    </section>
  </section>
}