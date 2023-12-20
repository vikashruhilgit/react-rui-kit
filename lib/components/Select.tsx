import { Listbox, Transition } from "@headlessui/react";

import "../main.css";


import { FC, Fragment, MouseEvent, useState } from "react";




export interface SelectItem {
  id: number;
  name: string;
  avatar?: string;
}

interface SelectState {
  active: boolean;
  selected: boolean;
  disabled: boolean;
}

interface SelectProps {
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
  items: SelectItem[];
  /**
  * Action handler for the select menu
  */
  onChange?: (SelectItem: SelectItem) => void;
  /**
  * error state for the select menu
  */
  error?: boolean;
  /**
  * avatar action for the select menu
  */
  onAvatarAction?: (SelectItem: SelectItem) => void;
}

export const Select: FC<SelectProps> = ({
  avatar,
  placeholder = "Select",
  label,
  items,
  selectedIndex = 0,
  onChange,
  error,
  onAvatarAction
}) => {

  const initialValue = items[selectedIndex];
  const [list, setList] = useState<SelectItem>(initialValue || {
    id: -1,
    name: placeholder,
  })

  const changeHandler = (SelectItem: SelectItem) => {
    setList(SelectItem)
    onChange && onChange(SelectItem);
  }

  const onAvatarClick = (SelectItem: SelectItem, e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    onAvatarAction && onAvatarAction(SelectItem)
  }

  const listButton = () => (
    <Listbox.Button className={`${error && 'bg-red-400 focus:ring-red-400'} relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600 sm:text-sm sm:leading-6`}>
      <span className="flex items-center">
        {avatar &&
          <img onClick={(e) => onAvatarClick(list, e)} src={list?.avatar} alt="" className={`${onAvatarAction && "cursor-pointer"} ${list.id !== -1 ? 'h-5 w-5' : ""} flex-shrink-0 rounded-full`} />}
        <span className={`${avatar ? "ml-3" : ""} block truncate ${error && 'text-red-400'}`}>{list?.name}</span>
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg aria-hidden="true" className="h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
        </svg>
      </span>
    </Listbox.Button>
  );

  const listBoxActiveClassfn = ({
    active
  }: SelectState) => `${active ? 'bg-blue-600 text-white' : 'text-gray-900'} relative cursor-default select-none py-2 pl-3 pr-9`

  const renderItems = (person: SelectItem) =>
    ({ selected, active }: SelectState) =>
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
    <Listbox value={list} onChange={changeHandler}>
      {label && <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>}
      <div className={`relative ${label && 'mt-2'} `}>
        {listButton()}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          enter="transition ease-in duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {items.map((person) => (
              <Listbox.Option
                key={person.id}
                className={listBoxActiveClassfn}
                value={person}
              >
                {renderItems(person)}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>

    </Listbox>
  )
}