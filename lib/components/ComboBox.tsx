import { FC, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

import "../main.css";

export interface ComboBoxItem {
  id: number;
  name: string;
  avatar?: string;
}

interface ComboBoxState {
  active: boolean;
  selected: boolean;
  disabled: boolean;
}

interface ComboBoxProps {
  /**
  * index of the current selected item
  */
  selectedIndex?: number;
  /**
  * placeholder for the list default - Select
  */
  placeholder?: string;
  /**
  * label for the list default
  */
  label?: string;
  /**
  * to enable avatar images.
  */
  avatar?: boolean;
  /**
    * Options for the select menu
    */
  items: ComboBoxItem[];
  /**
  * Action handler for the select menu
  */
  onChange?: (SelectItems: ComboBoxItem) => void;
  /**
  * error state for the select menu
  */
  error?: boolean;
}

export const ComboBox: FC<ComboBoxProps> = ({
  avatar,
  placeholder = "Select",
  label,
  items,
  selectedIndex = 0,
  onChange,
  error,
}) => {

  const initialValue = items[selectedIndex];

  const [query, setQuery] = useState('')
  const [list, setList] = useState<ComboBoxItem>(initialValue || {
    id: -1,
    name: placeholder,
  })

  if (initialValue === undefined && list.id != -1) {
    setList({
      id: -1,
      name: placeholder,
    })
  }

  const changeHandler = (selectItems: ComboBoxItem) => {
    setList(selectItems)
    onChange && onChange(selectItems);
  }

  const filteredItem =
    query === ''
      ? items
      : items.filter((item) => {
        return item.name.toLowerCase().includes(query.toLowerCase())
      })

  const listInputAndButton = () => (
    <>
      <Combobox.Input
        className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(item: ComboBoxItem) => item?.name}
      />
      <Combobox.Button className={`${error && 'bg-red-400 focus:ring-red-400'} absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"`}>
        <span className="">
          <svg aria-hidden="true" className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </span>
      </Combobox.Button>
    </>
  );

  const listBoxActiveClassfn = ({
    active
  }: ComboBoxState) => `${active ? 'bg-blue-600 text-white' : 'text-gray-900'} relative cursor-default select-none py-2 pl-3 pr-9`

  const renderItems = (person: ComboBoxItem) =>
    ({ selected, active }: ComboBoxState) =>
    (
      <>
        <div className="flex items-center">
          {avatar && <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />}
          <span
            className={`${selected ? 'font-semibold' : 'font-normal'} ${avatar && 'ml-3'} block truncate`}
          >
            {person.name}
          </span>
        </div>

        {selected ? (
          <span
            className={`${active ? 'text-white' : 'text-blue-600'} absolute inset-y-0 right-0 flex items-center pr-4`}
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </span>
        ) : null}
      </>
    )

  return (

    <Combobox as="div" value={list} onChange={changeHandler}>
      {label && <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>}
      <div className={`relative ${label && 'mt-2'} `}>
        {listInputAndButton()}
        {filteredItem.length > 0 &&
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            enter="transition ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItem.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={listBoxActiveClassfn}
                  value={item}
                >
                  {renderItems(item)}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>}
      </div>
    </Combobox>
  )
}