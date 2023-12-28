import { FC, InputHTMLAttributes } from "react";

import "../main.css";

export interface CheckboxItemProps {
  id: string;
  label: string;
  description?: string;
  isChecked?: boolean
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  items: CheckboxItemProps[];
  heading?: string;
  subHeading?: string;
  defaultCheck?: boolean;
  selectedId?: string;
  rowView?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  onClick?: React.MouseEventHandler<HTMLInputElement> | undefined
  dense?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  heading,
  subHeading,
  rowView,
  items,
  onChange,
  onClick,
  dense,
  ...props
}) => {
  return (
    <div>
      {heading && <label className="text-base font-semibold text-gray-900">{heading}</label>}
      {subHeading && <p className="text-sm text-gray-500">{subHeading}</p>}
      <fieldset>
        {heading && <legend className="sr-only">{heading}</legend>}
        <div className={`${dense ? "" : "space-y-5 my-2"}  ${rowView && "sm:flex sm:items-center sm:space-x-10 sm:space-y-0"}`}>
          {items.map((item, i) => <div key={i} className="relative flex items-start">
            <div className="flex h-6 items-center">
              <input
                id={item.id}
                aria-describedby={item.description || item.label}
                name={item.label}
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                onChange={onChange}
                onClick={onClick}
                data-item={JSON.stringify(item)}
                checked={item.isChecked}
                {...props}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor={item.id} className="font-medium text-gray-900 cursor-pointer whitespace-nowrap">
                {item.label}
              </label>
              {item.description &&
                <p id="comments-description" className="text-gray-500">
                  {item.description}
                </p>}
            </div>
          </div>)}
        </div>
      </fieldset>
    </div>
  )
}
